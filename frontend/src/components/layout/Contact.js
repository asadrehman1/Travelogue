import React, { useState } from "react";
import {useAlert} from "react-alert";
import "./Contact.css";
import axios from 'axios';

import image1 from '../../assets/ct1.jpg'
import image2 from '../../assets/ct2.jpg'
import image3 from '../../assets/ct3.jpg'
import image4 from '../../assets/ct4.jpg'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import HelpIcon from '@mui/icons-material/Help';

const Contact = () => {
  const alert = useAlert();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    query: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/contact', formData);
      alert.success(response.data.message)
      setFormData({
        email: '',
        subject: '',
        query: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className="contact-images">
        <div className="row">
          <h2 className="contact-heading">Contact Us</h2>
          <div className="col">
            <img className="contact-img-1" src={image1} alt="contact-img-1" width="100%" />
          </div>
          <div className="col">
            <img className="contact-img-2" src={image2} alt="contact-img-2" width="100%" />
          </div>
          <div className="col">
            <img className="contact-img-3" src={image3} alt="contact-img-3" width="100%" />
          </div>
          <div className="col">
            <img className="contact-img-4" src={image4} alt="contact-img-4" width="100%" />
          </div>
        </div>
      </div>

      <div className="contact-form-container">
        <div className="contact-form-box">
          <h2 className="contact-heading-2">Contact Form</h2>
          <form className="contact-form" onSubmit={handleSubmit}>

            <p><EmailIcon />Email :</p>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

            <p><SubjectIcon />Subject :</p>
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required />

            <p><HelpIcon />Query :</p>
            <textarea name="query" value={formData.query} onChange={handleInputChange} required />

            <br />
            <br />
            <button className="contact-button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
