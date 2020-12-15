const mongoose = require('mongoose');

const URI = "mongodb+srv://kgarwood:103198@newcluster.rlswc.mongodb.net/users?retryWrites=true&w=majority"

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    });
    console.log('db connected ..!');
  }

  module.exports = connectDB;