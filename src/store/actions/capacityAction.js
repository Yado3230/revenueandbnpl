import CapacityService from "../../services/capacityServices";
import {
  FORCASTED_CAPACITY,
  SET_MERCHANT_LOAN,
  SET_REPAYMENT_SCHEDULE,
  SET_RETURNCAP_TABLE,
} from "../types";

export const getCalculatedCapacity =
  (
    payoffMonth,
    cohortId,
    data,
    revenueShareType,
    currentMonth,
    setLoadingCalculatedData
  ) =>
  async (dispatch) => {
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const currentDate = new Date();
    currentDate.setDate(1); // Set the day to 1 to get the first day of the month

    // Format the date to YYYY-MM-DD
    const formattedDates = currentDate.toISOString().slice(0, 10);

    const formattedData = [];

    for (const key in data) {
      if (data?.hasOwnProperty(key)) {
        const revenue = parseInt(data[key]);
        const [month, year] = key.split("-");
        const formattedDate = `${year}-${months[month]}-01`;
        formattedData.push({ Date: formattedDate, Revenue: revenue });
      }
    }
    formattedData.push({ Date: "2024-02-01", Revenue: currentMonth });

    try {
      const expenseData = await CapacityService.getCalculatedBorrowingCapacity(
        payoffMonth,
        cohortId,
        formattedData,
        revenueShareType,
        setLoadingCalculatedData
      );
      dispatch({
        type: FORCASTED_CAPACITY,
        payload: expenseData,
      });
    } catch (error) {
      return error;
    }
  };

export const getLoanRequests = (merchant_id) => async (dispatch) => {
  try {
    const dashboardCardDetails = await CapacityService.getCustomerLoanRequest(
      merchant_id
    );
    dispatch({
      type: SET_MERCHANT_LOAN,
      payload: dashboardCardDetails,
    });
  } catch (error) {
    return error;
  }
};

export const getRepaymentSchedule = (loanId) => async (dispatch) => {
  try {
    const dashboardCardDetails =
      await CapacityService.getMerchantRepaymentSchedule(loanId);
    dispatch({
      type: SET_REPAYMENT_SCHEDULE,
      payload: dashboardCardDetails,
    });
  } catch (error) {
    return error;
  }
};

export const getReturnCapTables = () => async (dispatch) => {
  try {
    const dashboardCardDetails = await CapacityService.getCapTable();
    dispatch({
      type: SET_RETURNCAP_TABLE,
      payload: dashboardCardDetails,
    });
  } catch (error) {
    return error;
  }
};
