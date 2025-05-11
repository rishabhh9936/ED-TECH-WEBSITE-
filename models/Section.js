const moongoose = require('mongoose');
const sectionSchema=new moongoose.Schema( {
    sectionName:{
        type:String,
        
    },
    subSection:[
    {
        type: moongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SubSection',
    }]

})
module.exports =moongoose.model('Section',sectionSchema);