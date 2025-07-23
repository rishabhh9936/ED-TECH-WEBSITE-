//send opt

const User = require("../models/User");
const OTP = require("../models/OPT");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
  try {
    // get mail from body
    const { email } = req.body;

    //check user exist or not
    const checkUserPresent = awaitUser.findOne({ email });
    if (checkUserPresent) {
      return res.status(400).json({
        sucess: false,
        message: "USER ALREADY EXIST",
      });
    }

    // generrate otp

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
      lowerCaseAlphabets: false,
    });
    console.log("OTP-GENERATED", otp);

    //CHECK UNIQUE OTP
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: false,
      });
      console.log("OTP-GENERATED", otp);
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayLoad = {
      email,
      otp,
    };

    // save otp in db
    const otpBody = await OTP.create(otpPayLoad);
    console.log(otpBody);

    //return response sucessfully
    res.status(200).json({
      sucess: true,
      message: "OTP SEND SUCCESSFULLY",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//HANDLING SIGNUP
//DATA FETCH FROM REQUEST BODY
// VALIDDATE
//MATCH PASSWORD THAT IS ENTER 2 TIMES
//CHECK USER ALREADY EXIST

// FIND MOST RECENT OTP
//CHECK OTP VALIUD OR NOT

//HASH PASSWORD
//ENTRY CRAETE IN DB

try {
  exports.signUP = async (req, res) => {
    const {
      firstName,
      lastname,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(400).json({
        sucess: false,
        message: "PLEASE ENTER ALL THE FIELDS",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        sucess: false,
        message: "password do not match ,kindly enter same password",
      });
    }

    const existingUser = await User.findone({ email });
    if (existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "USER ALREADY EXIST",
      });
    }

    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recent oto", recentOtp);
    if (recentOtp.length === 0) {
      return res.status(400).json({
        sucess: false,
        message: "OTP NOT Found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        sucess: false,
        message: "OTP NOT MATCH",
      });
    }

    const hashedPassword = await bcrypt.hashedPassword(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateofBirth: null,
      about: null,
      phoneNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNumber,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });
    return res.status(200).json({
      sucess: true,
      message: "USER SIGNUP SUCCESSFULLY",
      user,
    });

    // return res.status(200).json({
    //   sucess: true,
    //   message: "USER SIGNUP SUCESSFULLY",
    //   user,
    // });
  };
} catch (error) {
  console.log(error);
  return res.status(500).json({
    sucess: false,
    message: "user cannot signup,please try again",
  });
}


exports.login = async(req,res) => {
    try{
        //get data from body
        const{email,password} =req.body;
        if(!email ||! password){
            return res.status(400).json({
                sucess:false,
                messsage:"PLEASE ENTER ALL THE FILEDS",
            });
        }
        //validate data OR CHECK USER EXIST OR NOT
        const user = await User.findOne({email}).populate("additionalDeatails");
        if(!user){
            return res.status(400).json({
                sucess:false,
                message:"USER NOT FOUND,KINDLY SIGNUP",
            });
          }
            
            
            //generate JWT OR AFTER PASSWORD MATCHING
            if (await bcrypt.compare(password,user.passrord)){
                const payload = {
                    email:user.email,
                    id:user_id,
                    accountType:user.accountType,
    
                }
                const token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expireIn:"2h",
                });
                user.token =token;
                user.password= undefined;
    
            }
            //CREATE COOKIES AND SEND RESPOPNSE
    
    
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            }
            res.cookie("token",token,options).status(200).json({
                sucess:true,
                token,
                user,
                message:"USER LOGIN SUCESSFULLY",
            })
        
        
        //generate JWT OR AFTER PASSWORD MATCHING
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:"USER CANNOT LOGIN,PLEASE TRY AGAIN",
        });

    }
};

//change passwords
/*.   GET DATA FROM BODY
VALUDATE DATA 
CHECK USER EXIST OR NOT
CHECK OLD PASSWORD,
GET NEW PASSWORD AND CONFIRM PASSWORD
SEND MAIL TO USER 
RETURN RESPONSE
*/
