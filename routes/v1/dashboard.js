"use strict";
const dashboardController = require("../../app/v1/bankcode/bankcode.controller");
const router = require("express").Router();
router.get("/",dashboardController.getBankCodes);
module.exports = router;