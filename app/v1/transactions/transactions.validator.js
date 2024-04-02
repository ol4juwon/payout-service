const Joi = require("@hapi/joi");


exports.validateAccount = async (req,res, next) => {
        const schema  =  {
            accountNo: Joi.string().min(10).required(),
            bankcode: Joi.string().guid().required()
        }
        const result = Joi.validate(req.body, schema, {
            allowUnknown: false
        })

        if(result.error)
        return createErrorResponse(
            res,
            result.error.details[0].message.replace(/['"]/g, ""),
            422
          );
      
        return next();
}
