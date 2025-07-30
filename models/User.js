const mongoose = require('mongoose');
const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ['Admin','Student' ,'Instructor'],
    required: true,
  },
  active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
  additionalDeatails: {
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile',},

    token:{
      type: String

    },
    resetPasswordExpire:{
      type:Date

    },

    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',  
        }
    ],
    image:{
        type:String,
        required:true,
    },
    coursesProgresss:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courseProgress',  
        }
    ],

  address: {
    type: String,
    required: true,
  },
  
},








{ timestamps: true });

module.exports = mongoose.model('User', userSchema); 