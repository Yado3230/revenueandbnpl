import { GET_SALES_KYC, SET_SALES } from "../types";
// import AuthService from "../../services/auth.service";

import UserService from "../../services/user.service";
export const getSalesDetail = (userID) => async (dispatch) => {
  try {
    const salesDetail = await UserService.getAllSales(userID);
    dispatch({
      type: SET_SALES,
      payload: salesDetail,
    });
  } catch (error) {
    return error;
  }
};

export const getSalesKyc = (userID) => async (dispatch) => {
  try {
    const salesDetail = await UserService.getSalesKycDetail(userID);
    dispatch({
      type: GET_SALES_KYC,
      payload: salesDetail,
    });
  } catch (error) {
    return error;
  }
};
