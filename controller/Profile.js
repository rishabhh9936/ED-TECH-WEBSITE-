const profile = require("../model/Profile");
const User = require("../model/User");

exports.upadteProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const userId = req.user.id;
    if (!dateOfBirth || !about || !contactNumber || !gender) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }
    //find profile by user id
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    //update details
    profileDetails.dateOfBirh = dateOfBirth;

    profileDetails.about = about;

    profileDetails.contactNumber = constactNumber;

    profileDetails.gender = gender;
    await profileDetails.save();
    return res.status(200).json({
      sucess: true,
      message: "Profile updated successfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

//  delete account 

exports.deleteAccount = async (req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                sucess: false,
                message: "User not found",
            });
        }
        /// delete user profile
        
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});

        //todo user unenroll from courses
        await User.findByIdAndDelete(id);


        return res.status(200).json({
            sucess: true,
            message: "Account deleted successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            sucess: false,
            message: "INTERNAL SERVER ERROR",
        });
    }

}


//get all user details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId).populate("additionalDetails").exec();
    if (!userDetails) {
      return res.status(4).json({
        sucess: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      sucess: true,
      message: "User details fetched successfully",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
}
