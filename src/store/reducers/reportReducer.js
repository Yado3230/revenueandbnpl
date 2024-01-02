import {
  PREVIOUS_AND_CURRENT_MONTH,
  SET_DASHBOARD_CARD_REPORT,
  YEARLY_REVENUE_AND_PROFT,
} from "../types";

const initialState = {
  dashboardCardReport: {},
  yearlyRevenueandprofit: {},
  previousAndCurrentMonth: {},
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
    case YEARLY_REVENUE_AND_PROFT:
      return {
        ...state,
        yearlyRevenueandprofit: action.payload,
        loading: false,
      };
    case PREVIOUS_AND_CURRENT_MONTH:
      return {
        ...state,
        previousAndCurrentMonth: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
