const UserService = require("./users.service");

exports.getUsers = async (req, res) => {
  try {
    const { page, limit, sort, orderBy } = req.query;
    const { error, data, code } = await UserService.getUsers(
      page,
      limit,
      orderBy,
      sort
    );
    if (error) {
      return createErrorResponse(res, error, code || 400);
    }

    return createSuccessResponse(res, data, code || 200);
  } catch (error) {
    return createErrorResponse(res, "Internal server error", 500);
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const {id } = req.params;
    const { error, data, code } = await UserService.getOneUser(
      id
    );
    if (error) {
      return createErrorResponse(res, error, code || 400);
    }

    return createSuccessResponse(res, data, code || 200);
  } catch (error) {
    return createErrorResponse(res, "Internal server error", 500);
  }
};
exports.createUser = async (req, res) => {
  try{
    const payload = req.body;
    const {error, data, code} = await UserService.createUser(payload);
    if(error)
      return createErrorResponse(res, error, code)

      return createSuccessResponse(res, data, code);
  }catch(err){
    console.log(err);
    return createErrorResponse(res, "Internal server error", 500);
  }
}

exports.blacklistUser = async (req,res) =>{
  try{
    const {id} = req.params;
    const {error,data, code} = await UserService.blacklistUser(id);
    if(error) return createErrorResponse(res, error, code)

    return createSuccessResponse(res, data, code);
  }catch(err){
    console.log({err});
    return {error: "internal Server Error", code: 500}
  }
}

exports.toggleUser = async (req,res) =>{
  try{
    const {id, toggle} = req.params;
    const {error,data, code} = await UserService.toggleUser(id,toggle);
    if(error) return createErrorResponse(res, error, code)

    return createSuccessResponse(res, data, code);
  }catch(err){
    console.log({err});
    return {error: "internal Server Error", code: 500}
  }
}