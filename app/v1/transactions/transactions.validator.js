const Joi = require("@hapi/joi");

exports.getAll = async (req,res, next) => {
    const schema  =  {
        all: Joi.boolean(),
        page: Joi.number().positive().required(),
        limit: Joi.number().positive().required(),
        orderBy: Joi.string().required(),
        sort: Joi.string().required(),
    }
    const result = Joi.validate(req.query, schema, {
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
exports.getUser = async (req,res, next) => {
    console.log()
    const schema = {
        userId: Joi.string().guid().required(),
        all: Joi.boolean(),
        page: Joi.number().positive().required(),
        limit: Joi.number().positive().required(),
        orderBy: Joi.string().required(),
        sort: Joi.string().required(),
    }
    const result = Joi.validate({...req.query, ...req.params}, schema, {allowUnknown: false})
    if(result.error)
    return createErrorResponse(
        res,
        result.error.details[0].message.replace(/['"]/g, ""),
        422
      );
  
return next();  
}
exports.validateAccount = async (req,res, next) => {
        const schema  =  {
            accountNo: Joi.string().min(10).required(),
            bankcode: Joi.string().required()
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

exports.approvePayout = (req,res,next) => {
        const schema = {
            recipientId: Joi.string().guid().required(),
            amount: Joi.number().positive().required(),
            narration: Joi.string().required(),
        }
        const result = Joi.validate(req.body, schema, {allowUnknown: false})
        if(result.error)
        return createErrorResponse(
            res,
            result.error.details[0].message.replace(/['"]/g, ""),
            422
          );
      
    return next();
}
