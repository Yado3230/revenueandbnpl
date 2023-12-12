import {
  COOPASS_TRANSACTION,
  GET_ADMIN_TRANSACTION_ALL,
  GET_ADMIN_TRANSACTION_ALL_ERROR,
  GET_BANK_AND_STRIPE_TRANSACTION,
  GET_CHAPPA_TRANSACTION,
  GET_EBIRR_TRANSACTION,
  GET_PAYPAL_TRANSACTION,
  GET_TRANSACTION_BY_TRANSACTION_ID,
  GET_TRANSACTION_BY_TRANSACTION_ID_ERROR,
  STRIPE_TRANSACTION,
} from "../types";
// import AuthService from "../../services/auth.service";

import FetchTransactionServices from "../../services/fetchTransaction";
export const getTransactionDetailAll = () => async (dispatch) => {
  try {
    const transactioDetailAll =
      await FetchTransactionServices.getAllTransactions();
    dispatch({
      type: GET_ADMIN_TRANSACTION_ALL,
      payload: transactioDetailAll,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_TRANSACTION_ALL_ERROR,
      payload: error,
    });
  }
};

export const getTransactionByTransactionId =
  (transactionId) => async (dispatch) => {
    try {
      const transactioByTransactionId =
        await FetchTransactionServices.getTransactionByTransactionId(
          transactionId
        );
      dispatch({
        type: GET_TRANSACTION_BY_TRANSACTION_ID,
        payload: transactioByTransactionId,
      });
    } catch (error) {
      dispatch({
        type: GET_TRANSACTION_BY_TRANSACTION_ID_ERROR,
        payload: error,
      });
    }
  };

export const getAllPaypalTransactionById = (id) => async (dispatch) => {
  try {
    const paypalTransactions =
      await FetchTransactionServices.getPaypalTransactionById(id);
    dispatch({
      type: GET_PAYPAL_TRANSACTION,
      payload: paypalTransactions,
    });
  } catch (error) {
    return error;
  }
};
export const getAllPaypalTransactions = (id) => async (dispatch) => {
  try {
    const paypalTransactions =
      await FetchTransactionServices.getPaypalTransactions(id);
    dispatch({
      type: GET_PAYPAL_TRANSACTION,
      payload: paypalTransactions,
    });
  } catch (error) {
    return error;
  }
};

export const getStripePaymentById = (id) => async (dispatch) => {
  try {
    const url = "stripetransaction";
    const bankAndStripeTransaction =
      await FetchTransactionServices.getStripeandBankTransactionById(id, url);
    dispatch({
      type: STRIPE_TRANSACTION,
      payload: bankAndStripeTransaction,
    });
  } catch (error) {
    return error;
  }
};

export const getCoopassPaymentById = (id) => async (dispatch) => {
  try {
    const url = "coopasstransaction";
    const bankAndStripeTransaction =
      await FetchTransactionServices.getStripeandBankTransactionById(id, url);
    dispatch({
      type: COOPASS_TRANSACTION,
      payload: bankAndStripeTransaction,
    });
  } catch (error) {
    return error;
  }
};

export const getCoopassPayment = (id) => async (dispatch) => {
  try {
    const url = "allcoopasstransactions";
    const coopassTransaction =
      await FetchTransactionServices.getStripeandBankTransaction(id, url);
    dispatch({
      type: COOPASS_TRANSACTION,
      payload: coopassTransaction,
    });
  } catch (error) {
    return error;
  }
};
export const getStripePayment = (id) => async (dispatch) => {
  try {
    const url = "allstripetransaction";
    const stripeTransaction =
      await FetchTransactionServices.getStripeandBankTransaction(id, url);
    dispatch({
      type: STRIPE_TRANSACTION,
      payload: stripeTransaction,
    });
  } catch (error) {
    return error;
  }
};

export const getEbirrTransactionById = (id) => async (dispatch) => {
  try {
    const ebirrTransaction =
      await FetchTransactionServices.getEbirrTransactionsById(id);
    dispatch({
      type: GET_EBIRR_TRANSACTION,
      payload: ebirrTransaction,
    });
  } catch (error) {
    return error;
  }
};
export const getEbirrTransaction = (id) => async (dispatch) => {
  try {
    const ebirrTransaction =
      await FetchTransactionServices.getEbirrTransactions(id);
    dispatch({
      type: GET_EBIRR_TRANSACTION,
      payload: ebirrTransaction,
    });
  } catch (error) {
    return error;
  }
};

export const getChappaTransactionById = (id) => async (dispatch) => {
  try {
    const ebirrTransaction =
      await FetchTransactionServices.getChappaTransactionsById(id);
    dispatch({
      type: GET_CHAPPA_TRANSACTION,
      payload: ebirrTransaction,
    });
  } catch (error) {
    return error;
  }
};
export const getChappaTransactions = (id) => async (dispatch) => {
  try {
    const ebirrTransaction =
      await FetchTransactionServices.getChappaTransactions(id);
    dispatch({
      type: GET_CHAPPA_TRANSACTION,
      payload: ebirrTransaction,
    });
  } catch (error) {
    return error;
  }
};
