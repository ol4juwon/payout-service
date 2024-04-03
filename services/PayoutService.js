const db = require("../models/");
const Bankcodes = db.Bankcodes;
const Transactions = db.Transactions;
const MappedBankCodes = db.MappedBankCodes;
// const
const squadService = require("./SquadService");
const spayService = require("./SpayService");
const { CURRENCY, TRANSACTION } = require("../Constants");
const Providers = db.Providers;
const Beneficiaries = db.Beneficiaries;
class PayoutService {
  constructor() {
    this.currency = CURRENCY.NGN;
  }

  async approvePayout({ userId, amount, recipientId, narration }) {
    try {
      const beneficiary = await Beneficiaries.findOne({
        where: { userId: recipientId },
        include: [
          {
            model: MappedBankCodes,
            attributes: ["id", "bankName", "bankCode"],
          },
        ],
      });
      if (beneficiary) {
        const transaction = await Transactions.create({
          beneficiary: beneficiary.id,
          amount,
          status: TRANSACTION.STATUS.PENDING,
          senderId: userId,
          provider: null,
          narration,
        });
        // console.log({ transaction });
        // Check balance of collection accounts
        const { balance } = await this.getBalances();
        // console.log({be : beneficiary.MappedBankCode})
        // Consider cost optimizations for intrabank transfers
        const optimizedProvider = await this.optimizeTransferCost(
          amount,
          beneficiary,
          balance
        );
        console.log({ optimizedProvider });
        if(optimizedProvider.includes("Cannot")){
          transaction.status = TRANSACTION.STATUS.FAILED
          await transaction.save();
          return {error: optimizedProvider}
        }
        const channel = await Providers.findOne({where: {slug:"squad"}})
        // Initiate payout
        console.log({channel})
        transaction.provider = channel.id

       const {error, data} =    await this.initiatePayout({amount , provider: optimizedProvider, beneficiary, transaction});
            if(error) {
             transaction.status = TRANSACTION.STATUS.FAILED;
             await transaction.save();
              return {error}
            }
          transaction.status = TRANSACTION.STATUS.SUCCESS;
          await transaction.save();
        return {
          data: {message : "Payout approved and initiated successfully",transaction}
        };
      } else {
        return { error: "Beneficiary hasn't been added for user" };
      }
    } catch (error) {
      console.error("Error approving payout:", error);
      return { error: "Failed to approve payout" };
    }
  }
  async getBankLists() {
    const bankList = await Bankcodes.findAll({});
    if (bankList) return { data: bankList };
    return { error: "Can't retrieve banks atm " };
  }

  async optimizeTransferCost(amount, recipientBankCode, collectionBalance) {
    let minBalance = Math.min(collectionBalance.spay, collectionBalance.squad);
    let maxBalance = Math.max(collectionBalance.spay, collectionBalance.squad);
    const parseAmount = parseFloat(amount);

    if (recipientBankCode.MappedBankCode.bankCode === "000001") {
      if (parseAmount <= collectionBalance.spay) {
        return TRANSACTION.CHANNEL.SPAY;
      } else if (parseAmount + 25.25 < collectionBalance.squad) {
        return TRANSACTION.CHANNEL.SQUAD;
      }
    } else if (recipientBankCode.MappedBankCode.bankCode === "000013") {
      if (amount <= collectionBalance.squad) {
        return TRANSACTION.CHANNEL.SQUAD;
      } else if (parseAmount + 25.25 < collectionBalance.spay) {
        return TRANSACTION.CHANNEL.SPAY;
      }
    } else {
      console.log("entered here")
      if ((parseAmount + 25.25) >= minBalance && (parseAmount+25.25) < maxBalance) {
        return maxBalance === collectionBalance.spay
          ? TRANSACTION.CHANNEL.SQUAD
          : TRANSACTION.CHANNEL.SPAY;
      }
    }

    return `Cannot process payout. Please try an amount lower than NGN${maxBalance}`;
  }
  async initiatePayout({amount,provider ,beneficiary}) {
      return {data: "done"}   
  }
  async validateBank({ bankcode, accountNo }) {
    const { error, data } = await squadService.NameEnquiry({
      accountNo,
      bankcode,
    });
    if (error) return { error: error };
    else return { data };
  }

  async getBalances(currency = this.currency) {
    let squadBalance;
    let spayBalance;
    const squad = await squadService.walletBalance({ currency });
    console.log({ squad });
    if (squad.error) squadBalance = 10000;
    else squadBalance = squad?.data;
    console.log({ squadBalance });
    const spay = await spayService.getBalance();
    if (spay.error) spayBalance = 10000;
    else spayBalance = spay.data;

    console.log({ spayBalance });
    return { balance: { squad: squadBalance, spay: spayBalance } };
  }
}
module.exports = new PayoutService();
