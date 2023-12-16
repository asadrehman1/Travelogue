import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MyBlogs.css';
import Loader from '../layout/Loader/Loader';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(blogs)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/v1/myblogs');
        setBlogs(response.data.blogs);

        const userDetailsPromises = response.data.blogs.map(blog => fetchUserDetails(blog.user));
        const resolvedUserDetails = await Promise.all(userDetailsPromises);

        const userDetailsMap = {};
        response.data.blogs.forEach((blog, index) => {
          userDetailsMap[blog.user] = resolvedUserDetails[index];
        });

        setUserDetails(userDetailsMap);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/getBlogUser/${userId}`);
      if (response.status === 200) {
        return response.data.user.name;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
    return 'Unknown';
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="blog-list-container" style={{ backgroundImage: `url(${require('../../assets/grey3.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <br/>
        <br/>
          <h2 className='your-blogs'>Your Created Blogs:</h2>
          <Link to="/createBlog">
            <button className='new-blog-btn'>Create a New Blog</button>
          </Link>
          <br/>
          <br/>
          {blogs?.length === 0 ? (
            <p>No blogs available</p>
          ) : (
            <ul>
              {blogs?.map(blog => (
                <li key={blog._id} className="blog-card">
                  <h3>{blog.title}</h3>
                  <p>{truncateText(blog.content, 500)}</p>
                  <h5 className='author'>Author: {userDetails[blog.user]}</h5>
                  <br/>
                  <Link to={`/blog/${blog._id}`}>
                    <button className='details-btn'>View Details</button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default MyBlogs;
