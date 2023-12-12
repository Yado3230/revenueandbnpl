import { SET_LOAN_CONFIG, SET_LOAN_PDF, SET_LOAN_REQUEST } from "../types";

const initialState = {
  loanConfigDetail: [],
  loanRequest: [],
  loanPdf: "",
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOAN_CONFIG:
      return {
        ...state,
        loanConfigDetail: action.payload,
        loading: false,
      };
    case SET_LOAN_REQUEST:
      return {
        ...state,
        loanRequest: action.payload,
        loading: false,
      };
    case SET_LOAN_PDF:
      return {
        ...state,
        loanPdf: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
