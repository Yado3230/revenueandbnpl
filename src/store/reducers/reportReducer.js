import {
  PREVIOUS_AND_CURRENT_MONTH,
  SET_DASHBOARD_CARD_REPORT,
  SET_MODIFIED_REPORT,
  SET_ON_STOCK_ITEMS,
  SET_SOLD_ITEMS,
  YEARLY_REVENUE_AND_PROFT,
} from "../types";

const initialState = {
  dashboardCardReport: {},
  yearlyRevenueandprofit: {},
  previousAndCurrentMonth: {},
  soldItems: [],
  onStockItems: [],
  modifiedReports: [],
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
    case SET_SOLD_ITEMS:
      return {
        ...state,
        soldItems: action.payload,
        loading: false,
      };
    case SET_ON_STOCK_ITEMS:
      return {
        ...state,
        onStockItems: action.payload,
        loading: false,
      };
    case SET_MODIFIED_REPORT:
      return {
        ...state,
        modifiedReports: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
