import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// User Schema Model - (Name, email, password, creation Date) with validation rules
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique : true,
        validate : validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength : [6, "Password Must Be Atleast 6 characters"],
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },

    avatarImage: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'investor'],
        default: 'user',
      },

    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
    }],

    stocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
    }],
    
    createdAt: {
        type:Date,
        default: Date.now,
    },

    

},{ timestamps: true });

const User = mongoose.model("User", userSchema);

export default  User;