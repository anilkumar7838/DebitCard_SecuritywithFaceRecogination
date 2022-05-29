const express = require("express");
const authorizeUser = require("../middleware/authorizeUser");

const {getAccountDetails,withdrawCash, fundTransfer, miniStatement, getReview} = require("../controllers/userControllers");

const router = express.Router();
router.route("/withdraw").post(authorizeUser,withdrawCash);
router.route("/fundtransfer").post(authorizeUser,fundTransfer);
router.route("/ministatement").get(authorizeUser,miniStatement);
// router.route("/user/details").get(authorizeUser,getAccountDetails);
router.route("/user/details").get(authorizeUser,getAccountDetails);
router.route("/contact").post(getReview);

module.exports=router;