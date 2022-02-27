const PostModel = require("../model/postModel");
const createPost = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(200).json({
      status: "Success",
      data: newPost,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json({
      status: "Success",
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({
        status: "Success",
        message: "Post has been updated successfully",
      });
    } else {
      res.status(400).json({
        status: "Error",
        message: "You can Upadate only your post",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({
        status: "Success",
        message: "Post has been deleted successfully",
      });
    } else {
      res.status(400).json({
        status: "Error",
        message: "You can delete your own post",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};
