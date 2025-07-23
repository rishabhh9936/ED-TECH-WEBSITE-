//auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();


exports.auth = async(req, res,next) =>{

try{
    //extract token
    const token = req.cookies.token ||req.body.token||req.header("Authorization").repalce("Bearer ", "");
    if(!token){
        return res.status(401).json({
            sucess:false,
            message:"UNAUTHORIZED USER",
        });
    }
    // verify token
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
    }
    catch(error){
        return res.status(401).json({
            sucess:false,
            message:"Token is not valid",
        })

    }
    next();
                   
}
catch(error){
    console.log(error);
    return res.status(500).json({
        sucess:false,
        message:"INTERNAL SERVER ERROR",
    });
}

}



//is Student
exports.isStudents = async(req,res,next) => {
    try{
        if(req.user.accountType !== "students"){
            return res.status(403).json({
                sucess:false,
                message:"FORBIDDEN ACCESS,ONLY STUDENTS ALLOWED",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            sucess:false,
            message:"INTERNAL SERVER ERROR",

        })

    }
}

// is teacher
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(403).json({
                sucess:false,
                message:"FORBIDDEN ACCESS,ONLY INSTRUCTOR ALLOWED",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            sucess:false,
            message:"INTERNAL SERVER ERROR",

        })

    }
}
// is admin 
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(403).json({
                sucess:false,
                message:"FORBIDDEN ACCESS,ONLY Admin ALLOWED",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            sucess:false,
            message:"INTERNAL SERVER ERROR",

        })

    }
}