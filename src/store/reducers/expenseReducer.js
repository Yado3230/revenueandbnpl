import { SET_EXPENSES } from "../types";

const initialState = {
  expenses: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
