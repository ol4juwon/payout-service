"use strict";
const { USER } = require("../../Constants");
const { checkPermission } = require("../../app/Middleware");
const UserController = require("../../app/v1/users/users.controller");
const UserValidator = require("../../app/v1/users/users.validator")
const router = require("express").Router();
router.get("/",checkPermission([USER.ROLES.ADMIN,USER.ROLES.SUPER_ADMIN]), UserController.getUsers);
router.post("/",checkPermission([USER.ROLES.ADMIN,USER.ROLES.SUPER_ADMIN]),UserValidator.createUser, UserController.createUser);
router.get("/:id",checkPermission([USER.ROLES.ADMIN,USER.ROLES.SUPER_ADMIN]), UserController.getSingleUser);
router.put("/:id/blacklist",checkPermission([USER.ROLES.ADMIN,USER.ROLES.SUPER_ADMIN]),UserValidator.blacklist, UserController.blacklistUser);
router.put("/:id/status/:toggle",checkPermission([USER.ROLES.ADMIN,USER.ROLES.SUPER_ADMIN]),UserValidator.toggleUser, UserController.toggleUser);
module.exports = router;