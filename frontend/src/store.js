import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productsReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  deleteReviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrderDetailsReducer, myOrdersReducer, newOrderReducer, orderReducer } from "./reducers/orderReducer";
import { deleteVehicleReviewReducer, newVehicleReducer, vehcileReducer, vehicleDetailsReducer,vehicleReviewsReducer, vehicleReviewReducer, vehiclesReducer } from "./reducers/vehicleReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:myOrderDetailsReducer,
  newReview: newReviewReducer,
  newProduct:newProductReducer,
  product:productReducer,
  allOrders:allOrdersReducer,
  order:orderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  allReviews:productReviewsReducer,
  deleteReview:deleteReviewReducer,
  newVehicle:newVehicleReducer,
  vehicles:vehiclesReducer,
  vehicleDetails:vehicleDetailsReducer,
  newVehicleReview:vehicleReviewReducer,
  vehicle:vehcileReducer,
  allVehicleReviews:vehicleReviewsReducer,
  deleteVehicleReview:deleteVehicleReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
