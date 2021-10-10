const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const topics = require("./routes/topics");
const likes = require("./routes/likes");

const mongodbUrl = `mongodb+srv://m001-student:${process.env.DB_PASSWORD}@sandbox.5ke5h.mongodb.net/PYMO?retryWrites=true&w=majority`;

mongoose.connect(mongodbUrl, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});

const app = express();

const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "PYMO API",
      description: "...",
      contact: {
        name: "Narwal Shaw Antil",
      },
      servers: ["http://localhost:3000"],
    },
  },
  // Routes
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.use("/api/topics", topics);
app.use("/api/likes", likes);

//TODO : Add centralized error handling.

app.listen(port, () => console.log(`app listening on port ${port}`));
// console.log("Working");
