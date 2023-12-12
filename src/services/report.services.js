import { NODE_API } from "../utils/API";

const getAllDashboardCardDetail = async () => {
  return await NODE_API.get(`/items/revenue`).then((response) => response.data);
};

const ReportService = {
  getAllDashboardCardDetail,
};

export default ReportService;
