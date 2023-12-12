import { GET_TRANSACTION, GET_TRANSACTION_ERROR } from "../types";
// import AuthService from "../../services/auth.service";

import FetchTransactionServices from "../../services/fetchTransaction";
export const getTransactionDetail = () => async (dispatch) => {
  try {
    const transactioDetail =
      await FetchTransactionServices.getAllTransactions();
    dispatch({
      type: GET_TRANSACTION,
      payload: transactioDetail,
    });
  } catch (error) {
    dispatch({
      type: GET_TRANSACTION_ERROR,
      payload: error,
    });
  }
};
