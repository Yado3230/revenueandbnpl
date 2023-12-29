import { NODE_API } from "../utils/API";

// const getAllDashboardCardDetail = async (startTimestamp, endTimestamp) => {
//   return await NODE_API.get(
//     `/reporting/calculate/merchantReport?startTimestamp=2023-01-01&endTimestamp=2023-12-31`
//   ).then((response) => response.data);
// };

const getAllDashboardCardDetail = async (startTimestamp, endTimestamp) => {
  const apiUrl = `/reporting/calculate/merchantReport`;

  // Check if startTimestamp is provided, and append it to the API URL if it exists
  if (startTimestamp) {
    apiUrl += `?startTimestamp=${startTimestamp}`;
  }

  // Check if endTimestamp is provided, and append it to the API URL if it exists
  if (endTimestamp) {
    // Use "&" if startTimestamp is also provided
    apiUrl += startTimestamp
      ? `&endTimestamp=${endTimestamp}`
      : `?endTimestamp=${endTimestamp}`;
  }

  // Make the API call using the constructed URL
  return await NODE_API.get(apiUrl).then((response) => response.data);
};

const ReportService = {
  getAllDashboardCardDetail,
};

export default ReportService;
