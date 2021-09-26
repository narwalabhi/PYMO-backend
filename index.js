const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/users");
const auth = require("./routes/auth");

const mongodbUrl =
  `mongodb+srv://m001-student:${process.env.DB_PASSWORD}@sandbox.5ke5h.mongodb.net/PYMO?retryWrites=true&w=majority`;

mongoose.connect(mongodbUrl, (err) => {
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
