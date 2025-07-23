const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadAllToCloudinary } = require("../utils/imageUploader");


exports.createSubSection = async (req,res) => {
    try{
        // data fetch
        const {sectionId,title,timeDuration,description} = req.body;
        //extract file vedio
        const vedio = req.files.vedioFiles;
        ///validation
        if(!sectionId || !title || !timeDuration || !description || !vedio) {
            return res.status(400).json({
                success: false,
                message: "sectionId, title, timeDuration, description and vedio are required",
            });
        }
        //upload vedio to cloudnary
        const uploadDetails = await uploadAllToCloudinary(vedio, process.env.FOLDER_NAME);
        // create subsection
        const SubSectionDetails = await SubSection.create(
            {_Id: sectionId},
            {$push: {subSecttionDetails_id}},
            {new:true},
            
        )
        //.   HW update section withsub section object id using populate

        //return response
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            SubSectionDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}


// UPATE SUBSECTION 

// DELETE SUBSECTION