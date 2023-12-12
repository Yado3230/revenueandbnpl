import { SET_DASHBOARD_CARD_REPORT } from "../types";

const initialState = {
  dashboardCardReport: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_CARD_REPORT:
      return {
        ...state,
        dashboardCardReport: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
