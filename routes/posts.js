const { Post, validate } = require("../model/posts");
const express = require("express");

const router = express.Router();

router.route("/").post((req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = new Post({
    raw_text: req.body.raw_text,
    likes_count: req.body.likes_count,
    comments_count: req.body.comments_count,
    userId: req.body.userId,
    topics: req.body.topics,
  });
  post
    .save()
    .then((post) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(post);
    })
    .catch((err) => next(err));

  // TODO : Update topics post count for all the topics.
});

router
  .route("/:postId")
  .get((req, res, next) => {
    Post.findById(req.params.postId)
      .then((post) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(post);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    Post.updateOne(
      { _id: req.params.postId },
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(() => {
        Post.findOne({ _id: req.params.postId })
          .then((post) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(post);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Post.deleteOne({ _id: req.params.postId })
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch((err) => next(err));
  });

module.exports = router;
