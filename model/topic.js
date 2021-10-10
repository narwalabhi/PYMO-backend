const mongoose = require("mongoose");
const Joi = require("joi");

const topicSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      unique: true,
      required: true,
    },
    recent_post_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

function validateTopic(topic) {
  const schema = {
    recent_post_count: Joi.number().min(0),
    tag: Joi.string().max(120).required(),
  };
  return Joi.validate(topic, schema);
}

const Topic = mongoose.model("Topics", topicSchema);

exports.Topic = Topic;

exports.validate = validateTopic;
