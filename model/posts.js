const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema(
  {
    raw_text: {
      type: String,
      required: true,
      trim: true,
    },
    likes_count: {
      type: Number,
      default: 0,
    },
    comments_count: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

function validatePost(post) {
  const schema = {
    raw_text: Joi.string().required(),
    likes_count: Joi.number().min(0),
    comments_count: Joi.number().min(0),
    topics: Joi.array(),
    userId: Joi.string().required(),
  };

  return Joi.validate(post, schema);
}

const Post = mongoose.model("posts", postSchema);

exports.Post = Post;
exports.validate = validatePost;
