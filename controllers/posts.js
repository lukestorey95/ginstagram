const Like = require("../models/like");
const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("user_id")
      .populate("likes")
      .populate("comments")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }

        let reversedPosts = posts.reverse();
        res.render("posts/index", { posts: reversedPosts });
      });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const like = new Like();
    // console.log(req.file);

    like.save((err) => {
      if (err) {
        throw err;
      }
    });

    //  maybe could refactor the below
    const post = new Post({
      message: req.body.message,
      image: req.file.path,
      likes: like._id,
      user_id: req.session.user._id,
    });

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
