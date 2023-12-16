import axios from "axios";
import {
    CREATE_VEHICLE_REQUEST,
    CREATE_VEHICLE_SUCCESS,
    CREATE_VEHICLE_FAIL,
    ALL_VEHICLES_REQUEST,
    ALL_VEHICLES_SUCCESS,
    ALL_VEHICLES_FAIL,
    VEHICLE_DETAILS_REQUEST,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    VEHICLE_REVIEW_REQUEST,
    VEHICLE_REVIEW_SUCCESS,
    VEHICLE_REVIEW_FAIL,
    TRANSPORTAGENCY_VEHICLE_REQUEST,
    TRANSPORTAGENCY_VEHICLE_SUCCESS,
    TRANSPORTAGENCY_VEHICLE_FAIL,
    DELETE_TRANSPORTAGENCY_VEHICLE_REQUEST,
    DELETE_TRANSPORTAGENCY_VEHICLE_SUCCESS,
    DELETE_TRANSPORTAGENCY_VEHICLE_FAIL,
    UPDATE_TRANSPORTAGENCY_VEHICLE_REQUEST,
    UPDATE_TRANSPORTAGENCY_VEHICLE_SUCCESS,
    UPDATE_TRANSPORTAGENCY_VEHICLE_FAIL,
    ALL_VEHICLE_REVIEW_REQUEST,
    ALL_VEHICLE_REVIEW_SUCCESS,
    ALL_VEHICLE_REVIEW_FAIL,
    DELETE_VEHICLE_REVIEW_REQUEST,
    DELETE_VEHICLE_REVIEW_SUCCESS,
    DELETE_VEHICLE_REVIEW_FAIL,
    CLEAR_ERRORS
  } from "../constants/vehicleConstants";

  // CREATE VEHICLE 
export const newVehicle = (vehicle) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_VEHICLE_REQUEST });
  
      const config = {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        "/api/v1/transportagency/vehcile/new",
        vehicle,
        config
      );
  
      dispatch({ type: CREATE_VEHICLE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_VEHICLE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  // GET ALL VEHICLES
  export const getVehicles = (currentPage = 1, price, rating) => async (dispatch) => {
    try {
      dispatch({ type: ALL_VEHICLES_REQUEST });
  
      let link = `/api/v1/vehicles?page=${currentPage}`;
  
      if (price) {
        link += `&price=${price}`;
      }
  
      if (rating) {
        link += `&rating=${rating}`;
      }
  
      const { data } = await axios.get(link);
  
      dispatch({ type: ALL_VEHICLES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_VEHICLES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // GET VEHICLE DETAILS
  export const getVehicleDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: VEHICLE_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/vehicle/${id}`);
  
      dispatch({ type: VEHICLE_DETAILS_SUCCESS, payload: data.vehicle });
    } catch (error) {
      dispatch({
        type: VEHICLE_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // CREATE VEHICLE REVIEW
  export const createVehicleReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: VEHICLE_REVIEW_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`/api/v1/vehicle/review`, reviewData, config);
  
      dispatch({ type: VEHICLE_REVIEW_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: VEHICLE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  }; 
  
  //GET ALL REVIEWS -- TRANSPORTAGENCY
  export const getAllVehicleReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_VEHICLE_REVIEW_REQUEST });
  
      const { data } = await axios.get(`/api/v1/vehicle/reviews?id=${id}`);
  
      dispatch({ type: ALL_VEHICLE_REVIEW_SUCCESS, payload: data.reviews });
    } catch (error) {
      dispatch({
        type: ALL_VEHICLE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//DELETE REVIEW of VEHICLE -- TRANSPORTAGENCY
export const deleteVehicleReview = (reviewId,vehicleId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VEHICLE_REVIEW_REQUEST });

    const { data } = await axios.delete(`/api/v1/vehicle/review?id=${reviewId}&vehicleId=${vehicleId}`);

    dispatch({ type: DELETE_VEHICLE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_VEHICLE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

  //GET ALL VEHICLES--TRANSPORTAGENCY
export const getAllTransportAgencyVehicles = () => async (dispatch) => {
  try {
    dispatch({ type: TRANSPORTAGENCY_VEHICLE_REQUEST });
    const { data } = await axios.get("/api/v1/transportagency/vehicles");
    dispatch({ type: TRANSPORTAGENCY_VEHICLE_SUCCESS, payload: data.vehicles });
  } catch (error) {
    dispatch({
      type: TRANSPORTAGENCY_VEHICLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE VEHICLE -- TRASNPORTAGENCY
export const deleteVehicle = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRANSPORTAGENCY_VEHICLE_REQUEST });

    const { data } = await axios.delete(`/api/v1/transportagency/vehcile/${id}`);

    dispatch({ type: DELETE_TRANSPORTAGENCY_VEHICLE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_TRANSPORTAGENCY_VEHICLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE VEHICLE -- TRANSPORTAGENCY
export const updateVehicle = (id, vehicle) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRANSPORTAGENCY_VEHICLE_REQUEST });

    const config = {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/transportagency/vehcile/${id}`,
      vehicle,
      config
    );

    dispatch({ type: UPDATE_TRANSPORTAGENCY_VEHICLE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_TRANSPORTAGENCY_VEHICLE_FAIL,
      payload: error.response.data.message,
    });
  }
};
  //CLEAR ERRORS
  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  
  