import { FORCASTED_CAPACITY } from "../types";

const initialState = {
  borrowingCapacity: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FORCASTED_CAPACITY:
      return {
        ...state,
        borrowingCapacity: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
