const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../utils/mailTemplates/emailTemplate");
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "5m", // OTP expires after 5 minutes
  },
});

async function sendVerificationMail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "verification Email fron StudyNotion",
      emailTemplate(otp)
    );
    console.log("Email send successfully", mailResponse);
  } catch (error) {
    console.log("Error in sending email", error);
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp);
  next();
});
module.exports = mongoose.model("OTP", OTPSchema);
