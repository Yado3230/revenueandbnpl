import {
  FORCASTED_CAPACITY,
  SET_MERCHANT_LOAN,
  SET_REPAYMENT_SCHEDULE,
  SET_RETURNCAP_TABLE,
} from "../types";

const initialState = {
  borrowingCapacity: {},
  merchantLoan: [],
  repaymentSchedule: [],
  loading: false,
  capTable: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FORCASTED_CAPACITY:
      return {
        ...state,
        borrowingCapacity: action.payload,
        loading: false,
      };
    case SET_MERCHANT_LOAN:
      return {
        ...state,
        merchantLoan: action.payload,
        loading: false,
      };
    case SET_RETURNCAP_TABLE:
      return {
        ...state,
        capTable: action.payload,
        loading: false,
      };
    case SET_REPAYMENT_SCHEDULE:
      return {
        ...state,
        repaymentSchedule: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
