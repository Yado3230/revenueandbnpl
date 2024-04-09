import {
  GET_SALES_KYC,
  SET_SALES,
  SET_SALES_PAYMENTS,
  SET_SALES_REPORT,
} from "../types";

const initialState = {
  salesDetail: [],
  salesKyc: [],
  sales_reports: {},
  payments: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SALES:
      return {
        ...state,
        salesDetail: action.payload,
        loading: false,
      };
    case GET_SALES_KYC:
      return {
        ...state,
        salesKyc: action.payload,
        loading: false,
      };
    case SET_SALES_REPORT:
      return {
        ...state,
        sales_reports: action.payload,
        loading: false,
      };
    case SET_SALES_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
