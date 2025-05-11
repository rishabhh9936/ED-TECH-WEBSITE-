const moongoose = require("mongoose");
const { create } = require("./profile");
const OTPSchema = new moongoose.Schema({
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

async function sendVerificationMail(email, opt) {
  try {
    const mailResponse = await mailSender(
      email,
      "verification Email fron StudyNotion",
      otp
    );
    console.log("Email send successfully", mailResponse);
  } catch (error) {
    console.log("Error in sending email", error);
    throw error;
  }
}

OTP.Schema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp);
  next();
});
module.exports = moongoose.model("OTP", OTPSchema);
