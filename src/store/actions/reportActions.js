import {
  SET_DASHBOARD_CARD_REPORT,
  YEARLY_REVENUE_AND_PROFT,
  PREVIOUS_AND_CURRENT_MONTH,
  SET_SOLD_ITEMS,
  SET_ON_STOCK_ITEMS,
  SET_MODIFIED_REPORT,
} from "../types";
// import AuthService from "../../services/auth.service";

import ReportService from "../../services/report.services";
export const getDashboardCardDetail =
  (fromDate, toDate, userID) => async (dispatch) => {
    try {
      const dashboardCardDetails =
        await ReportService.getAllDashboardCardDetail(fromDate, toDate, userID);
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

export const getAllSoldItems = (merchant_id) => async (dispatch) => {
  try {
    const dashboardCardDetails = await ReportService.getSoldItems(merchant_id);
    dispatch({
      type: SET_SOLD_ITEMS,
      payload: dashboardCardDetails,
    });
  } catch (error) {
    return error;
  }
};
export const getOnStockItems = (merchant_id) => async (dispatch) => {
  try {
    const dashboardCardDetails = await ReportService.getAllOnStockItems(
      merchant_id
    );
    dispatch({
      type: SET_ON_STOCK_ITEMS,
      payload: dashboardCardDetails,
    });
  } catch (error) {
    return error;
  }
};

export const getModifiedReports =
  (
    merchant_id,
    startTimestamp,
    endTimestamp,
    timestamp,
    total,
    expense,
    cost
  ) =>
  async (dispatch) => {
    try {
      const dashboardCardDetails = await ReportService.getAllModifiedReports(
        merchant_id,
        startTimestamp,
        endTimestamp,
        timestamp,
        total,
        expense,
        cost
      );
      dispatch({
        type: SET_MODIFIED_REPORT,
        payload: dashboardCardDetails,
      });
    } catch (error) {
      return error;
    }
  };
