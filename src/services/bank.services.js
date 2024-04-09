import axios from "axios";
import authHeader from "./auth-header";
import { NODE_API } from "../utils/API";


const addBank = async (bankName, bankCode) => {
  return await NODE_API.post(
    "/createbank",
    {
      bankName,
      bankCode,
    },
    { withCredentials: true, credentials: "include" }
    // { headers: authHeader() }
  )
    .then((response) => {
      return [response.data, response.status];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
      s;
    });
};
const addPaymentService = async (serviceName) => {
  return await NODE_API.post(
    "/createPaymentServices",
    {
      serviceName,
    },
    { withCredentials: true, credentials: "include" }
    // { headers: authHeader() }
  )
    .then((response) => {
      return [response.data, response.status];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};
const updatePaymentService = async (serviceName) => {
  return await NODE_API.put(
    "/updatePaymentService",
    {
      serviceName: serviceName,
    }
    // { headers: authHeader() }
  )
    .then((response) => {
      return [response.data, response.status];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};

const getBank = async () => {
  return await NODE_API.get("/getbank").then((response) => {
    return response.data.bankDetail;
  });
};
const getService = async () => {
  return await NODE_API.get("/getPaymentService").then((response) => {
    return response.data;
  });
};
const BankServices = {
  addBank,
  getBank,
  getService,
  addPaymentService,
  updatePaymentService,
};

export default BankServices;
