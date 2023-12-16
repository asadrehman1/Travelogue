import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/Header/MetaData";
import "./Search.css";

import video from '../../assets/video.mp4'
import posterImage from '../../assets/img1.jpg';


const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      setKeyword("");
    } else {
      navigate("/products")
    }
  };

  return (
    <Fragment>

      <div className="search-div">

        {/*autoplay plays video to play automatically, muted allows autoplay i.e. user doesnot have to press play button video, loop allows video to run in an infinite loop, posterimage is coverphoto */}

        <video autoPlay muted loop controls width="100%" height="auto" poster={posterImage}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <MetaData title="Search A Package -- TRAVELOGUE" />

        <h2 className="search-heading "><b>Search for Exclusive Packages!</b></h2>

        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input className="search-input-field"
            type="text"
            placeholder="Search a Package"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input className="search-button" type="submit" value="Search" />
        </form>

      </div>
    </Fragment>
  );
};

export default Search;