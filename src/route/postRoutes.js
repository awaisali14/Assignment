const express = require("express");
const router = express.Router();
const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controller/postController");
const authenticate = require("../middleware/Authentication");

router.route("/posts").get(authenticate, getPosts);
router.route("/:id").get(authenticate, getPost);
router.route("/create").post(authenticate, createPost);
router.route("/:id").put(authenticate, updatePost);
router.route("/:id").delete(authenticate, deletePost);

module.exports = router;
