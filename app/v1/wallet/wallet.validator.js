"use strict"

const Joi = require("@hapi/joi");

exports.create = async (req,res, next) => {
    const schema = {
        userId: Joi.string().uuid().required(),
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

exports.getOne = async (req,res, next) => {
    const schema = {
        id: Joi.string().uuid().required(),
      };
      const result = Joi.validate(req.params, schema, {
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

exports.getAll = async (req,res, next) => {
    const schema = {
        page: Joi.number(),
        limit: Joi.number(),
        orderBy: Joi.string(),
        sort: Joi.string(),
      };
      const result = Joi.validate(req.query, schema, {
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

exports.fund = async (req,res, next) => {
  const schema = {
      amount: Joi.number().positive().required(),
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
