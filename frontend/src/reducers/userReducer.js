import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
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
  UPDATE_USERS_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  DELETE_USERS_FAIL,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_RESET,
  ALL_UNAPPROVED_USERS_REQUEST,
  ALL_UNAPPROVED_USERS_SUCCESS,
  ALL_UNAPPROVED_USERS_FAIL,
  UPDATE_APPROVED_REQUEST,
  UPDATE_APPROVED_SUCCESS,
  UPDATE_APPROVED_FAIL,
  UPDATE_APPROVED_RESET
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
      case LOGOUT_SUCCESS:
        return {
          loading:false,
          isAuthenticated:false,
          user:null
        }

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      }

      case LOGOUT_FAIL:
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


export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USERS_REQUEST:
          case DELETE_USERS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_APPROVED_REQUEST:
        return {
          ...state,
          loading: true,
        };
    case UPDATE_PROFILE_SUCCESS:
      case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
      case UPDATE_APPROVED_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case DELETE_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message:action.payload.message
        };
    
      case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
          case UPDATE_USERS_RESET:
        return {
          ...state,
          isUpdated:false
        }
        case UPDATE_APPROVED_RESET:
          return {
            ...state,
            isUpdated: false,
          };
    
    case UPDATE_PROFILE_FAIL:
      case UPDATE_PASSWORD_FAIL:
        case UPDATE_USERS_FAIL:
          case DELETE_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };  
      case UPDATE_APPROVED_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };      
      case DELETE_USERS_RESET:
      return {
        ...state,
        isDeleted:false
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
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

export const allUsersReducer = (state = {users:[] , unapprovedUsers: []}, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_UNAPPROVED_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_UNAPPROVED_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        unapprovedUsers: action.payload,
      };

    case ALL_USERS_FAIL:
      case ALL_UNAPPROVED_USERS_FAIL:
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


export const userDetailsReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
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