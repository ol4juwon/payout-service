const ACCESSKEY = process.env.ACCESSKEY
const jwt = require('jsonwebtoken');

exports.validateClient = async (req,res,next) => {
    try{
        let accessKey = req.headers['x-access-token'];
        if (!accessKey) return createErrorResponse(res,"You are not authorised to use this service", 403);
        // if (accessKey.startsWith('Bearer ')) {
        //     // Remove Bearer from string
        //     clientId = clientId.slice(7, clientId.length);
        // }
      
        if(ACCESSKEY !== accessKey)
            return createErrorResponse(res, "You are not authorised to use this service", 401);

        res.accessKey = req.body.accessKey = req.query.accessKey =accessKey;
        require("axios").defaults.headers.common["accessKey"] = accessKey;
        return next();
    }catch (e) {
        debug("Middleware", e);
        return createErrorResponse(res, "You are not authorised to use this service", 401);
    }
};

exports.validateToken  = async (req,res,next) => {

    let token = req.headers['authorization'];
    token = token.split(" ")[1];
    console.log({token})
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({decoded})

    req.user = decoded;
    }catch(err){
        console.log("failed",err.message)
        return createErrorResponse(res,err.message,401 )
    }
    next();

}