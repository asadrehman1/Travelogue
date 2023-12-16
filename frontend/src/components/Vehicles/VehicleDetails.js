import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import "./VehicleDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getVehicleDetails } from "../../actions/vehicleActions";
import ReviewCard from "../Product/ReviewCard";
import Loader from "../layout/Loader/Loader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";
import { IconButton } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { VEHICLE_REVIEW_RESET } from "../../constants/vehicleConstants";
import { createVehicleReview } from "../../actions/vehicleActions";

import Lottie from "lottie-react";
import vehicledetailedpageanimation from "../../assets/cardetailedpagenimation.json";
import reviewsanimation from "../../assets/R3.json";

const VehicleDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { vehicle, loading, error } = useSelector(
    (state) => state.vehicleDetails
  );

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { success, error: reviewError } = useSelector(
    (state) => state.newVehicleReview
  );

  const options = {
    size: "large",
    value: vehicle?.rating,
    readOnly: true,
    precision: 0.5,
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  const submitReviewToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("vehicleId", id);
    myForm.set("selectedDate", selectedDate);

    dispatch(createVehicleReview(myForm));
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
      dispatch({ type: VEHICLE_REVIEW_RESET });
    }
    dispatch(getVehicleDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  // const totalPrice = vehicle ? vehicle.price * quantity : 0;
  const totalPrice = vehicle ? vehicle.price * quantity * numberOfDays : 0;


  const bookNowHandler = async () => {
    if (!isAuthenticated) {
      alert.error("Please Login First");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.put(
        `/api/v1/updateVehicleStock/stock/${id}`,
        {
          quantity: vehicle.quantity - quantity,
        }
      );

      const whatsappMessage = `New Booking:

              Vehicle: ${vehicle?.name}
              Number of Days: ${numberOfDays}
              Quantity: ${quantity}
              Date: ${selectedDate}
              Total Price: RS ${totalPrice}

              Customer Information:
              Name: ${user?.name}
              Email: ${user?.email}`;

              
      const phoneNumber = vehicle?.user?.transportAgency?.contactPhone.replace(/\D/g, '');

      const formattedPhoneNumber = `+92${phoneNumber.substring(1)}`;
      const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      if (response.status === 200) {
        const emailData = {
          email: user?.email,
          vehicleName: vehicle.name,
          numberOfDays,
          totalPrice,
          selectedDate,
          quantity,
          whatsappLink,
        };

        const emailResponse = await axios.post(
          "/api/v1/book-vehicle",
          emailData
        );

        if (emailResponse.data.success) {
          alert.success(emailResponse.data.message);
        } else {
          alert.error("Email Sent Failed");
        }
      } else {
        // Handle errors if the stock update was not successful
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${vehicle?.name} -- TRAVELOGUE`} />

          <div className="VehicleDetails">
            <div
              style={{
                backgroundImage: `url(${require("../../assets/bk4.jpg")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Carousel>
                {vehicle?.images &&
                  vehicle?.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
              <Lottie
                className="vehicle-detailed-page-animation"
                loop={true}
                animationData={vehicledetailedpageanimation}
              />
            </div>


            <div>
              <div className="detailsBlock-1">
                <h2>{vehicle?.name}</h2>
                <br />
                <p>Vehicle # {vehicle?._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({vehicle?.numOfReviews} Reviews)
                </span>
              </div>

              <br />
              {/*grids*/}
              <div className="grids">
                {/*1st row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Transport Agency:</b>
                    </h4>
                    <p>{vehicle?.user?.transportAgency?.agencyName}</p>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Vehicle Type:</b>
                    </h4>
                    <p>{vehicle?.vehicleType}</p>
                  </div>
                </div>

                {/*2nd row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Model:</b>
                    </h4>
                    <p>{vehicle?.model}</p>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>People Capacity:</b>
                    </h4>
                    <p>{vehicle?.capacity} seats</p>
                  </div>
                </div>

                {/*3rd row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Price:</b>
                    </h4>
                    <p>RS: {vehicle?.price}/Day</p>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Quantity:</b>
                    </h4>
                    <Select className="custom-select"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {Array.from(
                        { length: vehicle?.quantity },
                        (_, i) => i + 1
                      ).map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                {/*4th row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Includes:</b>
                    </h4>
                    <ul>
                      {vehicle?.features &&
                        vehicle?.features.map((feature, index) => (
                          <div style={{ display: "flex" }}>
                            <div>
                              <CheckCircleIcon
                                color="primary"
                                fontSize="medium"
                              />
                            </div>
                            <li
                              key={index}
                              style={{
                                marginBottom: "0.5rem",
                                marginLeft: "3px",
                                textAlign: "start",
                                listStyleType: "none",
                              }}
                            >
                              {feature}
                            </li>
                          </div>
                        ))}
                    </ul>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Not Includes:</b>
                    </h4>
                    <ul>
                      {vehicle?.notIncludes &&
                        vehicle?.notIncludes.map((notInclude, index) => (
                          <div style={{ display: "flex" }}>
                            <div>
                              <ClearIcon color="error" fontSize="medium" />
                            </div>
                            <li
                              key={index}
                              style={{
                                marginBottom: "0.5rem",
                                marginLeft: "3px",
                                textAlign: "start",
                                listStyleType: "none",
                              }}
                            >
                              {notInclude}
                            </li>
                          </div>
                        ))}
                    </ul>
                  </div>
                </div>

                {/*5th row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Total Price:</b>
                    </h4>
                    <p>RS: {totalPrice}</p>
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Phone No#:</b>
                    </h4>
                    <p>{vehicle?.user?.transportAgency?.contactPhone}</p>
                  </div>
                </div>

                {/*6th row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>City:</b>
                    </h4>
                    <p>{vehicle?.city}</p>
                  </div>
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Number of Days:</b>
                    </h4>
                    <input
                      className="number-ofdays-input"
                      type="number"
                      value={numberOfDays}
                      onChange={(e) => setNumberOfDays(e.target.value)}
                      min="1"
                    />
                  </div>
                </div>
                <br />

                {/*7th row*/}
                <div className="row">
                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Select Date:</b>
                    </h4>
                    <TextField className="custom-select"
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  <div className="col">
                    <h4 className="fields-heading">
                      <b>Availability:</b>
                    </h4>
                    <p
                      style={{
                        color: vehicle?.quantity > 0 ? "green" : "red",
                        fontWeight: "300"
                      }}
                    >
                      {vehicle?.quantity > 0 ? "Available" : "Not Available"}
                    </p>
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
                        {isAuthenticated ? "Book Now" : "Login to Book"}
                      </IconButton>
                    </button>
                  </div>

                  <div className="col">
                    <button
                      onClick={submitReviewToggle}
                      className="submitReview"
                      disabled={!isAuthenticated}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex handle-review">
            <div className="p-2">
              <Lottie
                className="review-animation"
                loop={true}
                animationData={reviewsanimation}
              />
            </div>
            <div className="p-2">
              <h3 className="reviews-heading2">
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

          {vehicle?.reviews && vehicle?.reviews[0] ? (
            <div className="reviews">
              {vehicle?.reviews &&
                vehicle?.reviews.map((review) => (
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

export default VehicleDetails;
