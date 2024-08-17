const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Function to connect to the MongoDB database
const connectDatabase = () => {
    const dbURI = process.env.DB_URI;
    if (!dbURI) {
        console.error('DB_URI environment variable is not set.');
        return;
    }

    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.error('MongoDB connection error:', err));
};

// Export the function
module.exports = connectDatabase;
