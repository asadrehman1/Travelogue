import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart, updateTotalPrice } from "../../actions/cartActions";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/Header/MetaData";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const grossTotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);


  const deleteCartItems = async (id) => {
    try {
      // Iterate through each item in the cart
      for (const item of cartItems) {
        // Fetch the product information by making an API call to get the product details
        const productResponse = await axios.get(`/api/v1/product/${item.product}`);
  
        if (productResponse.status === 200) {
          const product = productResponse.data.product;
  
          // Make an API call to update the stock for each item
          const stockUpdateResponse = await axios.put(`/api/v1/updateStock/stock/${item.product}`, {
            capacity: product.capacity + item.quantity,
            numberOfRooms: product.numberOfRooms + item.rooms,
          });
  
          if (stockUpdateResponse.status === 200) {
            // Stock updated successfully
          } else {
            // Handle errors if the update was not successful
            console.error('Error updating stock for product:', item.product);
          }
        } else {
          // Handle errors if fetching product information was not successful
          console.error('Error fetching product information for product:', item.product);
        }
      }
    } catch (error) {
      // Handle API call errors
      console.error(error);
    }
  
    // Dispatch action to remove items from the cart after updating stock
    dispatch(removeItemsFromCart(id));
  };
  
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>

      <MetaData title="CART Travelogue" />
      {cartItems.length === 0 ? (
        <div className="emptyCart" style={{ backgroundImage: `url(${require('../../assets/tmb4.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <RemoveShoppingCartIcon />

          <Typography>No Packages in Your Cart</Typography>
          <Link to="/products">View Packages</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage" style={{ backgroundImage: `url(${require('../../assets/tmb4.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="cart-full">
              <div className="cartHeader">
                <p>Packages:</p>
                {/* <p>Quantity</p> */}
                <p>Subtotal:</p>
              </div>

              {cartItems &&
                cartItems.map((item) => (
                  
                  <div className="cartContainer" key={item.product}>
                    
                    <CartItemCard item={item} deleteCartItems={deleteCartItems} totalPrice={item.totalPrice} />
                    {/* <div className="cartInput">
                      <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button> 
                      { <span>{item.quantity}</span>}
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                        )
                      }
                    >
                      +
                    </button>
                    </div> */}
                    <p className="cartSubtotal">{`RS:${item.totalPrice
                      }`}</p>
                  </div>
                ))}

              <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                  <p>Gross Total</p>
                  <p>{grossTotal}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Check Out</button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;