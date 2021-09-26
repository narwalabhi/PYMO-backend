const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/users");
const auth=require("./routes/auth");

mongoose.connect("mongodb://localhost:27017/SocialMedia", (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", user);
app.use("/", auth);

app.listen(port, () => console.log(`app listening on port ${port}`));
