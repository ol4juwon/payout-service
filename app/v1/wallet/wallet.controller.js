"use strict";
const walletService = require("./wallet.service");

exports.getWallets = async (req, res) => {
  try {
    const { page, limit, orderBy, sort } = req.query;
    const { error, data, code } = await walletService.getAlWallet({
      page,
      limit,
      orderBy,
      sort,
    });
    if (error) return createErrorResponse(res, error, code);
    return createSuccessResponse(res, data, code);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};
exports.getWalletDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, data, code } = await walletService.getWalletDetails(id);
    if (error) return createErrorResponse(res, error, code);
    return createSuccessResponse(res, data, code);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};

exports.create = async (req, res) => {
  try {
    const { payload } = req.body;
    const { error, data, code } = await walletService.create(payload);
    if (error) return createErrorResponse(res, error, code);
    return createSuccessResponse(res, data, code);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};

exports.creditWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const { error, data, code } = await walletService.fundWallet({
      id,
      amount,
    });
    if (error) return createErrorResponse(res, error, code);
    return createSuccessResponse(res, data, code);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};
