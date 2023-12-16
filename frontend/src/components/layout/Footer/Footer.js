import React from "react";
import "./Footer.css";

import image1 from '../../../assets/treelogo.png'
import image2 from '../../../assets/coll.jpg'
import image3 from '../../../assets/playStore.png'
import image4 from '../../../assets/appStore.png'
import WidgetsIcon from '@mui/icons-material/Widgets';
import InstagramIcon from '@mui/icons-material/Instagram';
import AttachmentIcon from '@mui/icons-material/Attachment';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer">

      <div className="footer-grid text-white">

        <br />
        <div className="row text-white">

          <div className="col text-center text-white">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img className="" src={image1} alt='logo-img' width="40%" style={{ transform: 'rotate(-15deg)', marginLeft: '10px' }} />
              <h2 className="LogoTitle" ><b>Travelogue</b></h2>
            </div>
            <p className="slogan">"Unveiling Adventures, Connecting Journeys!"</p>
            <div className="flexbox">
              <div className="p-2"><img src={image3} alt="google-play-store" width="100%"/></div>
              <div className="p-2"><img src={image4} alt="app-play-store" width="100%"/></div>
            </div>

          </div>

          <div className="col text-white">

            <div className="flexbox text-white">
              <div className="p-2 circular"><WidgetsIcon /></div>
              <div className="p-2"><b>SERVICES :</b></div>
            </div>

            <br/><Link className="hovers" to="/products">
            Tourism Packages</Link>

            <br /><br /><Link className="hovers" to="/vehicles">Vehicles</Link>
            <br /><br />Careers
            <br /><br /><Link className="hovers" to="/contact">Contact</Link>
          </div>

          <div className="col text-white">
            <div className="flexbox">
              <div className="p-2 circular"><InstagramIcon /></div>
              <div className="p-2"><a className="social-links" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><b>INSTAGRAM :</b></a></div>
            </div>
            <br/>
            <a className="social-links" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img className="insta-collag-img" src={image2} alt="collage" width="55%" /></a>
          </div>

          <div class="col text-white">
    <div className="flexbox">
        <div className="p-2 circular"> <AttachmentIcon /></div>
        <div className="p-2"><b>FOLLOW US :</b></div>
    </div>
    <br/>
    <div className="flexbox">
        <div className="p-2"> <a className="social-links" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a></div>
        <div className="p-2" ><a className="social-links" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></div>
    </div>
    <div className="flexbox">
        <div className="p-2"> <a className="social-links" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a></div>
        <div className="p-2"><a className="social-links" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></div>
    </div>
    <div className="flexbox">
        <div className="p-2"> <a className="social-links" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a></div>
        <div className="p-2"><a className="social-links" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></div>
    </div>
    <div className="flexbox">
        <div className="p-2"> <a className="social-links" href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer"><PinterestIcon /></a></div>
        <div className="p-2"><a className="social-links" href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></div>
    </div>
</div>

        </div>
        <br/>
      </div>
    </footer >
  );
};

export default Footer;