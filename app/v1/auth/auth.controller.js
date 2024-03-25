"use strict";

const AuthService = require("./auth.service");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error, data, code } = await AuthService.login({ email, password });
    if (error) return createErrorResponse(res, error, code);
    return createSuccessResponse(res,data, 200);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};
