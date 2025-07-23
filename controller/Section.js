const Section = require("../models/Section");
const Course = require("../models/Courses");


exports.createSection = async (req, res) => {

try{
    // data fetch 
    const { sectinName, courseId } = req.body;

     // data validation
     if(!sectionName || !courseId){
        return res.status(400).json({
            sucess: false,
            message:"section name and courseId are required",
        });
     }
    //create section
    const newSection = await Section.create({sectionName});
    // upadte course with section id 
    const updatedCourseDeatils = await Course.findByIdAndUpdate( 
        courseId,
        { $push: { courseContent:newSection.id,}},
        {new:true},
    );
    // use populate to replace section and sub section both in updated coursedetais
    

     

    // return response
    return res.status(200).json({
        success:true,
        message:"section created sucessfully",
        updatedCourseDeatils,
    });

}
catch(error){
    console.error("Error creating section:", error);
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
    });
}



}

exports.updateCourse = async (req,res) => {
    try{
        //take data
        const {sectionName, sectionId} = req.body;
        // validate data
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "section name and section id are required",
            });
        }
        // upadte data 
        const section = await section.findByAndUpdate(sectionId,{sectionName},{new:true});
        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            section,
        });
    }
    catch(error){
        console.error("Error updating course:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

exports.deleteSection = async (req,res) => {
    try{
        // get section id
        const { sectionId } = req.params;
        //find and delete
        await Section.findByIdAndDelete(sectionId);
        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}