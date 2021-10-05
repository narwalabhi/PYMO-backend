const express = require("express");
const { Topic, validate } = require("../model/topic");

const router = express.Router();

router.route("/").post((req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const topic = new Topic({
    tag: req.body.tag,
  });
  topic
    .save()
    .then((topic) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(topic);
    })
    .catch((err) => next(err));
});

router.get("/", async (req, res) => {
  const topic = await Topic.find();
  res.send(topic);
});

module.exports = router;
