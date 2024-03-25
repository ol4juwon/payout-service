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