"use strict";
const AuthController = require("../../app/v1/auth/auth.controller");
const AuthValidator = require("../../app/v1/auth/auth.validator")
const router = require("express").Router();
router.post("/login",AuthValidator.login,AuthController.login);
module.exports = router;