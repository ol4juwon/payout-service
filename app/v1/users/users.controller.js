const UserService = require("./users.service");

exports.getUsers = async (req, res) => {
  try {
    const { page, limit, dir, orderBy } = req.query;
    const { error, data, code } = await UserService.getUsers(
      page,
      limit,
      orderBy,
      dir
    );
    if (error) {
      return createErrorResponse(res, error, code || 400);
    }

    return createSuccessResponse(res, data, code || 200);
  } catch (error) {
    return createErrorResponse(res, "Internal server error", 500);
  }
};
