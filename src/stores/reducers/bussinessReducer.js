import {
  GET_UN_ACTIVE_BUSSINESS,
  GET_UN_ACTIVE_BUSSINESS_ERROR,
  ACTIVATE_BUSSINESS,
  ACTIVATE_BUSSINESS_ERROR,
  SUCCESS_RESPONSE_SETTER,
  ERROR_RESPONSE_SETTER,
  GET_ALL_BUSSINESS,
} from "../types";

const initialState = {
  pendingBussiness: [],
  approvedBussiness: {},
  response: "",
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_UN_ACTIVE_BUSSINESS:
      return {
        ...state,
        pendingBussiness: action.payload,
        loading: false,
      };
    case GET_ALL_BUSSINESS:
      return {
        ...state,
        allBussiness: action.payload,
        loading: false,
      };

    case ACTIVATE_BUSSINESS:
      return {
        ...state,
        approvedBussiness: action.payload,
        loading: false,
      };

    case SUCCESS_RESPONSE_SETTER:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case ERROR_RESPONSE_SETTER:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case ACTIVATE_BUSSINESS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_UN_ACTIVE_BUSSINESS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
