const Courses = require("../models/Courses");
const Tag = require("../models/tags");
const User = require("../models/User");
const {uploadAllToCloudinary} = require("../utils/imgeUploader");



// create courses handler function

exports.createCourses = async(req,res) => {
    try{

        const{courseName,courseDescription,whatWillYouLearn,price,tag} = req.body;
        const thumbnail = req.files.thumbnailImage;
        // validation
        if(!courseName || !courseDescription || !whatWillYouLearn || !price || !tag || !thumbnail){
            return res.status(400).json(
                {   sucess:false,
                    message:"All fields are required",
                });
        }

        // check for instructor
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log("instructor details",instructorDetails)
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor not found",
            });
        }

        // check tag details
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"Tag not found",
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadAllToCloudinary(thumbnail, process.env.FOLDER_NAME);
        // create courses
        const newCourse = await Courses.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._Id,
            whatWillYouLearn:whatWillYouLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        // add the courses to the new user schema of instructor
        await User.findIdandUpdate(
            { id:instructorDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true }
        ); 
        // update the tag schema
        await Tag.findByIdAndUpdate(
            { _id: tagDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true }
        );
        // return response
        res.status(201).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });

    }
    catch(error){
        console.error("Error creating course:", error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        });

    }

};

// get aa courses handler

exports.getAllCourses = async(req,res) => {
    try {
        const allCourses = await Courses.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            RatingandReview:true,
            StudentEnrolled:true,
        }).populate("instructor").exec(); 
        return res.status(200).json(
            {
                success: true,
                message: "All courses fetched successfully",
                data: allCourses,
            }
        )
    }
    catch(error){
        
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });

    }
}

