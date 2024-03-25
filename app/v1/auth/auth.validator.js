"use strict";

const Joi = require("@hapi/joi");
const debug = require("debug")("app:db");

exports.login = (req, res, next) => {
  const schema = {
    email: Joi.required(),
    password: Joi.required(),
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

// exports.login = async (req,res,next)=>{}
