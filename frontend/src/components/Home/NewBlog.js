import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import "./NewBlog.css";

const NewBlog = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const alert = useAlert();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const categories = [
    "Adventure",
    "Nature",
    "Travel",
    "Food",
    "Hiking and Trekking Journeys",
    "Historical Sites",
    'Cruise and Sailing Adventures',
    'Festival',
    'Wellness',
    'Photography and Artistic Escapes'
  ];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
    }

    const blogData = {
      title: title,
      content: content,
      category: category,
    };

    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const response = await axios.post("/api/v1/createBlog", blogData, config);
      alert.success("Blog Created Successfully");
      navigate("/blogs");
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  return (

    <>
      <div style={{ backgroundImage: `url(${require('../../assets/jn1.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <br />
        <br />
        <div className="blog-container">
          <h2>Write a Blog:</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />

            <label htmlFor="content">Content:</label>
            <textarea className="content"
              id="content"
              value={content}
              onChange={handleContentChange}
              required
            ></textarea>

            <label htmlFor="category">Category:</label>
            <select className="select-category"
              id="category"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Choose Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button type="submit">Submit Blog</button>
          </form>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default NewBlog;
