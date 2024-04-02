"use strict";
const BankCodeService = require("./bankcode.service");
exports.getBankCodes = async (req, res) => {
  try {
    const { page, limit, orderBy, sort,all } = req.query;
    const { data, error, code } = await BankCodeService.getBankCodes({ all, page, limit, orderBy, sort });
    if(error){
      return createErrorResponse(res, error, code);
    }
    return createSuccessResponse(res, data, code);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};

exports.getOneBankCode = async (req, res) => {};
