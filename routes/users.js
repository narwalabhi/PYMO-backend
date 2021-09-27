const { User, validate } = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const auth=require("../middleware/auth")

router.get("/api/user/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user exist...");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    subscription_topic: req.body.subscription_topic,
    gender: req.body.gender,
    bio: req.body.bio,
  });
  //password hashing
  const salt = await bcrypt.genSalt(10); //created salt string
  user.password = await bcrypt.hash(user.password, salt); //hasing with salt

  user = await user.save();
  const token = jwt.sign({ _id: user._id,username:user.username,isAdmin:user.isAdmin }, process.env.SECRET_KEY);
  res.header("auth-token", token).send(user);
});

module.exports = router;
