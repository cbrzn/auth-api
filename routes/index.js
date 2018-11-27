const express = require("express");
const tokenVerify = require("../middlewares/tokenVerify")
const access = require("../controllers/access")
const user = require("./user");

const router = express.Router();

router.get("/", tokenVerify, access.accessUser)
router.use("/users", user);

module.exports = router;