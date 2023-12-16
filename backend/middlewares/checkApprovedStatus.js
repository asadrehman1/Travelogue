const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");

const checkApprovedStatus = async (req, res, next) => {
  try {
    const email = req.body.email; 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email or Password.' });
    }
    if (user.isApproved) {
      next();
    } else {
      res.status(403).json({ message: 'Your request is pending approval.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
  
  module.exports = checkApprovedStatus;