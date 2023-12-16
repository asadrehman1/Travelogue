const TransportVehicle = require("../models/transportAgencyModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");

// Create Vehicle
exports.createVehicle = catchAsync(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "vehicles",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  const reviews = req.body.reviews ? JSON.parse(req.body.reviews) : [];
  const features = req.body.features ? JSON.parse(req.body.features) : [];
  const notIncludes = req.body.notIncludes
    ? JSON.parse(req.body.notIncludes)
    : [];

  req.body.user = req.user.id;
  req.body.images = imagesLinks;
  req.body.reviews = reviews;
  req.body.features = features;
  req.body.notIncludes = notIncludes;

  const vehicle = await TransportVehicle.create(req.body);
  res.status(201).json({
    success: true,
    vehicle,
  });
});

//Get all vehicles
exports.getAllVehicles = catchAsync(async (req, res, next) => {
  const resultsPerPage = 8;
  const vehicleCount = await TransportVehicle.countDocuments();

  const vehicles = await TransportVehicle.find();
  res.status(200).json({
    success: true,
    vehicles,
    vehicleCount,
    resultsPerPage,
  });
});
// Book Vehicle
exports.bookVehicle = async (req, res) => {
  const {
    email,
    vehicleName,
    numberOfDays,
    totalPrice,
    whatsappLink,
    quantity,
    selectedDate,
  } = req.body;
 
  try {
    await sendEmail({
      email,
      subject: "Booking Confirmation",
      message: `
    <p>Dear User,</p>
    <p>Thank you for booking ${vehicleName}. Here are the details:</p>
    <ul>
      <li>Number of Days: ${numberOfDays}</li>
      <li>Total Quantity: ${quantity}</li>
      <li>Date: ${selectedDate}</li>
      <li>Total Price: ${totalPrice}</li>
    </ul>
    <p>Please click on the following link to initiate the booking on WhatsApp:</p>
    <a href="${whatsappLink}" target="_blank">Chat on WhatsApp</a>
    <p>Thank you for choosing our service!</p>
  `,
      contentType: "html",
    });
    res
      .status(200)
      .json({ success: true, message: "Email sent to you!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Get Single Vehicle
exports.getSingleVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await TransportVehicle.findById(req.params.id).populate(
    "user"
  );
  if (!vehicle) {
    return next(new ErrorHandler("Vehicle Not Found", 404));
  }

  res.status(200).json({
    success: true,
    vehicle,
  });
});

//Get All Vehicle -- TRANSPORTAGENCY
exports.getAllTranportAgencyVehicles = catchAsync(async (req, res, next) => {
  const vehicles = await TransportVehicle.find({ user: req.user._id });
  if (!vehicles) {
    return next(new ErrorHandler("Vehicles Not Found", 404));
  }

  res.status(200).json({
    success: true,
    vehicles,
  });
});
//Update Vehcile
exports.updateVehicle = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let vehicle = await TransportVehicle.findById(id);

  if (!vehicle) {
    return next(new ErrorHandler("Vehicle Not Found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images from Cloudinary
    for (let i = 0; i < vehicle.images.length; i++) {
      await cloudinary.v2.uploader.destroy(vehicle.images[i].public_id);
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "vehicles",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  if (req.body.notIncludes) {
    req.body.notIncludes = JSON.parse(req.body.notIncludes);
  }
  if (req.body.features) {
    req.body.features = JSON.parse(req.body.features);
  }

  vehicle = await TransportVehicle.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    vehicle,
  });
});

// Delete Vehicle -- TRANSPORTAGENCY

exports.deleteVehicle = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const vehicle = await TransportVehicle.findById(id);

  if (!vehicle) {
    return next(new ErrorHandler("Vehicle Not Found", 404));
  }

  //Deleting Images from Cloudinary
  for (let i = 0; i < vehicle.images.length; i++) {
    await cloudinary.v2.uploader.destroy(vehicle.images[i].public_id);
  }

  await vehicle.deleteOne();

  res.status(200).json({
    success: true,
    message: "Vehicle Deleted Successfully",
  });
});

// Create New Review or Update the Review
exports.createVehicleReview = catchAsync(async (req, res, next) => {
  const { rating, comment, vehicleId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const vehicle = await TransportVehicle.findById(vehicleId);

  const isReviewd = vehicle.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewd) {
    vehicle.reviews.forEach((rev) => {
      if (
        vehicle.reviews.find(
          (rev) => rev.user.toString() === req.user._id.toString()
        )
      )
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    vehicle.reviews.push(review);
    vehicle.numOfReviews = vehicle.reviews.length;
  }
  let avg = 0;

  vehicle.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  vehicle.rating = avg / vehicle.reviews.length;

  await vehicle.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
// Get All Reviews of Vehicle
exports.getVehicleReviews = catchAsync(async (req, res, next) => {
  const vehicle = await TransportVehicle.findById({ _id: req.query.id });
  if (!vehicle) {
    return next(new ErrorHandler("Vehicle Not Found.", 404));
  }
  res.status(200).json({
    success: true,
    reviews: vehicle.reviews,
  });
});

// Delete Review Vehicle
exports.deleteVehicleReview = catchAsync(async (req, res, next) => {
  const vehicle = await TransportVehicle.findById(req.query.vehicleId);

  if (!vehicle) {
    return next(new ErrorHandler("Vehicle Not Found.", 404));
  }

  const reviews = vehicle.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await TransportVehicle.findByIdAndUpdate(
    req.query.vehicleId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//Update Vehicle Quantity
exports.updateVehicleStock = async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const newStock = req.body.quantity;

  try {
    const vehicle = await TransportVehicle.findByIdAndUpdate(
      vehicleId,
      { quantity: newStock },
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json({ success: true, vehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
