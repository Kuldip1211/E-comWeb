const catchAsyncError = require("../middleware/catchAsyncerror"); // Fixed typo
const User = require("../models/userMmodel"); // Fixed typo
const ErrorHandler = require("../utils/errorhandle"); // Fixed typo

// Register function
const registerUser = catchAsyncError(async (req, res, next) => {
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

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    user,
    token, // Returning the token as well
  });
});

// Login function
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter a valid email and password", 400));
  }

  // Use findOne to get a single user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or user", 401));
  }

  // Ensure comparePassword exists in your User schema
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
    user, // Returning user data if needed
  });
});

module.exports = { registerUser, loginUser };
