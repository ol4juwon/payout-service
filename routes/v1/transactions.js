"use strict";
const transactionController = require("../../app/v1/transactions/transactions.controller");
const transactionValidator = require("../../app/v1/transactions/transactions.validator")
const router = require("express").Router();
router.get("/getBalance",transactionController.getWalletBalances);
router.get("/",transactionController.getallTransactions);
router.get("/getBalance",transactionController.getWalletBalances);
router.post("/nameEnquiry",transactionValidator.validateAccount, transactionController.validateBank);
module.exports = router;