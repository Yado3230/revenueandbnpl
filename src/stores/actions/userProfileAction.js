import {
  CREATE_USER_PROFILE,
  CREATE_USER_PROFILE_ERROR,
  LOGGED_IN_USER_DETAIL,
  LOGGED_IN_USER_DETAIL_ERROR,
  SET_USER_NAME,
  SET_USER_ID,
  SET_TOKEN,
} from "../types";
import AuthService from "../../services/auth.service";
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

export const retrieveLoggedInUser = () => async (dispatch, token) => {
  try {
    const userDetail = await AuthService.getLoggedInUser(token);
    dispatch({
      type: LOGGED_IN_USER_DETAIL,
      payload: userDetail,
    });
  } catch (error) {
    dispatch({
      type: LOGGED_IN_USER_DETAIL_ERROR,
      payload: error,
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
