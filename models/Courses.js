const moongoose = require('mongoose');
const coursesSchema = new moongoose.Schema({
    courseName:{
        type:String,
       
    },
    courseDescription:{
        type:String,
        
    },
    instructor:{
        type: moongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    whatwillYouLearn:{
        type:String,
        
    },
    courseContent:
    [{
        type: moongoose.Schema.Types.ObjectId,
       
        trim:true,
    }],
    RatingandReview:{
        type: moongoose.Schema.Types.ObjectId,
        
        ref: 'RatingandReview',

    },
    Price:{
        type:number,
        required:true,
        trim:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    Tag:{
        type:moongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tag',


    },
    StudentEnrolled:[
        {
            type: moongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    ]

});
module.exports = moongoose.model('Course', coursesSchema);

