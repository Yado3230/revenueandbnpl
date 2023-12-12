import { GET_TOKEN } from "../types";

const initialState = {
  token: "",
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
