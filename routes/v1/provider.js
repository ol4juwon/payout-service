"use strict";
const providerController = require("../../app/providers/provider.controller");
const providerValidator = require("../../app/providers/provider.validator")
const router = require("express").Router();
router.post("/",providerValidator.addProvider,providerController.addProvider);
module.exports = router;