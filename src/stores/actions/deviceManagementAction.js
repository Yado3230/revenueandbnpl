import { GET_ADMIN_ALL_DEVICES, GET_ADMIN_ALL_DEVICES_ERROR } from "../types";
// import AuthService from "../../services/auth.service";

import RegisteredDeviceServices from "../../services/allowedDevices.services";
export const getAllRegisterdDevices = (id) => async (dispatch) => {
  try {
    const allDevices = await RegisteredDeviceServices.getAllRegisteredDevices(
      id
    );
    dispatch({
      type: GET_ADMIN_ALL_DEVICES,
      payload: allDevices,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_ALL_DEVICES_ERROR,
      payload: error,
    });
  }
};

export const getAllRegDevices = () => async (dispatch) => {
  try {
    const allDevices = await RegisteredDeviceServices.getAllDevices();
    dispatch({
      type: GET_ADMIN_ALL_DEVICES,
      payload: allDevices,
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_ALL_DEVICES_ERROR,
      payload: error,
    });
  }
};
