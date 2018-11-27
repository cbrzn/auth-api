const express = require("express");
const user = require("../../controllers/user");

const router = express.Router();

router.post("/signup", user.newUser);
router.post("/login", user.newSession);
router.post("/logout", user.logOut);

module.exports = router;