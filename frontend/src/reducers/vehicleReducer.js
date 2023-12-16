import {
  CREATE_VEHICLE_REQUEST,
  CREATE_VEHICLE_SUCCESS,
  CREATE_VEHICLE_FAIL,
  CREATE_VEHICLE_RESET,
  ALL_VEHICLES_REQUEST,
  ALL_VEHICLES_SUCCESS,
  ALL_VEHICLES_FAIL,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
  VEHICLE_REVIEW_REQUEST,
  VEHICLE_REVIEW_SUCCESS,
  VEHICLE_REVIEW_FAIL,
  VEHICLE_REVIEW_RESET,
  TRANSPORTAGENCY_VEHICLE_REQUEST,
  TRANSPORTAGENCY_VEHICLE_SUCCESS,
  TRANSPORTAGENCY_VEHICLE_FAIL,
  DELETE_TRANSPORTAGENCY_VEHICLE_REQUEST,
  DELETE_TRANSPORTAGENCY_VEHICLE_SUCCESS,
  DELETE_TRANSPORTAGENCY_VEHICLE_FAIL,
  DELETE_TRANSPORTAGENCY_VEHICLE_RESET,
  UPDATE_TRANSPORTAGENCY_VEHICLE_REQUEST,
  UPDATE_TRANSPORTAGENCY_VEHICLE_SUCCESS,
  UPDATE_TRANSPORTAGENCY_VEHICLE_FAIL,
  UPDATE_TRANSPORTAGENCY_VEHICLE_RESET,
  ALL_VEHICLE_REVIEW_REQUEST,
  ALL_VEHICLE_REVIEW_SUCCESS,
  ALL_VEHICLE_REVIEW_FAIL,
  DELETE_VEHICLE_REVIEW_REQUEST,
  DELETE_VEHICLE_REVIEW_SUCCESS,
  DELETE_VEHICLE_REVIEW_FAIL,
  DELETE_VEHICLE_REVIEW_RESET,
  CLEAR_ERRORS
} from "../constants/vehicleConstants";

//CREATE VEHICLE REDUCER
export const newVehicleReducer = (state = { vehicle: {} }, action) => {
  switch (action.type) {
    case CREATE_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_VEHICLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        vehicle: action.payload.vehicle,
      };
    case CREATE_VEHICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_VEHICLE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//GET ALL VEHICLES REDUCAR
export const vehiclesReducer = (state = { vehicles: [] }, action) => {
    switch (action.type) {
      case ALL_VEHICLES_REQUEST:
        case TRANSPORTAGENCY_VEHICLE_REQUEST:
        return {
          loading: true,
          vehicles: [],
        };
      case ALL_VEHICLES_SUCCESS:
        return {
          loading: false,
          vehicles: action.payload.vehicles,
          vehicleCount: action.payload.vehicleCount,
          resultsPerPage: action.payload.resultsPerPage,
        };
      case TRANSPORTAGENCY_VEHICLE_SUCCESS:
      return {
        loading: false,
        vehicles: action.payload,
      };
      case ALL_VEHICLES_FAIL:
        case TRANSPORTAGENCY_VEHICLE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  //DELETE & UPDATE VEHICLE -- TASNPORTAGENCY
export const vehcileReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRANSPORTAGENCY_VEHICLE_REQUEST:
    case UPDATE_TRANSPORTAGENCY_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TRANSPORTAGENCY_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_TRANSPORTAGENCY_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_TRANSPORTAGENCY_VEHICLE_FAIL:
    case UPDATE_TRANSPORTAGENCY_VEHICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TRANSPORTAGENCY_VEHICLE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_TRANSPORTAGENCY_VEHICLE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

  
  // VEHICLE DETAILS REDUCER
  export const vehicleDetailsReducer = (state = { vehicle: {} }, action) => {
    switch (action.type) {
      case VEHICLE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case VEHICLE_DETAILS_SUCCESS:
        return {
          loading: false,
          vehicle: action.payload,
        };
      case VEHICLE_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

// VEHICLE CREATE REVIEW
export const vehicleReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case VEHICLE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case VEHICLE_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case VEHICLE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case VEHICLE_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
//GET ALL REVIEWS OF VEHICLES -- TRANSPORTAGENCY

export const vehicleReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_VEHICLE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_VEHICLE_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_VEHICLE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
//DELETE REVIEW -- TRANSPORTAGENCY

export const deleteVehicleReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_VEHICLE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_VEHICLE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_VEHICLE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_VEHICLE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};