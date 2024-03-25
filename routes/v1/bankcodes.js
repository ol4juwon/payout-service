"use strict";
const bankCodeController = require("../../app/v1/bankcode/bankcode.controller");
const router = require("express").Router();
router.get("/",bankCodeController.getBankCodes);
module.exports = router;