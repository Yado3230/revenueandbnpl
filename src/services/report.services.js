import { NODE_API } from "../utils/API";

// const getAllDashboardCardDetail = async (startTimestamp, endTimestamp) => {
//   return await NODE_API.get(
//     `/reporting/calculate/merchantReport?startTimestamp=2023-01-01&endTimestamp=2023-12-31`
//   ).then((response) => response.data);
// };

const getAllDashboardCardDetail = async (fromDate, toDate, merchant_id) => {
  const apiUrl = new URL(
    "/reporting/calculate/merchantReportByAdmin",
    window.location.origin
  ); // Assuming you are running this in a browser

  if (fromDate) {
    apiUrl.searchParams.append("startTimestamp", fromDate);
  }

  if (toDate) {
    apiUrl.searchParams.append("endTimestamp", toDate);
  }

  if (merchant_id) {
    apiUrl.searchParams.append("merchantId", merchant_id);
  }

  console.log(apiUrl.pathname + apiUrl.search);
  return await NODE_API.get(apiUrl.pathname + apiUrl.search).then(
    (response) => response.data
  );
};

const getAllYearlyRevenueandProfit = async (year, merchant_id) => {
  const apiUrl = new URL(
    "/reporting/calculate/yearlyMerchantReport",
    window.location.origin
  ); // Assuming you are running this in a browser

  if (year) {
    apiUrl.searchParams.append("year", year);
  }

  if (merchant_id) {
    apiUrl.searchParams.append("merchant_id", merchant_id);
  }

  console.log(apiUrl.pathname + apiUrl.search);
  return await NODE_API.get(apiUrl.pathname + apiUrl.search).then(
    (response) => response.data
  );
};

const getAllCurrentAndPreviousMonthReport = async (merchant_id) => {
  const apiUrl = new URL(
    "/reporting/calculate/monthlyReport",
    window.location.origin
  ); // Assuming you are running this in a browser

  if (merchant_id) {
    apiUrl.searchParams.append("merchant_id", merchant_id);
  }

  console.log(apiUrl.pathname + apiUrl.search);
  return await NODE_API.get(apiUrl.pathname + apiUrl.search).then(
    (response) => response.data
  );
};

const ReportService = {
  getAllDashboardCardDetail,
  getAllYearlyRevenueandProfit,
  getAllCurrentAndPreviousMonthReport,
};

export default ReportService;
