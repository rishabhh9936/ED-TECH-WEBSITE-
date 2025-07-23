const User = require("../model/User");
const mailSender = require("../utils/mailSender");



// reset passwords token


exports.resetPasswordToken = async (req,res) => {


    try {

        //get email from body
    
        const email =req.body.email;
    
        //check user from this email,email validation
        const user = await User.findOne({email});
        if(!user){
            return res.json( {
                sucess:false,
                message: "user not found with this email"
            });
    
        } 
        //generate token
        const token = crypto.randomUUID();
    
        //update user by token and expire time 
    
        const updateDetail = await User.findOneAndUpdate(
            {email},
            {
                token:token,
                resetPassswordExpire: Date.now()+ 5*60*1000
            },
            {
                new:true,
            }
        )
        //create url
         const url = `https://localhost:3000/update-password/${token}`
        //send mail containing url
    
        await mailSender(email,
            "Reset password link",
            `Password reset link :${url}`);
    
        
        //return response
        return res.json({
            sucess:true,
            message:"email sent sucessfully,please check your email",
        });
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:error.message,
        })
    }
    


    
}
//reset password

exports.resetPassword = async (req,res) => {


    try{


        // data fetch
        const {password,confirmPassword} = req.body;
        //validation
        if(!password || !confirmPassword){
            return res.json({
                sucess:false,
                message:"password and confirm password are required"
            });
        }
        // get user details from DB by token
        const userDetails = await User.findOne({token: token});
        //if no entry - invalid  details
        if(!userDetails){
            return res.json({
                sucess:false,
                message:"invalid token "
            });
        }
        //token time checken
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                sucess:false,
                message:"token is expired"
            });
        }
        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);
    
        //password upadte
    
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
    
        //return response
        return res.json({
            sucess:true,
            message:"password updated sucessfully",
        });
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,
            message:error.message,
        });
    }
    
}