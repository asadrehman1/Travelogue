// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Please Enter Package Name"],
//         trim: true
//     },
//     vehicleName: {
//         type: String,
//         required: [true, "Please Enter Vehicle Name"],
//     },
//     capacity: {
//         type: Number,
//         required: [true, "Please Enter Vehicle Capacity"]
//     },
//     description: {
//         type: String,
//         required: [true, "Please Enter Package Description"]
//     },
//     price: {
//         type: Number,
//         required: [true, "Please Enter Package Price"],
//         maxlength: [8, "Price cannot exceed 8 characters"]
//     },
//     includes: {
//         type: [String],
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: Number,
//         default: 0
//     },
//     images: [
//         {
//             public_id: {
//                 type: String,
//                 required: true
//             },
//             url: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],
//     duration: {
//         type: String,
//         required: [true, "Please Enter Package Duration"]
//     },
//     destination: {
//         type: String,
//         required: [true, "Please Enter Package Destination"]
//     },
//     numOfReviews: {
//         type: Number,
//         default: 0
//     },
//     reviews: [
//         {
//             user: {
//                 type: mongoose.Schema.ObjectId,
//                 ref: "User",
//                 required: true
//             },
//             name: {
//                 type: String,
//                 required: true
//             },
//             rating: {
//                 type: Number,
//                 required: true
//             },
//             comment: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Package Name"],
        trim: true
    },
    vehicleName: {
        type: String,
        required: [true, "Please Enter Vehicle Name"],
    },
    capacity: {
        type: Number,
        required: [true, "Please Enter Vehicle Capacity"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Package Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Package Price"],
        maxlength: [8, "Price cannot exceed 8 characters"]
    },
    includes: {
        type: [String],
        required: true
    },
    dates: [{
        type: Date,
        required: true,
    }],
    notIncludes: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
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
    duration: {
        type: String,
        required: [true, "Please Enter Package Duration"]
    },
    destination: {
        type: String,
        required: [true, "Please Enter Package Destination"]
    },
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
    },
    hotel: {
        type: String,
        required: [true, "Please Enter Hotel Name"]
    },
    pricePerRoom: {
        type: Number,
        required: [true, "Please Enter Price Per Room"]
    },
    numberOfRooms: {
        type: Number,
        required: [true, "Please Enter Number of Rooms"]
    },
    pickupPoints: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
});

module.exports = mongoose.model("Product", productSchema);
