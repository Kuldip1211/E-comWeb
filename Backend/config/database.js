const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

const connectDatabase = async () => {
  try {
    const dbURI = process.env.DB_URI;
    if (!dbURI) {
      throw new Error('DB_URI environment variable is not set.');
    }

    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add other options as needed (e.g., connection pooling, retry)
    });

    console.log(`MongoDB connected:`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDatabase;