"use strict";
const router = require("express").Router();
const userRouter = require("./users")
const authRouter = require("./auth");
const bankRouter = require("./bankcodes")
const beneficiaryRouter = require("./beneficiaries")
const providerRouter = require("./provider")
const walletRouter = require("./wallet")
const transactionRouter = require("./transactions")
const dashboardRouter = require("./dashboard");
const { validateClient, validateToken } = require("../../app/Middleware");


router.use("/auth", authRouter);
router.use(validateToken);
router.use("/users",userRouter);
router.use("/bankcode",bankRouter);
router.use("/beneficiaries",beneficiaryRouter);
router.use("/provider", providerRouter);
router.use("/transactions", transactionRouter)
router.use("/wallet", walletRouter);
router.use("/dashboard", dashboardRouter)
module.exports = router;