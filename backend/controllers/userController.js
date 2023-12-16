const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const TransportVehicle = require("../models/transportAgencyModel")
const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsync(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password, role, secretKey } = req.body;

  let userRole = role; 
  if (role === 'admin' && secretKey !== process.env.ADMIN_SECRET_KEY) {
    return next(new ErrorHandler('Invalid secret key for admin role', 400));
  }

  if (role === 'admin' && secretKey === process.env.ADMIN_SECRET_KEY) {
    userRole = 'admin';
  }

  let isApproved = true;
  if (userRole === 'travelAgency' || userRole === 'transportAgency') {
    isApproved = false;
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    isApproved,
    role: userRole,
    travelAgency: userRole === 'travelAgency' ? {
      agencyName: req.body['travelAgency.agencyName'],
      contactEmail: req.body['travelAgency.contactEmail'],
      contactPhone: req.body['travelAgency.contactPhone'],
      address: req.body['travelAgency.address']
    } : undefined,
    transportAgency: userRole === 'transportAgency' ? {
      agencyName: req.body['transportAgency.agencyName'],
      contactEmail: req.body['transportAgency.contactEmail'],
      contactPhone: req.body['transportAgency.contactPhone'],
      address: req.body['transportAgency.address']
    } : undefined,
  });

  if (isApproved) {
    const emailSubject = 'Welcome to Travelogue - Registration Successful';
    const emailMessage = `Hello ${name},\n\nThank you for registering on Travelogue. Your registration was successful.\n\n`;

    await sendEmail({
      email,
      subject: emailSubject,
      message: emailMessage,
      contentType: "text"
    });
  }
  if (userRole === 'user' || userRole === 'admin') {
    sendToken(user, 201, res);
  } else {
    res.status(201).json({
      success: true,
      user,
    });
  }
});


// Login User
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password} = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password +role");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password.", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password.", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
      contentType:"text"
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
//Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
// Get User Details
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    user,
  });
});

// Get User Details
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.json({
    success: true,
    user,
  });
});


// Update User Password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect.", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(
        "New Password does not match with Confirm Password.",
        400
      )
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    updatedUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  // Additional fields for special users
  if (req.user.role === 'travelAgency') {
    updatedUserData.travelAgency = {
      agencyName: req.body.agencyName,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      address: req.body.address,
    };
  } else if (req.user.role === 'transportAgency') {
    updatedUserData.transportAgency = {
      agencyName: req.body.agencyName,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      address: req.body.address,
    };
  }
 
 const user = await User.findByIdAndUpdate(req.user.id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
// Get All Users -- Admin wants to get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get all Travel agencies and Transport agencies which are not approved
exports.getAllUnapprovedUsers = catchAsync(async (req, res, next) => {
  
  const unapprovedUsers = await User.find({ isApproved: false });

  res.status(200).json({
    success: true,
    unapprovedUsers,
  });
});

// Get Single User -- Admin wants to get the details of single user
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id : ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Get single user for Blogs
exports.getSingleBlogUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id : ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});


// Update User Role -- Admin wants to change the role of the user
exports.updateUserRole = catchAsync(async (req, res, next) => {
  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id : ${req.params.id}`)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Update Approvel status -- admin
exports.updateApprovelStatus = catchAsync(async (req, res, next) => {
  const updatedUserData = {
    isApproved: req.body.isApproved,
  };
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id : ${req.params.id}`)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
    const emailSubject = 'Welcome to Travelogue - Registration Successful';
    const emailMessage = `Hello ${user.name},\n\nThank you for registering on Travelogue. Your registration was successful.\n\n`;

    await sendEmail({
      email:user.email,
      subject: emailSubject,
      message: emailMessage,
      contentType: "text"
    });
  res.status(200).json({
    success: true,
  });
});
// Contact
exports.contact = catchAsync(async (req, res) => {
  const { subject, query } = req.body;

  try {
    // Send email
    await sendEmail({
      email: process.env.SMTP_MAIL,
      subject,
      message: query,
      contentType: 'text',
    });
    res.status(200).json({ success: true, message: 'Query submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error submitting query' });
  }
});
// Delete User -- Admin wants to delete the user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  const emailSubject = 'Account Deletion Confirmation - Travelogue';
  const emailMessage = `Hello ${user.name},\n\nWe regret to inform you that your Travelogue account has been deleted by an administrator due to a violation of our community guidelines. If you have any questions or would like to appeal this decision, please contact our support team.\n\nThank you for being a part of Travelogue.\n\nBest regards,\nThe Travelogue Team`;

  await sendEmail({
    email: user.email,
    subject: emailSubject,
    message: emailMessage,
    contentType: "text"
  });

  if (user.role === 'travelAgency') {
    await Product.deleteMany({ user: user._id });
  } else if (user.role === 'transportAgency') {
    await TransportVehicle.deleteMany({ user: user._id });
  } else if (user.role === 'user') {
    await Order.deleteMany({ user: user._id });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
