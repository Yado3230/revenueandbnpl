import ConfigService from "../../services/conf.service";
import { SET_CATEGORY } from "../types";
// import AuthService from "../../services/auth.service";

export const getAllCategoryData = () => async (dispatch) => {
  try {
    const categoryData = await ConfigService.getAllCategory();
    dispatch({
      type: SET_CATEGORY,
      payload: categoryData,
    });
  } catch (error) {
    return error;
  }
};
