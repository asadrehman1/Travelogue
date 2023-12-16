import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO,RESET_CART } from "../constants/cartConstants";
// reducers/cartReducer.js
// import { UPDATE_TOTAL_PRICE } from "../actions/cartActions";


export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
        const existingItem = state.cartItems.find((cartItem) => cartItem.product === item.product);
        if (existingItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) => (i.product === existingItem.product ? item : i)),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
      // case UPDATE_TOTAL_PRICE:
      //   return {
      //     ...state,
      //     totalPrice: action.payload,
      //   };
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
      case REMOVE_FROM_CART:
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.product !== action.payload),
        };
      case RESET_CART:
        return {
          ...state,
          cartItems: [],
          // totalPrice: 0, // Reset the totalPrice when the cart is reset.
        };
      default:
        return state;
    }
  };