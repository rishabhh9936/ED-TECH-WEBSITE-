

// Add crypto at the top of the file
const crypto = require("crypto");
// ... other imports

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";
  const signature = req.headers["x-razorpay-signature"];
  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment verified successfully");

    // The webhook payload's body is the data you need to process
    // The notes are now nested within the `payload` and `payment` objects
    const { courseId, userId } = req.body.payload.payment.entity.notes;

    // enroll user in course
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { enrolledUsers: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      const enrolledStudent = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { enrolledCourses: courseId } },
        { new: true }
      );
      console.log(enrolledStudent);

      // send email to user using the imported template
      const mailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations on enrolling in the course",
        courseEnrollmentMail(
          enrolledCourse.courseName,
          enrolledStudent.firstName
        ) // Using the imported mail template
      );
      console.log(mailResponse);
      return res.status(200).json({
        success: true,
        message: "User enrolled in course successfully",
        enrolledCourse,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Failed to enroll user in course",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
};
