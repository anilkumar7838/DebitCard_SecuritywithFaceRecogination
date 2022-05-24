const express = require("express");

const {getAccountDetails, loginUser, registerUser, logout, getTransaction} = require("../controllers/userControllers");
const {isAuthenticatedUser} = require("../middleware/authentication");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/user/:id").get(isAuthenticatedUser,getAccountDetails);
router.route("/user/transaction").get(isAuthenticatedUser,getTransaction);

module.exports=router;