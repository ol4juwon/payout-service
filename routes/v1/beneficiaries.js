const router = require("express").Router();
const beneficairyController = require("../../app/v1/beneficiary/beneficiary.controller")
const beneficairyValidator = require("../../app/v1/beneficiary/beneficiary.validator");

router.post('/',beneficairyValidator.create, beneficairyController.create);
router.get("/", beneficairyController.getAll)

module.exports = router;