const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const uschema = new mongoose.Schema({
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
  subscription_topic:{
      type:String,
      required: true,
      trim:true
  },
  gender:{
    type:String,
    required: true
  },
  bio:{
    type:String,
    required: true,
    trim:true
  }
});

const User = mongoose.model("Users", uschema);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
    subscription_topic: Joi.string().min(5).max(50).required(),
    gender: Joi.string().min(4).max(6).required(),
    bio: Joi.string().min(5).max(60).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
