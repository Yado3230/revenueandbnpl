import { SET_DASHBOARD_CARD_REPORT } from "../types";
// import AuthService from "../../services/auth.service";

import ReportService from "../../services/report.services";
export const getDashboardCardDetail = () => async (dispatch) => {
  try {
    const dashboardCardDetails =
      await ReportService.getAllDashboardCardDetail();
    dispatch({
      type: SET_DASHBOARD_CARD_REPORT,
      payload: dashboardCardDetails,
    });
  } catch (error) {
    return error;
  }
};
