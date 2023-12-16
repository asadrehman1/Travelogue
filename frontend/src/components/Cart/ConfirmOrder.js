import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MetaData from "../layout/Header/MetaData";
import { Link , useNavigate} from "react-router-dom";
import { Typography } from "@material-ui/core";
// import { useAlert } from "react-alert";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  let totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
  // const alert = useAlert();

  const tax = totalPrice * 0.18;

  const proceedToPayment = async() => {
     const data = {
        tax,
        totalPrice
     }

     sessionStorage.setItem("orderInfo",JSON.stringify(data));
     navigate("/process/payment");
  }

  return (
    <Fragment>    
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Booking Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      <b>RS:{item.totalPrice}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Booking Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{totalPrice}</span>
              </div>
              {/* <div>
                <p>Shipping Charges:</p>
                <span>{shippingCharges}</span>
              </div> */}
              <div>
                <p>GST:</p>
                <span>{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{tax + totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
