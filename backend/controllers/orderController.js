const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel")

// Create New Order
exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    travelAgencyId,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    travelAgencyId,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order Of User
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler(`Order does not exist with Id.`, 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged In User Orders
exports.myOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if(!orders){
    return next(new ErrorHandler("Orders does not exist with this Id"));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders By Admin
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount = totalAmount + order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status By Admin
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  

  if (!order) {
    return next(new ErrorHandler(`Order does not exist with Id.`, 404));
  }

  // Get the new status from req.body
  const newStatus = req.body.status;

  // You can define your email subject and content based on the status
  let emailSubject, emailContent;

  if (newStatus === 'Accept') {
    emailSubject = 'Booking Accepted';
    emailContent = 'Your booking has been accepted.';
  } else if (newStatus === 'Reject') {
    emailSubject = 'Booking Rejected';
    emailContent = 'Sorry, your booking has been rejected.';
  }

  const user = await User.findById(order.user);
  if(!user){
    return next(new ErrorHandler(`User does not exist with Id.`, 404));
  }
  console.log(user.email)
  console.log(emailSubject)
  console.log(emailContent)
  try {
    await sendEmail({
      email:user.email, 
      subject:emailSubject, 
      message:emailContent,
      contentType:"text"
    });
    order.orderStatus = newStatus;
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler('Email sending failed', 500));
  }
});

// exports.updateOrderStatus = catchAsync(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHandler(`Order does not exist with Id.`, 404));
//   }

//   if (order.orderStatus === "Accept") {
//     return next(new ErrorHandler("You have already delivered this order."));
//   }
  
//   order.orderStatus = req.body.status;

//   if (req.body.status === "") {
//     order.deliveredAt = Date.now();
//   }

//   await order.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// async function updateStock(id, quantity) {
//   const product = await Product.findById(id);

//   product.stock = product.stock - quantity;

//   await product.save({ validateBeforeSave: false });
// }

// Delete Order By Admin
exports.deleteOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order does not exist with Id.`, 404));
      }
  
    await order.deleteOne();
  
    res.status(200).json({
      success: true,
      message:"Order has been deleted Successfully."
    });
  });
  // update Capacity
  