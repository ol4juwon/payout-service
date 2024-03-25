"use strict";
const BankCodeService = require("./bankcode.service");
exports.getBankCodes = async (req, res) => {
  try {
    const { page, limit } = req.params;
    const { data } = await BankCodeService.getBankCodes(page, limit);
    return createSuccessResponse(res, data, 200);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};

exports.getOneBankCode = async (req, res) => {};
