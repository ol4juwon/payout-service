const Joi = require("@hapi/joi");

exports.create = async (req,res, next) => {
console.log("validating")
    const schema = {
        userId: Joi.string().guid().required(),
        bank_code_id: Joi.string().guid().required(),
        account_no: Joi.string().min(10).required(),
        account_name: Joi.string().required()
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

      return next()
}

exports.getOne = async (req,res) => {

}

exports.getAll = async (req,res) => {

}

exports.update = async (req,res) => {
    
}

exports.delete = async (req,res) => {

}