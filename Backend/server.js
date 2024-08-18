const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


// handlin uncaught erro like nothig defing but then console and use this 
process.on("uncaughtException",(err)=>{
    console.log("error: " + err);
    console.log("shuting down the server due to the uncaught exception: ");
    process.exit(1);
})

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Connect to the database
connectDatabase();

// Set a different port if 4000 is in use
const port = process.env.PORT || 4001;
 const server = app.listen(port, () => {
    console.log(`🚀 Listening on port ${port}`);
});


// unhanddled promis rejection in server meands string errorn in the server like mongodb link
process.on("unhandledRejection",err =>{
    console.log("Error" + err);
    console.log("shuting down the server due to the unhandle promis rejection ")

    server.close(()=>{
        process.exit(1);
    })

}) 