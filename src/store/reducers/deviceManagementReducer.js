import {
  GET_ADMIN_ALL_DEVICES,
  GET_ADMIN_ALL_DEVICES_ERROR,
  // REGISTER_DEVICES,
  // REGISTER_DEVICES_ERROR,
} from "../types";

const initialState = {
  deviceDetail: [],
  loading: true,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN_ALL_DEVICES:
      return {
        ...state,
        deviceDetail: action.payload,
        loading: false,
      };
    case GET_ADMIN_ALL_DEVICES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
