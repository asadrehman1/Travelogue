import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearError, getProducts } from "../../actions/productActions";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";

import image1 from "../../assets/imageH.jpg";
import image2 from "../../assets/imageI.jpg";
import image3 from "../../assets/imageJ.jpg";
import image4 from "../../assets/imageK.jpg";
import image5 from "../../assets/imageL.jpg";
import image6 from "../../assets/C1.jpg";
import image7 from "../../assets/C2.jpg";
import image8 from "../../assets/C3.jpg";
import image9 from "../../assets/C4.jpg";
import image10 from "../../assets/C5.jpeg";
import image11 from "../../assets/C6.jpg";
import image12 from "../../assets/package.png";
import image13 from "../../assets/rotatedmountains.jpg";
import image14 from "../../assets/rotatedmountain2.jpg";
import image15 from "../../assets/river.jpg";
import image16 from "../../assets/camping.jpg";

import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import AddIcon from "@mui/icons-material/Add";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import Lottie from "lottie-react";
import locationanimation from "../../assets/locationanimation.json";
import travelinganimation from "../../assets/travelinganimation.json";
import boxanimation from "../../assets/boxanimations.json";
import categoryanimation from "../../assets/categoriesanimation.json";
import featuredpackagesanimation from "../../assets/h1.json";
import TuneIcon from "@mui/icons-material/Tune";

const categories = [
  "All",
  "Adventure",
  "Leisure",
  "Honeymoon",
  "Cultural",
  "Wildlife and Nature",
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState([0, 5]);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();

  const { loading, error, products, productCount, resultsPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    // console.log(products);
    // setCategory("All");
    dispatch(getProducts(keyword || "", currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const categoryHandler = (selectedCategory) => {
    // Handle category selection here
    setCategory(selectedCategory);
  };

  const filteredProducts = products?.filter((product) => {
    const productPrice = parseFloat(product.price);
    if (price && (productPrice < price[0] || productPrice > price[1])) {
      return false;
    }

    const productRating =
      typeof product.rating === "number"
        ? product.rating
        : parseFloat(product.rating);
    if (rating && (productRating < rating[0] || productRating > rating[1])) {
      return false;
    }

    if (category.trim() !== "" && category !== "All") {
      if (!product.category.includes(category)) {
        return false;
      }
    }

    return true;
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/*Slider*/}
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            data-bs-wrap="true"
            data-bs-pause="false"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="image-overlay"></div>
                <img
                  src={image1}
                  className="d-block w-100"
                  alt="Photography-service"
                />
                <div className="carousel-caption">
                  <h5 className="caption-heading white-clr">
                    Capture Every Moment with Us, <br />
                    Photography Service
                  </h5>
                </div>
              </div>

              <div className="carousel-item">
                <div className="image-overlay"></div>
                <img
                  src={image2}
                  className="d-block w-100"
                  alt="Bonfire-service"
                />
                <div className="carousel-caption">
                  <h5 className="caption-heading white-clr">
                    Warmth Under the <br /> BONFIRE!!
                  </h5>
                </div>
              </div>

              <div className="carousel-item">
                <div className="image-overlay"></div>
                <img src={image3} className="d-block w-100" alt="Rooms" />
                <div className="carousel-caption">
                  <h5 className="caption-heading white-clr">
                    Luxurious Comfortable Rooms
                  </h5>
                </div>
              </div>

              <div className="carousel-item">
                <div className="image-overlay"></div>
                <img
                  src={image4}
                  className="d-block w-100"
                  alt="WIFI-service"
                />
                <div className="carousel-caption">
                  <h5 className="caption-heading white-clr">
                    Our Packages Have:
                    <br /> WIFI Services!
                  </h5>
                </div>
              </div>

              <div className="carousel-item">
                <div className="image-overlay"></div>
                <img src={image5} class="d-block w-100" alt="Meals-service" />
                <div className="carousel-caption">
                  <h5 className="caption-heading white-clr">
                    Indulge in Delicious Meals
                  </h5>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/*About our toursim packages*/}
          <div className="max-width about-tourismpackage-section">
            <div className="row">
              <div className="col-md-6 col-sm-12 py-5">
                <div className="image-container">
                  <img
                    className="section-img"
                    src={image12}
                    alt="TravelPackage"
                    width="100%"
                  />
                  <img
                    className="rotated-mountain"
                    src={image13}
                    alt="Rotated-Mountain"
                    width="100%"
                  />
                  <img
                    className="rotated-mountain-two"
                    src={image14}
                    alt="Rotated-Mountain-two"
                    width="100%"
                  />
                  <Lottie
                    className="location-animation"
                    loop={true}
                    animationData={locationanimation}
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12 py-5">
                <h2 className="about-ourpackages-heading">
                  <Lottie
                    className="box-animation"
                    loop={true}
                    animationData={boxanimation}
                  />
                  <b>About Our Tourism Packages</b>
                </h2>
                <br />
                <p className="about-ourpackages-para">
                  Welcome to our exclusive world of travel adventures! At our
                  platform, we offers a diverse range of unparalleled tourism
                  packages, each crafted with precision and passion by renowned
                  travel agencies. Our registered agencies offers a spectrum of
                  services whixh redefines your travel experience. From ensuring
                  seamless connectivity with complimentary WiFi, organizing
                  mesmerizing bonfire nights under the stars, capturing your
                  memories with professional photography, to serenading your
                  journey with live musical events, we leave no stone unturned
                  in making your memories unforgettable. <br />
                  <br />
                  Our packages also provides convenient pick & drop services,
                  facilitating reservations at breathtaking destinations, and
                  offering personalized services tailored to your desires.
                  Immerse yourself in the world of extraordinary travel with our
                  meticulously designed tourism packages.
                </p>
                <p className="service-icons">
                  <FamilyRestroomIcon /> Family Trips&nbsp;&nbsp;&nbsp;{" "}
                  <CameraEnhanceIcon /> Photography Service&nbsp;&nbsp;&nbsp;{" "}
                  <LocalFireDepartmentIcon /> Bonfires&nbsp;&nbsp;&nbsp;
                  <LocalHotelIcon />
                  Rooms & Hotels&nbsp;&nbsp;&nbsp; <WifiIcon />{" "}
                  WIFI&nbsp;&nbsp;&nbsp;
                  <LocalCafeIcon /> Lunch/Brunch&nbsp;&nbsp;&nbsp;
                  <AddIcon /> Customized Packages&nbsp;&nbsp;&nbsp;{" "}
                </p>
              </div>
            </div>
          </div>

          {/*Tour categories*/}
          <br />
          <div class="d-flex category-section">
            <div class="p-2">
              <Lottie
                className="category-animation"
                loop={true}
                animationData={categoryanimation}
              />
            </div>
            <div class="p-2">
              <h2 className="category-heading">
                <b>Tourism Categories</b>
              </h2>
            </div>
          </div>

          <br />
          <div className="container text-center categories-section-data">
            <div className="row">
              <div className="col">
                <img
                  className="category-image"
                  src={image6}
                  alt="adventure"
                  width="90%"
                />
                <br />
                <br />
                <p className="category-para">
                  <b>Adventure</b>
                </p>
              </div>

              <div className="col">
                <img
                  className="category-image"
                  src={image7}
                  alt="wildlife"
                  width="90%"
                />
                <br />
                <br />
                <p className="category-para">
                  <b>Wild Life</b>
                </p>
              </div>

              <div className="col">
                <img
                  className="category-image"
                  src={image8}
                  alt="leisure"
                  width="90%"
                />
                <br />
                <br />
                <p className="category-para">
                  <b>Leisure</b>
                </p>
              </div>

              <div className="col">
                <img
                  className="category-image"
                  src={image9}
                  alt="cultural"
                  width="90%"
                />
                <br />
                <br />
                <p className="category-para">
                  <b>Cultural</b>
                </p>
              </div>

              <div className="col">
                <img
                  className="category-image"
                  src={image10}
                  alt="honeymoon"
                  width="90%"
                />
                <br />
                <br />
                <p className="category-para">
                  <b>Honeymoon</b>
                </p>
              </div>

              <div className="col">
                <img
                  className="category-image"
                  src={image11}
                  alt="Nature"
                  width="90%"
                />
                <br />
                <br />
                <p className="category-para">
                  <b>Nature</b>
                </p>
              </div>
            </div>
          </div>

          <div class="d-flex Pcards-section">
            <div class="p-2">
              <Lottie
                className="pCards-animation"
                loop={true}
                animationData={featuredpackagesanimation}
              />
            </div>
            <div class="p-2">
              <h2 className="pCards-Heading">
                <b>Travel Packages:</b>
              </h2>
            </div>
          </div>

          <MetaData title="PACKAGES TRAVELOGUE" />
          
          <div className="products">
            {/*Filter Box*/}
            <div className="filters">
              <h4 className="filter-heading">
                <TuneIcon /> Filter :
              </h4>
              <div className="filterBox">
                <h6 className="filter-fields">
                  <b>By Price:</b>
                </h6>
                {price !== null && price !== undefined && (
                  <Slider
                    value={price} // Make sure that "price" is an array with two values
                    onChange={(event, newPrice) => priceHandler(event, newPrice)}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                  />
                )}
                <h6 className="filter-fields">
                  <b>By Categories:</b>
                </h6>
                <ul class="categoryBox">
                  {categories.map((cat) => (
                    <li
                      className={`category-link ${cat === category ? "active" : ""
                        }`}
                      key={cat}
                      onClick={() => categoryHandler(cat)} // Call categoryHandler when a category is clicked
                    >
                      {cat}
                    </li>
                  ))}
                </ul>

                <fieldset>
                  <h6 className="filter-fields" component="legend">
                    <b>By Ratings:</b>
                  </h6>
                  {rating !== null && rating !== undefined && (
                    <Slider
                      value={rating}
                      onChange={(e, newRating) => {
                        setRating(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                    />
                  )}
                </fieldset>
              </div>
            </div>
            {filteredProducts?.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>

          {/* <div className="products">
            {products?.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div> */}

          <br />
          {resultsPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
          {/* We  offer Best service */}

          <div className="max-width offer-service-section">
            <div className="row">
              <div className="col-md-6 col-sm-12 py-5">
                <h5 className="offerservice-mini-heading">key features</h5>
                <br />
                <h2 className="offerservice-main-heading">
                  <b>We Offer Best Services!</b>
                </h2>

                <div class="d-flex flex-row mb-3">
                  <div class="p-2 set-icons">
                    <WorkspacePremiumIcon />
                  </div>
                  <div class="p-2">
                    <h5 className="key-points-heading">
                      <b>Lot of Choices</b>
                    </h5>
                    <p className="key-points-text">
                      Travelogue always amazes you with a wide range of amazing
                      tour packages including beautiful destinations, meals,
                      bonfires, musical eves & many more.
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row mb-3">
                  <div className="p-2 set-icons">
                    <LocalLibraryIcon />
                  </div>
                  <div className="p-2">
                    <h5 className="key-pints-heading">
                      <b>Tour Guides</b>
                    </h5>
                    <p className="key-points-text">
                      Specialized & trained tour guiders are available for your
                      guide & support.
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-row mb-3">
                  <div className="p-2 set-icons">
                    {" "}
                    <WhereToVoteIcon />
                  </div>
                  <div className="p-2">
                    <h5 className="key-pints-heading">
                      <b>Hessle Free Bookings</b>
                    </h5>
                    <p className="key-points-text">
                      We never upsets you in successful bookings and online
                      payments.
                    </p>
                    <Lottie
                      className="offer-service-animation"
                      loop={true}
                      animationData={travelinganimation}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12 py-5">
                <div className="image-container">
                  <img
                    className="offerservice-img1"
                    src={image15}
                    alt="TravelSide"
                    width="100%"
                  />
                  <img
                    className="offerservice-img2"
                    src={image16}
                    alt="camping"
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
