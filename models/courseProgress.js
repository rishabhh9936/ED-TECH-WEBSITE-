const mongoose = require("mongoose");
const Courses = require("./Courses");
const courseProgress = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  compeleteVedio: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "subSection",
  },
});
module.exports = mongoose.model("CourseProgress", courseProgress);
