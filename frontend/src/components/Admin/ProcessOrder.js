import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";
import { useAlert } from "react-alert";
import {
  updateOrder,
  myOrderDetails,
  clearError,
} from "../../actions/orderActions";
import "./ProcessOrder.css";
import SideBar from "./Sidebar";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDERS_RESET });
    }

    dispatch(myOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // const userId = order?.user?._id;
  // const cartDetailsString = localStorage.getItem("cartDetails");
  // const cartDetails = cartDetailsString ? JSON.parse(cartDetailsString) : [];
  // const filteredCartDetails = cartDetails.filter(
  //   (cartItem) => cartItem.userId === userId
  // );

  // console.log(order?.user?._id)

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer" style={{ backgroundImage: `url(${require('../../assets/tmb3.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order?.orderStatus === "Accept" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea" style={{ backgroundImage: `url(${require('../../assets/tmb3.jpg' )})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }} >
                  <Typography>Booking Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order?.user && order?.user?.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order?.shippingInfo && order?.shippingInfo?.phoneNo}
                      </span>
                    </div>
                    <div>
                    <p>Total Price:</p>
                      <span>
                        {order?.totalPrice}
                      </span>
                    </div>
                    <div>
                    {order?.orderItems &&
                      order?.orderItems.map((item) => (
                        <div key={item.product}>
                          <div>
                            <p>Selected Room:</p>
                            <span>{item.rooms}</span>
                          </div>
                          <div>
                            <p>Selected Capacity:</p>
                            <span>{item.quantity}</span>
                          </div>
                          <div>
                            <p>Selected Date:</p>
                            <span> {formatDate(item.date)}</span>
                          </div>
                          <div>
                            <p>Selected Pickup Point:</p>
                            <span>{item.pickupPoint}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order?.paymentInfo &&
                          order?.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order?.paymentInfo &&
                        order?.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order?.totalPrice && order?.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Booking Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order?.orderStatus && order?.orderStatus === "Accept"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order?.orderStatus && order?.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order?.orderItems &&
                      order?.orderItems?.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X RS{item.price} ={" "}
                            <b>RS:{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order?.orderStatus === "Accept" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value="">Choose Action</option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
