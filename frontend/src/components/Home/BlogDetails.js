import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import './BlogDetails.css';
import axios from 'axios';
import Loader from '../layout/Loader/Loader';

const BlogDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/blog/${id}`);
        if (response.status === 200) {
          setBlogDetails(response.data.blog);
          // Fetch user details for the blog's author
          fetchUserDetails(response.data.blog.user);
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/getBlogUser/${userId}`);
      if (response.status === 200) {
        setUserDetails(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const response = await axios.delete(`/api/v1/blog/${id}`);
      alert.success(response.data.message);
      navigate('/blogs', { replace: true });
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${require('../../assets/grey1.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
        <br/>
        <br/>
        <br/>
        <div className="blog-details-container">
          {loading ? (
            <Loader />
          ) : blogDetails && userDetails ? (
            <>
              <h2>{blogDetails.title}</h2>
              <p className='author'>Author: {userDetails.name}</p>
              <p>{blogDetails.content}</p>
              {user?._id === blogDetails.user && (
                <button onClick={handleDeleteBlog}>Delete Blog</button>
              )}
            </>
          ) : (
            <p>Failed to load blog details.</p>
          )}
        </div>
        <br/>
        <br/>
        <br/>
      </div>
    </>
  );
};

export default BlogDetails;
