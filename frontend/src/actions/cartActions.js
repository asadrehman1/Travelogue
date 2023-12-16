import { ADD_TO_CART ,REMOVE_FROM_CART, SAVE_SHIPPING_INFO ,RESET_CART } from "../constants/cartConstants";
import axios from "axios";
// export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";
// export const updateTotalPrice = (totalPrice) => (dispatch) => {
//   dispatch({
//     type: UPDATE_TOTAL_PRICE,
//     payload: totalPrice,
//   });
// };

export const addItemsToCart = (id, quantity,rooms,pickupPoint,date,totalPrice) => async (dispatch,getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: ADD_TO_CART, payload: {
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].url,
        quantity,
        rooms,
        pickupPoint,
        date,
        totalPrice,
    } });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch,getState) => {
  dispatch({type:REMOVE_FROM_CART,payload:id});
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({type:SAVE_SHIPPING_INFO,payload:data});
    localStorage.setItem("shippingInfo",JSON.stringify(data));
}

export const resetCartItems = () => async (dispatch) => {
  dispatch({type:RESET_CART});
}

