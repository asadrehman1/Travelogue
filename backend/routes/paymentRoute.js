const express = require("express");
const router = express.Router();
const { isAuthenticatedUser }= require("../middlewares/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");

router.post("/payment/process",isAuthenticatedUser,processPayment);
router.get("/stripeapikey",isAuthenticatedUser,sendStripeApiKey);

module.exports = router;