const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Connect to the database
connectDatabase();

// Set a different port if 4000 is in use
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`🚀 Listening on port ${port}`);
});
