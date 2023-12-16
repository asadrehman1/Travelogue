const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxlength: [30, "Name cannot exceed 30 characters"],
      minlength: [4, "Name should have more than 4 characters"]
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minlength: [8, "Password should be greater than 8 characters"],
      select: false
    },
    avatar: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    role: {
      type: String,
      default: "user"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    secretKey: {
        type: String,
      },
    travelAgency: {
      agencyName: {
        type: String,
        required: function () {
          return this.role === "travelAgency";
        }
      },
      contactEmail: {
        type: String,
        required: function () {
          return this.role === "travelAgency";
        }
      },
      contactPhone: {
        type: String,
        required: function () {
          return this.role === "travelAgency";
        }
      },
      address: {
        type: String,
        required: function () {
          return this.role === "travelAgency";
        }
      },
    },
    transportAgency: {
        agencyName: {
            type: String,
            required: function () {
              return this.role === "transportAgency";
            }
          },
          contactEmail: {
            type: String,
            required: function () {
              return this.role === "transportAgency";
            }
          },
          contactPhone: {
            type: String,
            required: function () {
              return this.role === "transportAgency";
            }
          },
          address: {
            type: String,
            required: function () {
              return this.role === "transportAgency";
            }
          },
    }
  });
  

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
   this.password = await bcrypt.hash(this.password,10);
})

// JWT Token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model("User",userSchema);