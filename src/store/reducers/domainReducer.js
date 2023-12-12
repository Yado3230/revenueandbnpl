import {
  ADD_DOMAIN,
  ADD_DOMAIN_ERROR,
  GET_DOMAIN,
  GET_DOMAIN_ERROR,
  SUCCESS_RESPONSE_SETTER,
  ERROR_RESPONSE_SETTER,
} from "../types";

const initialState = {
  domain: {},
  domains: [],
  message: {},
  response: "",
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_DOMAIN:
      return {
        ...state,
        domain: action.payload,
        loading: false,
      };
    case GET_DOMAIN:
      return {
        ...state,
        domains: action.payload,
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

    case GET_DOMAIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_DOMAIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
