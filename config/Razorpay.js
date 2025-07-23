const Razorpay = require('razorpay');


exports.instance = new Razorpay({
    keyId:process.env.RAZORPAY_KEY,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
})