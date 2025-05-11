const moongoose = require('mongoose');
const Courses = require('./Courses');
const courseProgress =new moongoose.Schema({
     
    courseID:{
        type:moongoose.Schema.Types.ObjectId,
        ref: 'Course', 
    },
    compeleteVedio:{
        type:moongoose.Schema.Types.ObjectId,
        ref: 'subSection',


    }




});
module.exports = moongoose.model('CourseProgress', courseProgress);