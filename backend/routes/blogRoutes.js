const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/auth");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  getmyBlogs,
} = require("../controllers/blogController");

router.post("/createBlog", isAuthenticatedUser, createBlog);
router.get("/blogs", getAllBlogs);
router.get("/myblogs", isAuthenticatedUser, getmyBlogs);
router.get("/blog/:id", getSingleBlog);
router.delete("/blog/:id", isAuthenticatedUser, deleteBlog);

module.exports = router;
