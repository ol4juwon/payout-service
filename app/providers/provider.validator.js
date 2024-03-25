"use strict";

const Joi = require("@hapi/joi");
exports.getProviders = async (req, res, next) =>{
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
exports.getSingleProvider = async (req,res, next) => {

}

exports.addProvider = async (req, res, next) => {
    const schema = {
        page: Joi.number(),
        limit: Joi.number(),
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

exports.deactivateProvider = async (req,res, next) => {

}