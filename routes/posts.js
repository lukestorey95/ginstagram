const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname.replace(/ /g, "_"));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
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
router.get("/new", PostsController.New);

module.exports = router;
