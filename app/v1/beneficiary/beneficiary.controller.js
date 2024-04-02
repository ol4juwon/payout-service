"use strict"

const beneficiaryService = require("./beneficiary.service");

exports.create = async (req,res) => {
    try{
        const payload = req.body
        const {error, code, data} = await beneficiaryService.create(payload);
        if(error)return createErrorResponse(res, error, code);

        return createSuccessResponse(res, data, code);
    }catch(err){
        return createErrorResponse(res, err.message || err, 500)
    }

}

exports.getOne = async (req,res) => {

}

exports.getAll = async (req,res) => {
    try{
        const payload = req.query
        const {error, code, data} = await beneficiaryService.getAll(payload);
        if(error)return createErrorResponse(res, error, code);

        return createSuccessResponse(res, data, code);
    }catch(err){
        return createErrorResponse(res, err.message || err, 500)
    }

}

exports.update = async (req,res) => {
    
}

exports.delete = async (req,res) => {

}