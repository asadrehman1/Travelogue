import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, getProductDetails } from "../../actions/productActions";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";
import { addItemsToCart } from "../../actions/cartActions";
import { IconButton } from "@material-ui/core";
// import { updateTotalPrice } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { newReview } from "../../actions/productActions";
import {
  myOrders,
  // clearError as orderClearError,
} from "../../actions/orderActions.js";

import Lottie from "lottie-react";
import detailedpageanimation from "../../assets/detailedpage.json";
import reviewanimation from "../../assets/R1.json";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log(product?.user);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { orders } = useSelector((state) => state.myOrders);

  const options = {
    size: "large",
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // const [quantity, setQuantity] = useState(1);
  const [selectedCapacity, setSelectedCapacity] = useState(1);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState("");
  const [totalPrice, setTotalPrice] = useState(product?.price);
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [agencyDetails, setAgencyDetails] = useState("");

  console.log(agencyDetails?.travelAgency?.contactPhone)

  const bookNowHandler = async () => {
    if (!isAuthenticated) {
      alert.error("Please Login First");
      navigate("/login");
      return;
    }
    try {
      const whatsappMessage = `Hello! I'm interested in your tourism services. Can you provide more information?`;
      const phoneNumber = agencyDetails?.travelAgency?.contactPhone.replace(/\D/g, '');

    const formattedPhoneNumber = `+92${phoneNumber.substring(1)}`;

    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;


        const emailData = {
          email: user?.email,
          Package: product?.name,
          whatsappLink,
        };

        const emailResponse = await axios.post(
          "/api/v1/book-package",
          emailData
        );

        if (emailResponse.data.success) {
          alert.success(emailResponse.data.message);
        } else {
          alert.error("Email Sent Failed");
        }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCartHandler = async () => {
    if (!isAuthenticated || user?.role !== "user") {
      alert.error("Please Login First as a User");
      if (!isAuthenticated) {
        navigate("/login");
      }
      return;
    }
    try {
      // Make an API call to update the stock for each item
      const response = await axios.put(`/api/v1/updateStock/stock/${id}`, {
        capacity: product.capacity - selectedCapacity,
        numberOfRooms: product.numberOfRooms - selectedRoom
      });

      if (response.status === 200) {
        // Stock updated successfully
      } else {
        // Handle errors if the update was not successful
      }
    } catch (error) {
      // Handle API call errors
      console.error(error);
    }
    // const selectedDetails = {
    //   selectedRoom,
    //   selectedCapacity,
    //   selectedPickupPoint,
    //   selectedDate,
    //   userId: user?._id,
    // };
    // const existingData = localStorage.getItem("cartDetails");
    // const cartDetails = existingData ? JSON.parse(existingData) : [];
    // cartDetails.push(selectedDetails);
    // const cartDetailsString = JSON.stringify(cartDetails);
    // localStorage.setItem("cartDetails", cartDetailsString);

    dispatch(addItemsToCart(id, selectedCapacity, selectedRoom, selectedPickupPoint, selectedDate, totalPrice));
    localStorage.setItem("travelAgencyId", product.user);
    alert.success("Item Added To Cart");
    // dispatch(updateTotalPrice(totalPrice));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/v1/getUser/${product?.user}`);
        setAgencyDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error, e.g., show an alert
      }
    };

    fetchUser();
  }, [product?.user])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handlePickupPointChange = (event) => {
    const selectedPoint = event.target.value;
    setSelectedPickupPoint(selectedPoint);

    const selectedPointData = product.pickupPoints.find(
      (point) => point.name === selectedPoint
    );

    if (selectedPointData) {
      setTotalPrice(product?.price + selectedPointData.price);
    } else {
      setTotalPrice(product?.price);
    }
  };

  const handleCapacityChange = (event) => {
    const selectedCapacityValue = event.target.value;
    setSelectedCapacity(selectedCapacityValue);

    // Calculate the new total price based on the selected capacity
    const basePrice = product?.price;
    const selectedPointData = product.pickupPoints.find(
      (point) => point.name === selectedPickupPoint
    );

    if (selectedPointData) {
      const pickupPointPrice = selectedPointData.price;
      const newTotalPrice = basePrice + pickupPointPrice;
      setTotalPrice(newTotalPrice * selectedCapacityValue);
    } else {
      setTotalPrice(basePrice * selectedCapacityValue);
    }
  };

  const handleRoomChange = (event) => {
    const selectedRoomValue = event.target.value;
    setSelectedRoom(selectedRoomValue);

    // Calculate the new room price based on the number of rooms
    const pricePerRoom = product?.pricePerRoom || 0;
    const roomPrice = pricePerRoom * (selectedRoomValue - 1);

    const selectedPointData = product.pickupPoints.find(
      (point) => point.name === selectedPickupPoint
    );

    // Calculate the new total price
    const newTotalPrice =
      (product?.price + selectedPointData.price) * selectedCapacity + roomPrice;
    setTotalPrice(newTotalPrice);
  };

  const submitReviewToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
    dispatch(myOrders());
  }, [dispatch, id, error, alert, reviewError, success]);

  let capacityOptions = Array.from(
    { length: product?.capacity },
    (_, i) => i + 1
  );

  let roomOptions = Array.from(
    { length: product?.numberOfRooms },
    (_, i) => i + 1
  );

  const hasOrderedProduct = orders?.some((order) =>
    order.orderItems.some((item) => item.product === id)
  );

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product?.name} -- TRAVELOGUE`} />
          <div className="ProductDetails">
            <div
              style={{
                backgroundImage: `url(${require("../../assets/bg3.jpg")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Carousel>
                {product?.images &&
                  product?.images?.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
              <Lottie
                className="detailed-page-animation"
                loop={true}
                animationData={detailedpageanimation}
              />
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <h5>Agency: {agencyDetails?.travelAgency?.agencyName}</h5>
                <br />
                <p>Product # {product?._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product?.numOfReviews} Reviews)
                </span>
              </div>
              <br />

              {/*grids*/}
              <div className="grids">
                {/*1st row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Price:</b>
                    </h4>
                    <p>RS: {totalPrice ? totalPrice : product?.price}</p>
                  </div>
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Vehicle Type:</b>
                    </h4>
                    <p>{product?.vehicleName}</p>
                  </div>
                </div>

                {/*2nd row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Pickup Point:</b>
                    </h4>
                    <Select className="custom-select"
                      value={selectedPickupPoint}
                      onChange={handlePickupPointChange}
                    >
                      <MenuItem value="">Choose Pickup Point</MenuItem>
                      {product?.pickupPoints?.map((point, index) => (
                        <MenuItem key={index} value={point.name}>
                          {point.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Destination:</b>
                    </h4>
                    <p>{product?.destination}</p>
                  </div>
                </div>

                {/*3rd row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Description:</b>
                    </h4>
                    <p>{product?.description}</p>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Duration:</b>
                    </h4>
                    <p>{product?.duration}</p>
                  </div>
                </div>

                {/*4th row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Guests:</b>
                    </h4>
                    <FormControl className="custom-select">
                      <Select 
                        value={selectedCapacity}
                        onChange={handleCapacityChange}
                      >
                        {capacityOptions?.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Hotel:</b>
                    </h4>
                    <p>{product?.hotel}</p>
                  </div>
                </div>

                {/*5th row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Price/room:</b>
                    </h4>
                    <p>{product?.pricePerRoom}</p>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Rooms:</b>
                    </h4>
                    <FormControl className="custom-select"> 
                      <Select value={selectedRoom} onChange={handleRoomChange}>
                        {roomOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>


                {/*6th row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Select Date:</b>
                    </h4>
                    {/* Create a select element to allow users to select a date */}
                    <Select className="custom-select"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <MenuItem value="">Choose Date</MenuItem>
                      {product?.dates &&
                        product?.dates?.map((date, index) => (
                          <MenuItem key={index} value={date}>
                            {formatDate(date)}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Availability:</b>
                    </h4>
                    <p style={{ color: product?.capacity > 0 ? "green" : "red" }}>{product?.capacity > 0 ? "Available" : "Not Available"}</p>
                  </div>
                </div>

                {/*7th row*/}
                <div className="row">
                  <div className="col detailsBlock-5">
                    {product?.includes?.length > 0 && (
                      <h4 className="fields-heading">
                        <b>Includes: </b>
                      </h4>
                    )}
                    <ul>
                      {product?.includes &&
                        product?.includes?.map((item, index) => (
                          <div>
                            <CheckCircleIcon
                              color="primary"
                              fontSize="medium"
                            />
                            <li
                              key={index}
                              style={{
                                display: "inline",
                                listStyleType: "none",
                                margin: "0 5px",
                              }}
                            >
                              {item}
                            </li>
                          </div>
                        ))}
                    </ul>
                  </div>
                  <div className="col detailsBlock-5">
                    {product?.notIncludes?.length > 0 && (
                      <h4 className="fields-heading">
                        <b>Not Includes: </b>
                      </h4>
                    )}
                    <ul>
                      {product?.notIncludes &&
                        product?.notIncludes?.map((item, index) => (
                          <div>
                            <ClearIcon color="secondary" fontSize="medium" />
                            <li
                              key={index}
                              style={{
                                display: "inline",
                                listStyleType: "none",
                                margin: "0 5px",
                              }}
                            >
                              {item}
                            </li>
                          </div>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="row 4throw" style={{ marginTop: "15px" }}>
                <div className="col">
                    <button className="book-now-btn">
                      <IconButton
                        onClick={bookNowHandler}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="white"
                        style={{
                          fontSize: "16px",
                          color: "antiquewhite",
                          backgroundcolor: "#0067a5",
                        }}
                      >
                        <WhatsAppIcon />
                        {isAuthenticated ? "Chat Now" : "Login to Chat"}
                      </IconButton>
                    </button>
                  </div>
                  <div className="col">
                    <button
                      onClick={addToCartHandler}
                      className="BookingButton"
                    >
                      Book Now
                    </button>
                  </div>
                  {hasOrderedProduct && (
                    <div className="col">
                      <button
                        onClick={submitReviewToggle}
                        className="submitReview"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="d-flex handle-review">
            <div className="p-2">
              <Lottie
                className="review-animation"
                loop={true}
                animationData={reviewanimation}
              />
            </div>
            <div className="p-2">
              <h3 className="reviews-heading">
                <b>REVIEWS</b>
              </h3>
            </div>
          </div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product?.reviews &&
                product?.reviews?.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
