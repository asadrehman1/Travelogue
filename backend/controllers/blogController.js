const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const catchAsync = require("../middlewares/catchAsyncErrors");
const Blog = require("../models/blogModel");

exports.createBlog = async (req, res) => {
    try {
      const { title, content, category } = req.body;
      const userId = req.user._id; 
  
      const user = await User.findById(userId);
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newBlog = new Blog({
        title,
        content,
        user: userId,
        category
      });
  
      await newBlog.save();
  
      res.status(201).json(newBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  exports.getAllBlogs = catchAsync(async (req, res, next) => {
    const blogs = await Blog.find();
    if(!blogs){
      return next(new ErrorHandler("Blogs does not exist with this Id"));
    }
    res.status(200).json({
      success: true,
      blogs
    });
  });
  exports.getmyBlogs = catchAsync(async (req, res, next) => {

    const blogs = await Blog.find({ user: req.user.id });
   
    if(!blogs){
      return next(new ErrorHandler("Blogs does not exist with this Id"));
    }
    res.status(200).json({
      success: true,
      blogs
    });
  });

  exports.getSingleBlog = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(new ErrorHandler("Blog Not Found", 404));
    }
  
    res.status(200).json({
      success: true,
      blog,
    });
  })

  exports.deleteBlog = catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler(`Blog does not exist with Id.`, 404));
      }
  
    await blog.deleteOne();
  
    res.status(200).json({
      success: true,
      message:"Blog has deleted Successfully."
    });
  });
  