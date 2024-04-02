const transactionService = require("./transactions.service")

exports.getWalletBalances = async (req, res)=>{
    const {currency} = req.query
const {error,data} = await transactionService.getWallets({currency})
if(error) return createErrorResponse(res, error, 400)

return createSuccessResponse(res, data, 200);
}
exports.validateBank = async (req, res) => {
try{
    const {accountNo, bankcode} = req.body

    const {error,data, code } = await transactionService.validateBank({accountNo, bankcode});
    if(error)return createErrorResponse(res,error, code)

    return createSuccessResponse(res, data, code);
}catch(err){
    return createErrorResponse(res, err.message || err, 500)
}
}
exports.approvePayout = async (req,res) => {
    try{

    }catch(err){
        return createErrorResponse(res, err.message || err, 500)
    }
}

exports.getallTransactions = async (req,res) =>{
    try{
        const {all, page, limit, orderBy, sort} = req.query

        const {error, data, code} = await transactionService.getallTransactions({all, page, limit, orderBy, sort});
        if(error){
            return createErrorResponse(res, error, code|| 400);
        }

        return createSuccessResponse(res, data, code || 200);
    }catch(err){
        return createErrorResponse(res, err?.message || err, 500)
    }
}