"use strict";
const providerService = require("./provider.service");

exports.getProviders = async (req, res) => {};
exports.getSingleProvider = async (req, res) => {};

exports.addProvider = async ({body}, res) => {
  try {
    const {name, slug, description, value} = body;
    const { error, data, code } = await providerService.addProvider({name, slug, description, value});
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 201);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};

exports.deactivateProvider = async (req, res) => {};
