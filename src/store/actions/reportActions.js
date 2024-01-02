import {
  SET_DASHBOARD_CARD_REPORT,
  YEARLY_REVENUE_AND_PROFT,
  PREVIOUS_AND_CURRENT_MONTH,
} from "../types";
// import AuthService from "../../services/auth.service";

import ReportService from "../../services/report.services";
export const getDashboardCardDetail =
  (fromDate, toDate) => async (dispatch) => {
    try {
      const dashboardCardDetails =
        await ReportService.getAllDashboardCardDetail(fromDate, toDate);
      dispatch({
        type: SET_DASHBOARD_CARD_REPORT,
        payload: dashboardCardDetails,
      });
    } catch (error) {
      return error;
    }
  };

export const getYearlyRevenueandProfit =
  (year, merchant_id) => async (dispatch) => {
    console.log(year, merchant_id);
    try {
      const dashboardCardDetails =
        await ReportService.getAllYearlyRevenueandProfit(year, merchant_id);
      dispatch({
        type: YEARLY_REVENUE_AND_PROFT,
        payload: dashboardCardDetails,
      });
    } catch (error) {
      return error;
    }
  };

export const getCurrentAndPreviousMonthReport =
  (merchant_id) => async (dispatch) => {
    try {
      const dashboardCardDetails =
        await ReportService.getAllCurrentAndPreviousMonthReport(merchant_id);
      dispatch({
        type: PREVIOUS_AND_CURRENT_MONTH,
        payload: dashboardCardDetails,
      });
    } catch (error) {
      return error;
    }
  };
