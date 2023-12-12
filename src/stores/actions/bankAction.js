import {
  ADD_BANK,
  ADD_BANK_ERROR,
  GET_BANK,
  GET_BANK_ERROR,
  SUCCESS_RESPONSE_SETTER,
  ERROR_RESPONSE_SETTER,
  GET_PAYMENT_SERVICE,
} from "../types";
import AuthService from "../../services/auth.service";
import BankServices from "../../services/bank.services";
// import BankAccountServices from "../../services/bank-account.services";
export const addBank =
  ({ bankName, bankCode, interpretResponse }) =>
  async (dispatch) => {
    try {
      const addedBank = await BankServices.addBank(bankName, bankCode);
      if (addedBank[1] == "201") {
        interpretResponse({
          message: addedBank[0].message,
          response: "error",
          responseCode: addedBank[1],
        });
      } else if (addedBank[1] == "403") {
        interpretResponse({
          message: addedBank[0].message,
          response: "error",
          responseCode: addedBank[1],
        });
      } else {
        // dispatch(satResponse("error"));
        interpretResponse({ response: "error" });
      }

      dispatch(gateBanks());
      dispatch({
        type: ADD_BANK,
        payload: addedBank[0],
      });
    } catch (error) {
      dispatch({
        type: ADD_BANK_ERROR,
        payload: error,
      });
    }
  };

export const addPaymentService =
  ({ serviceName, interpretResponse }) =>
  async (dispatch) => {
    try {
      const addedBank = await BankServices.addPaymentService(serviceName);
      if (addedBank[1] == "201") {
        interpretResponse({
          message: addedBank[0].message,
          response: "error",
          responseCode: addedBank[1],
        });
      } else if (addedBank[1] == "403") {
        interpretResponse({
          message: addedBank[0].message,
          response: "error",
          responseCode: addedBank[1],
        });
      } else {
        // dispatch(satResponse("error"));
        interpretResponse({ response: "error" });
      }

      dispatch(getPaymentService());
      dispatch({
        type: ADD_BANK,
        payload: addedBank[0],
      });
    } catch (error) {
      return error;
    }
  };
export const updatePaymentService =
  (serviceName, interpretResponse) => async (dispatch) => {
    try {
      const addedBank = await BankServices.updatePaymentService(serviceName);
      const getBank = await BankServices.getService();
      dispatch({
        type: GET_PAYMENT_SERVICE,
        payload: getBank,
      });
    } catch (error) {
      return error;
    }
  };

export const gateBanks = () => async (dispatch) => {
  try {
    const getBank = await BankServices.getBank();
    dispatch({
      type: GET_BANK,
      payload: getBank,
    });
  } catch (error) {
    return error;
  }
};
export const getPaymentService = () => async (dispatch) => {
  try {
    const getBank = await BankServices.getService();
    dispatch({
      type: GET_PAYMENT_SERVICE,
      payload: getBank,
    });
  } catch (error) {
    return error;
  }
};
