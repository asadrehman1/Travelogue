import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  localStorage.removeItem("travelAgencyId");
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Booking has been Placed successfully </Typography>
      <Link to="/orders">View Bookings</Link>
    </div>
  );
};

export default OrderSuccess;