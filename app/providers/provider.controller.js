"use strict";
const providerService = require("./provider.service");

exports.getProviders = async (req, res) => {
  try {
    const { page, limit, isDefault, active } = req.query;
    const { error, data, code } = await providerService.getProviders({
      page,
      limit,
      isDefault,
      active,
    });
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 200);
  } catch (err) {
    console.log("17 => Provider Error:  ", err?.message, err?.cause, err?.stacktrace);
    return createErrorResponse(res, err.message, 500);
  }
};
exports.getSingleProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, data, code } = await providerService.getSingleProvider(id);
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 200);
  } catch (err) {
    console.log("29 => Provider Error:  ", err?.message, err?.cause, err?.stacktrace);
    return createErrorResponse(res, err.message, 500);
  }
};

exports.addProvider = async ({ body }, res) => {
  try {
    const { name, slug, description, value, active, createdBy, bankcode } = body;
    console.log({ name, slug, description, value, active, createdBy, bankcode } )
    const { error, data, code } = await providerService.addProvider({
      name,
      slug,
      description,
      value,
      active,
      createdBy,
      bankcode
    });
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 201);
  } catch (err) {
    console.log("49 => Provider Error:  ", err, err?.cause, err?.stacktrace);
    return createErrorResponse(res, err.message, 500);
  }
};

exports.toggleProviderStatus = async ({ params, body }, res) => {
  try {
    console.log({ params, body });
    const { id } = params;
    const { toggle } = body;
    const { error, data, code } = await providerService.toggleActive(
      id,
      toggle
    );
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 200);
  } catch (err) {
    console.log("66=>Provider Error:  ", err?.message, err?.cause, err?.stacktrace);
    return createErrorResponse(res, err.message, 500);
  }
};

exports.setDefault = async ({ params }, res) => {
  try {
    const { id } = params;
    const { error, data, code } = await providerService.setDefault(id);
    if (error) return createErrorResponse(res, error, code);

    return createSuccessResponse(res, data, code || 200);
  } catch (err) {
    console.log("79 => Provider Error:  ", err?.message, err?.cause, err?.stacktrace);
    return createErrorResponse(res, err.message, 500);
  }
};
