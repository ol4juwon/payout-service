"use strict";
const providerService = require("./provider.service");

exports.getProviders = async (req, res) => {};
exports.getSingleProvider = async (req, res) => {};

exports.addProvider = async ({body}, res) => {
  try {
    const {name, slug, description, value, active} = body;
    const { error, data, code } = await providerService.addProvider({name, slug, description, value, active});
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 201);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};

exports.toggleProviderStatus = async ({params, body}, res) => {

  try {
    const {id} = params;
    const {toggle} = body;
    const { error, data, code } = await providerService.toggleActive(id, toggle);
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 200);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};

exports.setDefault = async ({params}, res) => {

  try {
    const {id} = params;
    const { error, data, code } = await providerService.setDefault(id);
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 200);
  } catch (err) {
    return createErrorResponse(res, err.message, 500);
  }
};
