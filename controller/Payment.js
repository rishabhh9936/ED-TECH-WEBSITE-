
const {instance} = require('../config/Razorpay');
const Course = require('../model/Course');
const User = require('../model/User');
const mailSender = require('../utils/mailSender');  
const {courseEnrollmentMail} = require('../utils/mailTemplates/courseEnrollmentMail');
const {default: mongoose} = require('mongoose');









// capture payment and initiate  razorpay order
exports.capturePayment = async (req,res) => {
    

        // get course id and user id
        const {course_Id} =req.body;
        const userId = req.user.id;
        //validation
        // validate coursee
        if(!course_Id){
            return res.status(400).json({
                sucess: false,
                message: "Please provide course id",
            });
        }

        //validate course details
        let course;
        try{
            course = await Course.findById(course_Id);
            if(!course){
                return res.status(404).json({
                    sucess: false,
                    message: "Course not found",
                });
            }
            
            // check if user is already enrolled in the course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.enrolledUsers.includes(uid)){
                return res.status(200).json({
                    sucess: false,
                    message: "You are already enrolled in this course",
                });
            }
        }
        catch(error){
            return res.status(500).json({
                sucess: false,
                message: "INTERNAL SERVER ERROR",
            });

        }

        // 
    
    

    
    // create razorpay order
    const amount = course.price;
    const currency = "INR";
    const options = {
        amount:amount * 100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId: course_Id,
            userId,
        }
    }

    try{
        // initaite payment
        const paymentResponse = await instance.order.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            sucess: true,
            courseName: course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId: paymentResponse.id,
            amount: paymentResponse.amount,
            currency: paymentResponse.currency,
            message: "Payment order created successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            sucess: false,
            message: "Failed to create payment order",
        });

    }
};

// verify signature
exports.verifySignature =  async (req,res) => {
    const webhookSecret = "12345678";
    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if(signature === digest){
        console.log("payment verified successfully");

        const {courseId, userId} = req.body.payload.payment.entity.notes;
        // enroll user in course
        try {   
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {enrolledUsers: userId}},
                {new: true}
            );
            if(!enrolledCourse){
                return res.status(404).json({
                    sucess: false,
                    message: "Course not found",
                });
            }
            const enrolledStudent = await User.findByIdAndUpdate(
                { _id:userId},
                {$push: {enrolledCourses: courseId}},
                {new: true});
                console.log(enrolledStudent);

                // send email to user
                const mailResponse = await mailSender(
                    enrolledStudent.email,
                    "Congrulations on enrolling in course",
                   "congratulations,you are onboarded into new course"
                );
                console.log(mailResponse);
                return res.status(200).json({
                    sucess: true,
                    message: "User enrolled in course successfully",
                    enrolledCourse,
                });


    }
    catch(error){
        return res.status(500).json({
            sucess: false,
            message: "Failed to enroll user in course",
        });
    }   
    

}