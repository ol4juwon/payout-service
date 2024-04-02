"use strict";

const Joi = require("@hapi/joi");
exports.getProviders = async (req, res, next) => {
  const schema = {
    page: Joi.number(),
    limit: Joi.number(),
  };
  const result = Joi.validate(req.body, schema, {
    allowUnknown: true,
  });

  if (result.error)
    return createErrorResponse(
      res,
      result.error.details[0].message.replace(/['"]/g, ""),
      422
    );

  return next();
};
exports.getSingleProvider = async (req, res, next) => {
  const schema = {
    id: Joi.string().required(),
  };
  const result = Joi.validate(req.params, schema, {
    allowUnknown: true,
  });

  if (result.error) {
    return createErrorResponse(
      res,
      result.error.details[0].message.replace(/['"]/g, ""),
      422
    );
  }

  return next();
};

exports.addProvider = async (req, res, next) => {
  const schema = {
    name: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.string().required(),
    active: Joi.boolean(),
    createdBy:Joi.string().required()
  };
  const result = Joi.validate(req.body, schema, {
    allowUnknown: false,
  });

  if (result.error) {
    console.log({result})
    return createErrorResponse(
      res,
      result.error?.details[0]?.message.replace(/['"]/g, ""),
      422
    );
  }

  return next();
};

exports.toggleProvider = async (req, res, next) => {
  const schema = {
    toggle: Joi.boolean(),
  };
  const result = Joi.validate(req.body, schema, {
    allowUnknown: false,
  });
console.log("Validation error", req.body,)
  if (result.error)
    return createErrorResponse(
      res,
      result.error.details[0].message.replace(/['"]/g, ""),
      422
    );

  return next();
};
