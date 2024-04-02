"use strict";
const { USER } = require("../../Constants");
const { checkPermission } = require("../../app/Middleware");
const walletController = require("../../app/v1/wallet/wallet.controller");
const walletValidator = require("../../app/v1/wallet/wallet.validator")
const router = require("express").Router();
router.post("/",checkPermission( USER.ROLES.ADMIN), walletValidator.create,walletController.create);
router.get("/",checkPermission( USER.ROLES.ADMIN), walletValidator.getAll,walletController.getWallets);
router.get("/:id",checkPermission(USER.ROLES.ADMIN, USER.ROLES.USER), walletValidator.getOne,walletController.getWalletDetails);
router.post("/:id/fund",checkPermission( USER.ROLES.ADMIN), walletValidator.fund,walletController.creditWallet);
module.exports = router;