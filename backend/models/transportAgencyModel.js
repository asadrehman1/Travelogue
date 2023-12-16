const mongoose = require("mongoose");

const transportVehicleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter Vehicle Name"],
    },
    vehicleType: {
        type: String,
        required: [true, "Please Enter Vehicle Type"],
        trim: true
    },
    city:{
        type: String,
        required: [true, "Please Enter City"],
    },
    model: {
        type: String,
        required: [true, "Please Enter Vehicle Model"]
    },
    capacity: {
        type: Number,
        required: [true, "Please Enter Vehicle Capacity"]
    },
    features: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: [true, "Please Enter Vehicle Price"]
    },
    notIncludes: {
        type: [String],
        required: true
    },
    quantity: {
        type: Number,
        required: [true, "Please Enter Vehicle Quantity"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("TransportVehicle", transportVehicleSchema);
