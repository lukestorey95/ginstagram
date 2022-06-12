const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
