const moongoose = require('mongoose');
const user = new moongoose.Schema({
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
  additionalDeatails: {
    type:moongoose.Schema.Types.ObjectId,
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
            type: moongoose.Schema.Types.ObjectId,
            ref: 'Course',  
        }
    ],
    image:{
        type:String,
        required:true,
    },
    coursesProgresss:[
        {
            type: moongoose.Schema.Types.ObjectId,
            ref: 'courseProgress',  
        }
    ],

  address: {
    type: String,
    required: true,
  },
});

module.exports = moongoose.model('User', userSchema); 