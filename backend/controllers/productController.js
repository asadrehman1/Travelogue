const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
// Create Product -- Admin
exports.createProduct = catchAsync(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  
  const includes = req.body.includes ? JSON.parse(req.body.includes) : [];
  const notIncludes = req.body.notIncludes ? JSON.parse(req.body.notIncludes) : [];
  const pickupPoints = req.body.pickupPoints ? JSON.parse(req.body.pickupPoints) : [];
  const dates = req.body.dates ? JSON.parse(req.body.dates) : [];

  req.body.user = req.user.id;
  req.body.images = imagesLinks;
  req.body.includes = includes; 
  req.body.notIncludes = notIncludes; 
  req.body.pickupPoints = pickupPoints; 
  req.body.dates = dates; 
  

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateStock = (async (req, res) => {
  const productId = req.params.productId;
  const newStock = req.body.capacity;
  const newRoomsQty = req.body.numberOfRooms;
  // console.log(productId,newStock,newRoomsQty);
  try {
    // Find the product by ID and update its stock
    const product = await Product.findByIdAndUpdate(
      productId,
      { capacity: newStock, numberOfRooms:newRoomsQty },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get All Products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const resultsPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .pagination(resultsPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
  });
});

// Get All Products -- Admin
exports.getAdminProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    products,
  });
});

// Get a Single Product

exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  // Parse and update 'includes' and 'notIncludes'
  if (req.body.includes) {
    req.body.includes = JSON.parse(req.body.includes);
  }
  if (req.body.notIncludes) {
    req.body.notIncludes = JSON.parse(req.body.notIncludes);
  }
  if (req.body.dates) {
    req.body.dates = JSON.parse(req.body.dates);
  }

  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete A Product -- Admin

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Deleting Images from Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Create New Review or Update the Review
exports.createProductReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewd) {
    product.reviews.forEach((rev) => {
      if (
        product.reviews.find(
          (rev) => rev.user.toString() === req.user._id.toString()
        )
      )
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews
exports.getProductsReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById({_id:req.query.id});
  if (!product) {
    return next(new ErrorHandler("Product Not Found.", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


// Delete Review
exports.deleteProductReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found.", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  let rating=0;

   if(reviews.length===0){
    rating=0;
   }else{
      rating = avg/reviews.length;
   }
   
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
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

// Chat Now
exports.bookPackage = async (req, res) => {
  const {
    email,
    Package,
    whatsappLink,
  } = req.body;
 
  try {
    await sendEmail({
      email,
      subject: "Chat Now",
      message: `
    <p>Dear User,</p>
    <p>Please click on the following link to initiate the booking on WhatsApp for this Package ${Package}:</p>
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