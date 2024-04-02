const ACCESSKEY = process.env.ACCESSKEY
const jwt = require('jsonwebtoken');

exports.validateClient = async (req,res,next) => {
    try{
        let accessKey = req.headers['x-access-token'];
        if (!accessKey) return createErrorResponse(res,"You are not authorised to use this service", 403);
      
        if(ACCESSKEY !== accessKey)
            return createErrorResponse(res, "x-aceess - You are not authorised to use this service", 401);

        res.accessKey =accessKey;
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
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    }catch(err){
        console.log("failed",err.message)
        return createErrorResponse(res,err.message,401 )
    }
    next();

}
exports.checkPermission = (role) => {
    return async (req, res, next) => {
      try {
        
        const userRole = req.user.role;
        if(userRole == null) return createErrorResponse(res,"Forbidden", 403)
        if (!role.includes(userRole)) {
          return createErrorResponse(res, "You don't have the right privileges" ,403);
        }
        console.log("dddd", userRole);
        next();
      } catch (error) {
        logger.error(error);
        return createErrorResponse(res, "internal Server Error", 500)
      }
    };
  };