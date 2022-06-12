const Like = require("../models/like");

const LikesController = {
  Create: (req, res) => {
    const post_id = req.body.post_id;
    const user_id = req.session.user._id;

    const like = new Like({
      user_id,
      post_id,
    });
    const like_id = like._id;

    like.save((err) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.redirect(307, `/posts/${post_id}/likes/${like_id}`);
    });
  },
};

module.exports = LikesController;
