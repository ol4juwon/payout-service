"use strict"
const db = require("../../../models/");
const Bankcodes = db.Bankcode;
exports.getBankCodes = async (page=1, limit= 10) => {
    const bankCodes = await Bankcodes.findAll();
return {data: bankCodes}
}

exports.getOneBankCode = async (id) => {
    const bankCodes = await Bankcodes.findAll();
    return {data: bankCodes}
}