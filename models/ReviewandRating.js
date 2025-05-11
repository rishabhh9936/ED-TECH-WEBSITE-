const mongoose = require('mongoose');
const ratingAndReview = new mongoose.Schema( {

    user:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,  
        ref:'User',

    },
    rating:{
        type:Number,
        required:true,
        trim:true,
    },
    review:{
        type:String,
        required:true,
        trim:true,
    },

});
module.exports =mongoose.model(RatingAndReview ,ratingAndReview);