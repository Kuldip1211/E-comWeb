const catchAsyncError = require("../middleware/catchAsyncerror"); // Fixed typo
const User = require("../models/userMmodel"); // Fixed typo

// exports.registerUser = catchAsyncError(async (req, res, next) => {
//   const { name, email, password } = req.body;

//   const user = await User.create({
//     name,
//     email,
//     password,
//     avatar: {
//       public_id: "this is a sample id",
//       url: "photourl",
//     },
//   });

//   
// });


const registerUser = catchAsyncError(async (req, res, next) => {
  // Your registration logic here
  const { name, email, password } = req.body;
  const user = await User.create({
       name,
       email,
       password,
       avatar: {
         public_id: "this is a sample id",
         url: "photourl",
       },
     });

     const token  = user.getJWTToken();
     
     res.status(201).json({
          success: true,
          user,
        });
});

module.exports = { registerUser }; // Exporting as an object