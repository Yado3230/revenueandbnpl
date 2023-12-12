import { GET_TRANSACTION, GET_TRANSACTION_ERROR } from "../types";

const initialState = {
  transactionDetail: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTION:
      return {
        ...state,
        transactionDetail: action.payload,
        loading: false,
      };
    case GET_TRANSACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
