const db = require("../models/");
const Bankcodes = db.Bankcodes;
const Transactions = db.Transactions;
// const
const squadService = require("./SquadService");
const spayService = require("./SpayService");
const { CURRENCY, TRANSACTION } = require("../Constants");
const providers = require("../models/providers");

class PayoutService {
  constructor() {
    this.currency = CURRENCY.NGN;
  }

  async approvePayout(amount, beneficiary) {
    try {
      // Check balance of collection accounts
      const {balance} = await this.getBalances();

      // Consider cost optimizations for intrabank transfers
      const optimizedAmount = await this.optimizeTransferCost(
        amount,
        beneficiary.bankCode,
        balance
      );

      // Initiate payout
    //   await this.initiatePayout(optimizedAmount, recipientAccountId);

      return {
        success: true,
        message: "Payout approved and initiated successfully",
      };
    } catch (error) {
      console.error("Error approving payout:", error);
      return { success: false, message: "Failed to approve payout" };
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
    const providers = await providers.findAll({where: {active: true}});

    // const useProvider = providers.filter((item) => {
    //   if(recipientBankCode == item.bankcode){
    //     if(amount <= collectionBalance[item.slug]){
    //       return TRANSACTION.CHANNEL[item.slug]
    //     }
    //   }
    // })
    if (recipientBankCode === "000001") {
        if (amount <= collectionBalance.spay) {
            return TRANSACTION.CHANNEL.SPAY;
        } else if (amount + 25.25 < collectionBalance.squad) {
            return TRANSACTION.CHANNEL.SQUAD;
        }
    } else if (recipientBankCode === "000013") {
        if (amount <= collectionBalance.squad) {
            return TRANSACTION.CHANNEL.SQUAD;
        } else if (amount + 25.25 < collectionBalance.spay) {
            return TRANSACTION.CHANNEL.SPAY;
        }
    } else {
        if (amount + 25.25 <= minBalance) {
            return maxBalance === collectionBalance.spay ? TRANSACTION.CHANNEL.SQUAD : TRANSACTION.CHANNEL.SPAY;
        }
    }

    return `Cannot process payout. Please try an amount lower than NGN${minBalance}`;
  }
  async initiatePayout(amount, recipientAccountId) {
    // Logic to initiate the payout
    // This may involve creating a transaction record, updating account balances, etc.
  }
  async validateBank({ bankcode, accountNo }) {
    const { error, data } = await squadService.NameEnquiry({
      accountNo,
      bankcode,
    });
    if (error) return { error: error };
    else return { data };
  }

  async getBalances({ currency = this.currency }) {
    let squadBalance;
    let spayBalance;
    const squad = await squadService.walletBalance({ currency });
    if (squad.error) squadBalance = "Failed to retrieve balance";
    else squadBalance = squad.data.data.balance;

    const spay = await spayService.getBalance();
    if (spay.error) spayBalance = "Failed to retrieve balance";
    else spayBalance = spay;
    return { balance: { squad: squadBalance, spay: spayBalance } };
  }
}
module.exports = new PayoutService();
