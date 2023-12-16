const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB is connected with server');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDatabase;
