const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rooms:{
        type: Number,
        required: true,
      },
      pickupPoint: {
        type: String,
        required: true,
      },
      date:{
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo:{
    id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
  },
  paidAt:{
    type:Date,
    required:true
  },
  travelAgencyId: {
    type: String,
    required: true,
  },
  itemsPrice:{
    type:Number,
    required:true,
    default:0
  },
  taxPrice:{
    type:Number,
    required:true,
    default:0
  },
  totalPrice:{
    type:Number,
    required:true,
    default:0
  },
  orderStatus:{
    type:String,
    required:true,
    default:"Processing"
  },
  deliveredAt:Date,
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Order",orderSchema);
