import {
  GENERATE_API_KEY,
  GENERATE_API_KEY_ERROR,
  GET_GENERATED_API_KEY,
  GET_GENERATED_API_KEY_ERROR,
} from "../types";

const initialState = {
  apiKey: [],
  generatedApiKey: {},
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GENERATE_API_KEY:
      return {
        ...state,
        apiKey: action.payload,
        loading: false,
      };

    case GET_GENERATED_API_KEY:
      return {
        ...state,
        generatedApiKey: action.payload,
        loading: false,
      };

    case GET_GENERATED_API_KEY_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case GENERATE_API_KEY_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
