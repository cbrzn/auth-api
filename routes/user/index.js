const express = require("express");
const user = require("../../controllers/user");
const tokenVerify = require("../../middlewares/tokenVerify")

const router = express.Router();

router.post("/signup/request", user.requestSignUp);
router.put("/signup/complete", tokenVerify, user.assignRole);
router.post("/login", user.newSession);
router.post("/logout", user.logOut);

module.exports = router;