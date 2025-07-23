const Tags = require("../models/tags");

exports.createTags = async (req, res) => {
  try {
    const { name, descrption } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        sucess: false,
        message: "name and description are required",
      });
    }
      // create entry in db
      const tagDetails = await Tags.create({
        name:name,
        description:description,


      });
      console.log(tagDetails);

      return res.status(200).json({
        sucess:true,
        messsage:"Tag created sucessfully",
      });
    
  } 
  catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.mesage,
    });
  }
};



//  GET ALL TAGS

exports.allTags = async (req,res) => {

    try {
        const allTags = await Tags.find({},{name:true,description:true});
        return res.status(200).json({
            sucess:true,
            message:"ALL TAGS RETURN SUCESSFULLY",
            allTags
        });
    }
    catch(error) {
        return res.status(500).json({
            sucess:false,
            message: "Error in fetching tags"
        });

    }

};
