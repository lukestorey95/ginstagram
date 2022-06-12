const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.SchemaTypes.ObjectID,
    ref: "Post",
    required: true,
  },

  user_id: {
    type: mongoose.SchemaTypes.ObjectID,
    ref: "User",
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
