const catchAsync = require("../middlewares/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsync(async(req,res,next)=>{
  const paymentIntent = await stripe.paymentIntents.create({
      amount:req.body.amount,
      currency:"PKR",
      metadata:{
          company:"ECOMMERCE"
      },
    });

    res.status(200).json({
      success:true,
      client_secret:paymentIntent.client_secret
    })
 
})

exports.sendStripeApiKey = catchAsync (async(req,res,next)=>{
      res.status(200).json({
        success:true,
        stripeApiKey:process.env.STRIPE_API_KEY
      })
   
})

