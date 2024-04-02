"use strict"

const Joi = require("@hapi/joi");
exports.getUsers = (req, res, next) => {
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
}

exports.createUser = (req, res, next) => {
  const schema = {
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.string().required()
    };
    const result = Joi.validate(req.body, schema, {
      allowUnknown: false,
    });
  
    if (result.error)
      return createErrorResponse(
        res,
        result.error.details[0].message.replace(/['"]/g, ""),
        422
      );
  
    return next();
}

exports.toggleUser = (req,res,next) => {
  const schema = {
    id: Joi.string().guid().required(),
    toggle: Joi.boolean().required()
  };
  const result = Joi.validate(req.params, schema, {
    allowUnknown: false,
  });

  if (result.error)
    return createErrorResponse(
      res,
      result.error.details[0].message.replace(/['"]/g, ""),
      422
    );

  return next();
}

exports.blacklist = (req,res,next) => {
  const schema = {
    id: Joi.string().guid().required(),
  };
  const result = Joi.validate(req.params, schema, {
    allowUnknown: false,
  });

  if (result.error)
    return createErrorResponse(
      res,
      result.error.details[0].message.replace(/['"]/g, ""),
      422
    );

  return next();
}