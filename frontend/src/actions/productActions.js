import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  CREATE_ADMIN_PRODUCTS_REQUEST,
  CREATE_ADMIN_PRODUCTS_SUCCESS,
  CREATE_ADMIN_PRODUCTS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  DELETE_ADMIN_PRODUCTS_REQUEST,
  DELETE_ADMIN_PRODUCTS_SUCCESS,
  DELETE_ADMIN_PRODUCTS_FAIL,
  UPDATE_ADMIN_PRODUCTS_REQUEST,
  UPDATE_ADMIN_PRODUCTS_SUCCESS,
  UPDATE_ADMIN_PRODUCTS_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProducts =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL PRODUCTS -- ADMIN
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CREATE PRODUCT -- ADMIN
export const newProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ADMIN_PRODUCTS_REQUEST });

    const config = {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      product,
      config
    );

    dispatch({ type: CREATE_ADMIN_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE PRODUCT -- ADMIN
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({ type: DELETE_ADMIN_PRODUCTS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE PRODUCT -- ADMIN
export const updateProduct = (id, product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADMIN_PRODUCTS_REQUEST });

    const config = {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      product,
      config
    );

    dispatch({ type: UPDATE_ADMIN_PRODUCTS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//GET ALL REVIEWS -- ADMIN
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE REVIEW of PRODUCT -- ADMIN
export const deleteReview = (reviewId,productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(`/api/v1/review?id=${reviewId}&productId=${productId}`);

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
