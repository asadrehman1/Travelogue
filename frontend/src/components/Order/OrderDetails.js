import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { myOrderDetails, clearError } from "../../actions/orderActions";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = (props) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(myOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Booking Details" />
          <div className="orderDetailsPage" style={{ backgroundImage: `url(${require('../../assets/tmb2.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
            <div className="orderDetailsContainer">
              <Typography component="h1">Order #{order?._id}</Typography>
              <Typography>Booking Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order?.user?.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order?.shippingInfo?.phoneNo}</span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order?.paymentInfo?.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {
                    order?.paymentInfo?.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order?.totalPrice}</span>
                </div>
              </div>

              <Typography>Booking Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order?.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order?.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Package Details:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order?.orderItems &&
                  order?.orderItems?.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X {item.price} ={" "}
                        <b>RS:{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
