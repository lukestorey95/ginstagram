const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname.replace(/ /g, "_"));
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  filter: fileFilter,
});

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", upload.single("image"), PostsController.Create);
router.post("/:post_id/likes/:like_id", PostsController.Like);
router.post("/:post_id/comments/:comment_id", PostsController.Comment);
router.get("/new", PostsController.New);

module.exports = router;
