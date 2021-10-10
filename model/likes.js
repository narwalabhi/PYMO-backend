const mongoose = require("mongoose");
const Joi = require("joi");

const likeSchema = new mongoose.Schema({
    postId : {
        type : String,
        required : true
    },
    userId: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

function validateLike(like) {
    const schema = {
      postId: Joi.string().required(),
      userId: Joi.string().required()
    };
    return Joi.validate(like, schema);
}

const Like = mongoose.model("Likes", likeSchema);

exports.Like = Like;

exports.validate = validateLike;