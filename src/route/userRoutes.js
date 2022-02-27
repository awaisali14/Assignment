const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/userController");
const login = require("../controller/userAuth");

router.route("/create-user").post(createUser);
router.route("/login").post(login);
module.exports = router;
