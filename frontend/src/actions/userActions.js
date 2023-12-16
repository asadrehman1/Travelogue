import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_FAIL,
  ALL_USERS_SUCCESS,
  UPDATE_USERS_REQUEST,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  DELETE_USERS_FAIL,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  ALL_UNAPPROVED_USERS_REQUEST,
  ALL_UNAPPROVED_USERS_SUCCESS,
  ALL_UNAPPROVED_USERS_FAIL,
  UPDATE_APPROVED_REQUEST,
  UPDATE_APPROVED_SUCCESS,
  UPDATE_APPROVED_FAIL,
  UPDATE_APPROVED_RESET
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`/api/v1/me` );
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };


export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout` );

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
  };

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
  }
};


export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};


// GET ALL USERS -- ADMIN
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/users` );

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// GET ALL unapproved USERS -- ADMIN
export const getAllUnapprovedUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_UNAPPROVED_USERS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/requests` );

    dispatch({ type: ALL_UNAPPROVED_USERS_SUCCESS, payload: data.unapprovedUsers });
  } catch (error) {
    dispatch({ type: ALL_UNAPPROVED_USERS_FAIL, payload: error.response.data.message });
  }
};

// GET USER DETAILS -- ADMIN
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}` );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// UPDATE USER  -- ADMIN
export const updateUser = (id,userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USERS_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

    dispatch({ type: UPDATE_USERS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_USERS_FAIL, payload: error.response.data.message });
  }
};

// UPDATE USER  -- ADMIN
export const updateApprovel = (id,userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_APPROVED_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/admin/request/${id}`, userData, config);

    dispatch({ type: UPDATE_APPROVED_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_APPROVED_FAIL, payload: error.response.data.message });
  }
};


// DELETE USER -- ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USERS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_USERS_FAIL, payload: error.response.data.message });
  }
};

