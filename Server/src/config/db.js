const mongoose = require('mongoose');

const connectDb = async () => {
    try {
      await mongoose.connect(process.env.Mongo_URL);
      console.log('MongoDB connected in Cloud');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit process with failure
    }
  };
  module.exports = connectDb;