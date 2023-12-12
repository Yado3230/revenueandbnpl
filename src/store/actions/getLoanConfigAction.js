import { SET_LOAN_CONFIG, SET_LOAN_PDF, SET_LOAN_REQUEST } from "../types";
// import AuthService from "../../services/auth.service";

import LoanConfigService from "../../services/loanConfig.service";
export const getLoanConfigDetail = (userID) => async (dispatch) => {
  try {
    const loanDetail = await LoanConfigService.getLoanConfig(userID);
    dispatch({
      type: SET_LOAN_CONFIG,
      payload: loanDetail,
    });
  } catch (error) {
    return error;
  }
};

export const getLoanRequestDetail = (userID) => async (dispatch) => {
  try {
    const loanRequest = await LoanConfigService.getLoanRequest(userID);
    dispatch({
      type: SET_LOAN_REQUEST,
      payload: loanRequest,
    });
  } catch (error) {
    return error;
  }
};
export const generateLoanDetailPdf =
  (
    sales_id,
    loan_req_id,
    first_name,
    last_name,
    interest_rate,
    duation,
    amount,
    setLoanPdf
  ) =>
  async (dispatch) => {
    try {
      const loanPdf = await LoanConfigService.generateLoanPdf(
        sales_id,
        loan_req_id,
        first_name,
        last_name,
        interest_rate,
        duation,
        amount,
        setLoanPdf
      );
      dispatch({
        type: SET_LOAN_PDF,
        payload: loanPdf,
      });
    } catch (error) {
      return error;
    }
  };
