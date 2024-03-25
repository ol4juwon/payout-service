"use strict";
const UserController = require("../../app/v1/users/users.controller");
const UserValidator = require("../../app/v1/users/users.validator")
const router = require("express").Router();
router.get("/",UserController.getUsers);
module.exports = router;