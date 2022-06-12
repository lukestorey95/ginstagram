const Comment = require("../models/comment");

const CommentsController = {
  Create: (req, res) => {
    const post_id = req.body.post_id;
    const user_id = req.session.user._id;
    const message = req.body.comment;

    const comment = new Comment({
      user_id,
      post_id,
      message,
    });
    const comment_id = comment._id;

    comment.save((err) => {
      if (err) {
        console.log(err);
        throw err;
      }

      res.redirect(307, `/posts/${post_id}/comments/${comment_id}`);
    });
  },
};

module.exports = CommentsController;
