import {
  GET_ACCOUNTS,
  ACCOUNTS_ERROR,
  CREATE_BAK_ACCOUNT,
  SET_PRIMARY,
  NAME_ENQ_BY_ACCNO,
  NAME_ENQ_BY_ACCNO_ERROR,
  GET_ACCOUNTS_BY_PHONE,
  GET_ACCOUNTS_BY_PHONE_ERROR,
  SET_OTP,
} from "../types";
import AuthService from "../../services/auth.service";
import BankAccountServices from "../../services/bank-account.services";
export const getAccounts = (user_id) => async (dispatch) => {
  try {
    const bankAccountByID = await BankAccountServices.getBankAccountById(
      user_id
    );
    dispatch({
      type: GET_ACCOUNTS,
      payload: bankAccountByID,
    });
  } catch (error) {
    dispatch({
      type: ACCOUNTS_ERROR,
      payload: error,
    });
  }
};

export const nameEnquiryByAccountNumber =
  (criteriaValue) => async (dispatch) => {
    try {
      const nameResponse = await BankAccountServices.nameEnquiryByAccountNumber(
        criteriaValue
      );
      dispatch({
        type: NAME_ENQ_BY_ACCNO,
        payload: nameResponse,
      });
    } catch (error) {
      dispatch({
        type: NAME_ENQ_BY_ACCNO_ERROR,
        payload: error,
      });
    }
  };

export const setPrimaryAccount =
  ({ merchant_id, value, interpretResponse }) =>
  async (dispatch) => {
    try {
      const setPrimaryAccount = await BankAccountServices.setPrimaryAccount(
        merchant_id,
        value
      );
      if (setPrimaryAccount[1] == "201") {
        interpretResponse({
          message: "Updated",
          response: "success",
          responseCode: setPrimaryAccount[1],
        });
      } else if (setPrimaryAccount[1] == "403") {
        interpretResponse({
          message: "Not Updated",
          response: "error",
          responseCode: setPrimaryAccount[1],
        });
      } else {
        // dispatch(satResponse("error"));
        interpretResponse({ response: "error" });
      }
      dispatch(getAccounts(merchant_id));
      dispatch({
        type: SET_PRIMARY,
        payload: setPrimaryAccount,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNTS_ERROR,
        payload: error,
      });
    }
  };

export const createTutorial =
  ({
    current,
    accountNumber,
    bankName,
    merchant_id,
    phone_number,
    interpretResponse,
  }) =>
  async (dispatch) => {
    try {
      const res = await BankAccountServices.CreateBankAccount(
        current,
        accountNumber,
        bankName,
        merchant_id,
        phone_number
      );
      if (res[1] == "201") {
        interpretResponse({
          message: res[0].message,
          response: "success",
          responseCode: res[1],
        });
      } else if (res[1] == "403") {
        interpretResponse({
          message: res[0].message,
          response: "error",
          responseCode: res[1],
        });
      } else if (res[1] == "409") {
        interpretResponse({
          message: res[0].message,
          response: "error",
          responseCode: res[1],
        });
      } else {
        interpretResponse({ response: "error" });
      }
      dispatch(getAccounts(merchant_id));
      dispatch({
        type: CREATE_BAK_ACCOUNT,
        payload: res,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
export const getAccountByPhone =
  ({ phoneNumber, interpretResponse }) =>
  async (dispatch) => {
    try {
      const res = await BankAccountServices.getBankAccountByPhone(phoneNumber);
      if (res[1] == "200") {
        interpretResponse({
          message: res[0].message,
          response: "success",
          responseCode: res[1],
        });
      } else if (res[1] == "403") {
        interpretResponse({
          message: res[0].message,
          response: "error",
          responseCode: res[1],
        });
      } else {
        // dispatch(satResponse("error"));
        interpretResponse({ response: "error" });
      }
      // dispatch(getAccounts());
      dispatch({
        type: GET_ACCOUNTS_BY_PHONE,
        payload: res,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const setOtp = (item) => ({
  type: SET_OTP,
  payload: item,
});
