//For User login authentication
require("dotenv").config();
require('express-async-errors')
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../model/users");
const express = require("express");
const router = express.Router();

/**
 * @swagger 
 * /auth:
 *    post:
 *      description: Used for authentication
 *      responses:
 *        '200':
 *          description: A successful login and response jwt.
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token=jwt.sign({_id:user._id,username:user.username,isAdmin:user.isAdmin},process.env.SECRET_KEY);
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
