const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscription_topics: {
      type: [String],
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", "prefer not to say"],
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    isAdmin:Boolean
  },
  {
    timestamps: true,
  }
);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
    subscription_topic: Joi.array(),
    gender: Joi.string(),
    bio: Joi.string().max(120),
  };

  return Joi.validate(user, schema);
}

const User = mongoose.model("Users", userSchema);

exports.User = User;
exports.validate = validateUser;
