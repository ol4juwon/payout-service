"use strict";
const db = require("../../../models/");
const { Sequelize, Op } = require("sequelize");
const Bankcodes = db.MappedBankCodes;
const SqaudBankCodes = db.SqaudBankCodes;
const SpayBank = db.SpayBankCodes;
exports.getBankCodes = async ({
  all = false,
  page = 1,
  limit = 10,
  orderBy = "bankName",
  sort = "DESC",
}) => {
  try {
    const offset = (page - 1) * limit;
    let bankCodes;
    if(all){
      bankCodes = await Bankcodes.findAll({
        order: Sequelize.literal(`"${orderBy}" ${sort}`),
      });
    }else{
     bankCodes = await Bankcodes.findAll({
      limit: limit,
      offset,
      order: Sequelize.literal(`"${orderBy}" ${sort}`),
    });
  }
    return { data: bankCodes };
  } catch (err) {
    return { error: err?.message || err, code: 400 };
  }
};

exports.getOneBankCode = async (id) => {
  try{
  const bankCodes = await Bankcodes.findByPk(id);
  // console.log({bankCodes});
  if(!bankCodes){
    return {error: "Not found", code: 404}
  }
  return { data: bankCodes , code: 200};
}catch(error){
  return {error: "failed"+error.message ,code: 400}
}
};
