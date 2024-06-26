"use strict";
const { USER } = require("../../Constants");
const { checkPermission } = require("../../app/Middleware");
const providerController = require("../../app/providers/provider.controller");
const providerValidator = require("../../app/providers/provider.validator")
const router = require("express").Router();
router.post("/",providerValidator.addProvider,providerController.addProvider);
router.get("/", providerValidator.getProviders, providerController.getProviders);
router.get("/:id", providerValidator.getSingleProvider, providerController.getSingleProvider);
router.patch("/:id/toggleStatus",checkPermission(USER.ROLES.SUPER_ADMIN,USER.ROLES.ADMIN), providerValidator.toggleProvider, providerController.toggleProviderStatus);
router.patch("/:id/setDefault/",checkPermission(USER.ROLES.SUPER_ADMIN,USER.ROLES.ADMIN), providerController.setDefault);
module.exports = router;