const express = require("express");
const { Comment, validate } = require("../model/comments");

const router = express.Router();

router
  .route("/:postId")
  .get((req, res, next) => {
    Comment.find({
      postId: req.params.postId,
    })
      .then((comments) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(comments);
      })
      .catch((err) => {
        next(err);
      });
  })
  .post((req, res, next) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    comment = new Comment({
      text: req.body.text,
      postId: req.params.postId,
      userId: req.body.postId,
    })
      .save()
      .then((comment) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(comment);
      })
      .catch((err) => next(err));
  });

router
  .route("/comment/:commentId")
  .get((req, res, next) => {
    Comment.findOne({
      _id: req.params.commentId,
    })
      .then((comment) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(comment);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    Comment.updateOne(
      {
        _id: req.params.commentId,
      },
      {
        $set: req.body,
      }
    ).then(() => {
      Comment.findOne({
        _id: req.params.commentId,
      })
        .then((comment) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(comment);
        })
        .catch((err) => next(err));
    });
  })
  .delete((req, res, next) => {
    Comment.deleteOne({
      _id: req.params.commentId,
    })
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
      })
      .catch((err) => next(err));
  });

module.exports = router;
