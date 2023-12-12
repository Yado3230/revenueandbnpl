import { SET_CATEGORY } from "../types";

const initialState = {
  categories: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
