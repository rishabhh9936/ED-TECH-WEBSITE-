const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_URI = process.env.MONGO_URI; // Replace with your MongoDB URI
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}


module.exports = connectDB;
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();