const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
   gender:{ 
    type: String

   },
   dateOfBirth: {
    type: Date,
    required: true,
   },
   about:{
    type: String,
    required: true,
   },
    phoneNumber: {
     type: String,
     required: true,
     trim: true,
    },

});

module.exports = mongoose.model('Profile', profileSchema);