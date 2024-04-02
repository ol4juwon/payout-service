"use strict";
const db = require("../../../models/");
const { Sequelize } = require("sequelize");
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
      bankCodes = await Bankcodes.findAll();
    }else{
     bankCodes = await Bankcodes.findAll({
      limit: limit,
      offset,
      order: Sequelize.literal(`"${orderBy}" ${sort}`),
    });
  }
    if(bankCodes.error){
      return {error: bankCodes.error, code: 400}
    }
    // console.log("dd",{bankCodes})
    return { data: bankCodes };
  } catch (err) {
    // console.log({err})
    console.log(err.message)
    return { error: err?.message || err, code: 400 };
  }
};

exports.getOneBankCode = async (id) => {
  const bankCodes = await Bankcodes.findOne({ where: { id } });
  return { data: bankCodes };
};
