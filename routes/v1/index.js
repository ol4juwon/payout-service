"use strict";
const router = require("express").Router();
const userRouter = require("./users")
const authRouter = require("./auth");
const bankRouter = require("./bankcodes")
const providerRouter = require("./provider")
const { validateClient, validateToken } = require("../../app/Middleware");
router.use(validateClient);


router.use("/auth", authRouter);
router.use(validateToken);
router.use("/users",userRouter);
router.use("/bankcode",bankRouter);
router.use("/provider", providerRouter);
module.exports = router;