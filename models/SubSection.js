const moongoose = require('mongoose');

const subSectionSchema = new moongoose.Schema({
    tittle:{
        type:String,
        
    },
    timeDuration:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    vediopUrl:{
        type:String,
       
    },
    
});
module.exports = moongoose.model('SubSection', subSectionSchema);