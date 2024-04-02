const { Sequelize } = require("../../../models/");
const PayoutService = require("../../../services/PayoutService");
const Transactions = require("../../../models/").Transactions
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

exports.getallTransactions = async ({all= false, page =1, limit = 10, orderBy = "createdAt", sort="Desc"}) => {
try{
  let transactions ;
  if(all){
    transactions = await  Transactions.findAll({orderBy: Sequelize.literal(`'${orderBy}' ${sort}`)});
  }else{
    transactions = await Transactions.findAll({where: { offset: (page - 1) * limit, limit, orderBy: Sequelize.literal(`'${orderBy}' ${sort}`)}})
  }

  return {data: transactions, code: 200};
}catch(error){
  return {error: error, code: 400}
}
}
