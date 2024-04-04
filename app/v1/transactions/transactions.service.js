const { Sequelize } = require("../../../models/");
const PayoutService = require("../../../services/PayoutService");
const Transactions = require("../../../models/").Transactions;
const Beneficiaries = require("../../../models/").Beneficiaries;
const BankCodes = require("../../../models/").MappedBankCodes;
exports.getWallets = async ({ currency }) => {
  const data = await PayoutService.getBalances({ currency });
  return { data };
};

exports.validateBank = async ({ accountNo, bankcode }) => {
  try {
    const { data, error } = await PayoutService.validateBank({
      accountNo,
      bankcode,
    });
    if (error) return { error: error, code: 400 };
    return { data, code: 200 };
  } catch (err) {
    return { error: err, code: 500 };
  }
};

exports.getallTransactions = async ({
  all = false,
  page = 1,
  limit = 10,
  orderBy = "createdAt",
  sort = "Desc",
}) => {
  try {
    console.log(typeof all, { all, page, limit, orderBy, sort });
    let transactions;
    if (all == "true") {
      console.log({ all });
      transactions = await Transactions.findAll({
        order: [[`${orderBy}`, `${sort}`]],
        include: [
          {
            model: Beneficiaries,
            attributes: ["id", "accountName", "accountNo"],
            include: [
              {
                model: BankCodes,
                attributes: ["bankName"],
              },
            ],
          },
        ],
      });
    } else {
      console.log("not all");
      transactions = await Transactions.findAll({
    
          offset: (page - 1) * limit,
          limit,
          orderBy: Sequelize.literal(`'${orderBy}' ${sort}`),
          include: [
            {
              model: Beneficiaries,
              attributes: ["id", "accountName", "accountNo"],
              include: [
                {
                  model: BankCodes,
                  attributes: ["bankName"],
                },
              ],
            },
          ],
        
      });
    }

    return { data: transactions, code: 200 };
  } catch (error) {
    console.log({ error });
    return { error: error, code: 400 };
  }
};
exports.getUserTransactions= async (userId, {page=1, limit=100, orderBy="createdBy", sort="DESC"}) => {
try{
let transactions;
transactions = await Transactions.findAll({
    where: {beneficiary : userId},
  offset: (page - 1) * limit,
  limit,
  orderBy: Sequelize.literal(`'${orderBy}' ${sort}`),
  include: [
    {
      model: Beneficiaries,
      attributes: ["id", "accountName", "accountNo"],
      include: [
        {
          model: BankCodes,
          attributes: ["bankName"],
        },
      ],
    },
  ],

});
return {data: transactions, code: 200}
}catch(error){

}
}
exports.initiatePayout = async (userId, payload) => {
  try {
    const { amount, recipientId, narration } = payload;
    const { error, data } = await PayoutService.approvePayout({
      userId,
      amount,
      recipientId,
      narration,
    });
    if (error) {
      return { error, code: 400 };
    }
    return { data, code: 200 };
  } catch (error) {
    console.log({ error });
    return { error: error, code: 500 };
  }
};
