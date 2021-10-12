const express = require("express");
const { Post, validate } = require("../model/posts");
const { User } = require("../model/users");

const router = express.Router();

router
  .route("/")
  .post((req, res, next) => {
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
  })
  .get((req, res, next) => {
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 2,
      collation: { locale: "en" },
      customLabels: {
        totalDocs: "totalResults",
        docs: "posts",
      },
      sort: { createdAt: -1 },
    };

    Post.paginate({}, options)
      .then((posts) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(posts);
      })
      .catch((err) => next(err));
  });

router
  .route("/:postId")
  .get((req, res, next) => {
    Post.findOne({ _id: req.params.postId })
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

    //TODO delete likes and comments related to the post being deleted.
  });

router.route("/feed/:userId").get((req, res, next) => {
  const options = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    collation: { locale: "en" },
    customLabels: {
      totalDocs: "totalResults",
      docs: "posts",
    },
    sort: { createdAt: -1 },
  };
  //fetching user topics
  User.findOne({ _id: req.params.userId }).then((user) => {
    const topics = user.subscription_topics;
    const query = {
      topics: {
        $elemMatch: topics
          ? {
              $in: topics,
            }
          : { $nin: [] },
      },
    };
    //fetch paginated posts with topics similar to the user
    Post.paginate(query, options)
      .then((posts) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(posts);
      })
      .catch((err) => next(err));
  });
});

module.exports = router;
