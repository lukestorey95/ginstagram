const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("user_id")
      .populate("likes")
      .populate("comments")
      .sort({ createdAt: "desc" })
      .exec((err, posts) => {
        if (err) {
          throw err;
        }

        res.render("posts/index", {
          script: "../js/posts.js",
          session: req.session.user,
          posts: posts,
        });
      });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    if (req.file) {
      let post = new Post({
        message: req.body.message,
        image: req.file.path,
        user_id: req.session.user._id,
      });

      post.save((err) => {
        if (err) {
          throw err;
        }

        res.status(201).redirect("/posts");
      });
    } else {
      let post = new Post({
        message: req.body.message,
        user_id: req.session.user._id,
      });

      post.save((err) => {
        if (err) {
          throw err;
        }

        res.status(201).redirect("/posts");
      });
    }
  },

  Like: (req, res) => {
    const post_id = req.params.post_id;
    const like_id = req.params.like_id;

    Post.findById(post_id).exec((err, post) => {
      if (err) {
        console.log(err);
        throw err;
      }

      post.likes.push(like_id);

      post.save((err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },

  Comment: (req, res) => {
    const post_id = req.params.post_id;
    const comment_id = req.params.comment_id;

    Post.findById(post_id).exec((err, post) => {
      if (err) {
        console.log(err);
        throw err;
      }

      post.comments.push(comment_id);

      post.save((err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },
};

module.exports = PostsController;
