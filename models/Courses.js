const mongoose = require('mongoose');
const coursesSchema = new mongoose.Schema({
    courseName:{
        type:String,
       
    },
    courseDescription:{
        type:String,
        
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    whatwillYouLearn:{
        type:String,
        
    },
    courseContent:
    [{
        type: mongoose.Schema.Types.ObjectId,
       
        trim:true,
    }],
    RatingandReview:{
        type: mongoose.Schema.Types.ObjectId,
        
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
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tag',


    },
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    StudentEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    ]

});
module.exports = mongoose.model('Course', coursesSchema);

