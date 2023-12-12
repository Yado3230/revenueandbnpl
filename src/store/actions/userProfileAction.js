import {
  CREATE_USER_PROFILE,
  CREATE_USER_PROFILE_ERROR,
  SET_USER_NAME,
  SET_USER_ID,
  SET_TOKEN,
  LOADING,
  GET_EKY_DETAIL,
  GET_EKY_DETAIL_ERROR,
  SET_ROLE,
  LOG_OUT,
} from "../types";
// import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
export const CreateOrUpdate = (formData) => async (dispatch) => {
  try {
    const createdOrUpdated = await UserService.CreateUserProfile(formData);
    dispatch({
      type: CREATE_USER_PROFILE,
      payload: createdOrUpdated,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_PROFILE_ERROR,
      payload: error,
    });
  }
};

export const getEkyInfo = (user) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const ekyDetail = await UserService.getEkyDetail(user);
    dispatch({
      type: GET_EKY_DETAIL,
      payload: ekyDetail,
    });
  } catch (error) {
    dispatch({
      type: GET_EKY_DETAIL_ERROR,
      payload: false,
    });
  }
};

export const setUserID = (item) => ({
  type: SET_USER_ID,
  payload: item,
});

export const setUsername = (item) => ({
  type: SET_USER_NAME,
  payload: item,
});
export const setToken = (item) => ({
  type: SET_TOKEN,
  payload: item,
});
export const setRole = (item) => ({
  type: SET_ROLE,
  payload: item,
});
export const setlogOut = (item) => ({
  type: LOG_OUT,
});
