const express = require("express");
const { Like, validate } = require("../model/likes");

const router = express.Router();

router.route("/").post((req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Like.deleteOne({ postId: req.body.postId, userId: req.body.userId }).then(
    (response) => {
      if (response.deletedCount < 1) {
        const like = new Like({
          postId: req.body.postId,
          userId: req.body.postId,
        });

        like
          .save()
          .then((like) => {
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(like);
          })
          .catch((err) => next(err));
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
        //Todo add delete response
      }
    }
  );
});
module.exports = router;
