import axios from "axios";
import { NODE_API } from "../utils/API";
const API_URL = "";

const getAllPendingBussiness = async () => {
  return await axios
    .get(API_URL + "api/test/bussinessRequest")
    .then((response) => {
      return response.data.bussinessDetail;
    });
};

const approvePendingBussinessById = async (id) => {
  try {
    const response = await axios.patch(
      API_URL + "api/test/bussinessRequest/:id",
      { id },
      { withCredentials: true, credentials: "include" }
    );
    return [response.data, response.status];
  } catch (err) {
    if (err.response) {
    } else if (err.request) {
      return err.request;
    }
  }
};

const headers = {
  "Content-Type": "multipart/form-data",
};
const BussinessInfoRequest = async (formData) => {
  return await axios
    .post(API_URL + "api/user/vrf", formData, headers)
    .then((response) => {
      return [response.data, response.status];
    });
};

const CreateUserProfile = async (formData) => {
  return await axios
    .post(API_URL + "api/user/updateProfile", formData, headers)
    .then((response) => response.data);
};

const CreateBankAccount = async (
  accountHolderName,
  accountNumber,
  bankName,
  userId
) => {
  return await axios
    .post(API_URL + "api/banckAccount/create", {
      accountHolderName,
      accountNumber,
      bankName,
      userId,
    })
    .then((response) => response.data);
};

const CreateSales = async (
  username,
  firstName,
  lastName,
  merchant_id,
  setUpdated,
  updated
) => {
  return await NODE_API.post("/sales/register", {
    username,
    firstName,
    lastName,
    merchant_id,
  }).then((response) => {
    setUpdated(!updated);
    return response;
  });
};

const getAllSales = async (merchant_id) => {
  return await NODE_API.get(`/sales/getAll?id=${merchant_id}`).then(
    (response) => response.data
  );
};
const getEkyDetail = async (merchant_id) => {
  return await NODE_API.get(`/eky/getKyc?merchant_id=${merchant_id}`).then(
    (response) => response.data
  );
};

const getSalesKycDetail = async (merchant_id) => {
  return await NODE_API.get(`/sales/getAllKyc?merchant_id=${merchant_id}`).then(
    (response) => response.data
  );
};
const getAllSalesReports = async () => {
  return await NODE_API.get(`/sales/reports`).then((response) => response.data);
};
const getAllSalesPayments = async () => {
  return await NODE_API.get(`/sales/payments`).then(
    (response) => response.data
  );
};

const approveSales = async (sales_kyc_id, merchant_id, setUpdated, updated) => {
  return await NODE_API.put(`/sales/approveKyc`, {
    sales_kyc_id,
    merchant_id,
  }).then((response) => {
    setUpdated(updated);
    return response.data;
  });
};
const rejectSales = async (sales_kyc_id, merchant_id, setUpdated, updated) => {
  return await NODE_API.put(`/sales/rejectKyc`, {
    sales_kyc_id,
    merchant_id,
  }).then((response) => {
    setUpdated(updated);
    return response.data;
  });
};

const UserService = {
  BussinessInfoRequest,
  getAllPendingBussiness,
  approvePendingBussinessById,
  CreateBankAccount,
  CreateUserProfile,
  CreateSales,
  getAllSales,
  getEkyDetail,
  getSalesKycDetail,
  approveSales,
  rejectSales,
  getAllSalesReports,
  getAllSalesPayments,
};

export default UserService;
