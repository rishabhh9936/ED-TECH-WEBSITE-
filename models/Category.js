const moongoose = require('mongoose');
   const categorySchema = new moongoose.Schema(
    {
        name:{
            type:String,
            required: true,
           
        },
        description:{
            type:Number,
            
        },
        course:{
            type:moongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    }
);
module.exports =moongoose.model('Category',categorySchema);