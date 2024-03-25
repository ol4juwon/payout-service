"use strict";
const { USER } = require("../../Constants");
const { checkPermission } = require("../../app/Middleware");
const UserController = require("../../app/v1/users/users.controller");
const UserValidator = require("../../app/v1/users/users.validator")
const router = require("express").Router();
router.get("/",checkPermission([USER.ROLES.ADMIN,USER.ROLES.SUPER_ADMIN]), UserController.getUsers);
module.exports = router;