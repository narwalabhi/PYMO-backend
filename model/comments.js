const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

function validateComment(comment) {
  const schema = {
    text: Joi.string().required(),
    userId: Joi.string().required(),
    postId: Joi.string().required(),
  };

  return Joi.validate(comment, schema);
}

const Comments = mongoose.model("comments", commentSchema);

exports.Comment = Comments;

exports.validate = validateComment;
