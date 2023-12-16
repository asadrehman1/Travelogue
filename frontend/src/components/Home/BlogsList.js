import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogsList.css';
import TuneIcon from '@mui/icons-material/Tune';
import Loader from '../layout/Loader/Loader';
import image1 from '../../assets/bl1.jpg'
import image2 from '../../assets/bl2.jpg'
import image3 from '../../assets/bl3.jpg'
import image4 from '../../assets/bl4.jpg'

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

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/v1/blogs');
        setBlogs(response.data.blogs);

        const userDetailsPromises = response?.data?.blogs?.map(blog => fetchUserDetails(blog.user));
        const resolvedUserDetails = await Promise.all(userDetailsPromises);

        const userDetailsMap = {};
        response?.data?.blogs.forEach((blog, index) => {
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

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await axios.get('/api/v1/blogs');
      const allBlogs = response.data.blogs;

      if (category === 'All') {
        setBlogs(allBlogs);
      } else {
        const filteredBlogs = allBlogs.filter(blog => blog.category === category);
        setBlogs(filteredBlogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <div className="blog-list-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="blogs-section">
            <div className='row'>
              <div className='col-md-6 col-sm-12 py-3'>
                <h2 className='blog-section-heading'><b>"Embark on Your Journey: <br />Share Your Blog Experiences with Us"</b></h2>
                <br />
                <p className='blog-section-para'>Welcome to our vibrant community of explorers, storytellers, and travel enthusiasts! At Travelogue, we believe that every journey is a story waiting to be told. Whether you've wandered through ancient historical sites, hiked rugged trails, savored the flavors of diverse cuisines, or captured the essence of a moment through your lens, your experiences deserve to be shared.<br /><br /> Our platform is a canvas for your tales of tourism, adventure, nature, travel, food, hiking, historical discoveries, cruises, festivals, and mesmerizing photography.Join us in creating a collective tapestry of the world's wonders, one blog at a time.</p>
                <br />
                <Link to="/createBlog">
                  <button className='create-blog-btn'>Create Your Blog</button>
                </Link>
              </div>
              <div className='col-md-6 col-sm-12 py-3'>
                <div className="row">
                  <div className="col">
                    <img className="blog-img-1" src={image1} alt="contact-img-1" width="100%" />
                  </div>
                  <div className="col" style={{ position: 'relative' }}>
                    <img className="blog-img-2" src={image2} alt="contact-img-2" width="100%" />
                    <div className='mini-blog-1'><p>Naran, cradled in the enchanting Kaghan Valley...</p></div>
                  </div>
                </div>
                <div className='row'>
                  <div className="col" style={{ position: 'relative' }}>
                    <img className="blog-img-3" src={image3} alt="contact-img-3" width="100%" />
                    <div className='mini-blog-2'><p>Swat, often referred to as the "Switzerland of Pakistan," is...</p></div>
                  </div>
                  <div className="col">
                    <img className="blog-img-4" src={image4} alt="contact-img-4" width="100%" />
                  </div>
                </div>
              </div>
            </div>
          </div>

            <h2 className='blogs-heading-2'>Existing Blogs:</h2>
            <br />
            <div className="category-filter">
              <span className='filter-text'><TuneIcon /> Filter Blogs by Category: </span>
              <br />
              <select className='select-value' value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="All">All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <br />
            <br />
            <br />

            {blogs?.length === 0 ? (
              <p>No blogs available</p>
            ) : (
              <ul>
                {blogs?.map((blog) => (
                  <li key={blog._id} className="blog-card">
                    <h3>{blog.title}</h3>
                    <p>{truncateText(blog.content, 500)}</p>
                    <h5 className='author'>Author: {userDetails[blog.user]}</h5>
                    <br />
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

      export default BlogList;
