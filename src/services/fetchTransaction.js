import axios from "axios";
import { NODE_API } from "../utils/API";

const getAllTransactions = async () => {
  return await NODE_API.get("transaction/fetchAllTransaction").then(
    (response) => response.data
  );
};
const getPaypalTransactionById = async (id) => {
  return await NODE_API.get(
    `transaction/paypalTransaction?merchant_id=${id}`
  ).then((response) => response.data);
};
const getPaypalTransactions = async () => {
  return await NODE_API.get(`transaction/allpaypalTransaction`).then(
    (response) => response.data
  );
};
const getStripeandBankTransactionById = async (id, url) => {
  return await NODE_API.get(`${url}?merchant_id=${id}`).then(
    (response) => response.data
  );
};

const getStripeandBankTransaction = async (id, url) => {
  return await NODE_API.get(`${url}`).then((response) => response.data);
};
const getEbirrTransactionsById = async (id) => {
  return await NODE_API.get(
    `transaction/ebirrTransactionById?merchant_id=${id}`
  ).then((response) => response.data);
};
const getEbirrTransactions = async (id) => {
  return await NODE_API.get(`transaction/allEbirrTransactions`).then(
    (response) => response.data
  );
};

// const getTransactionByTransactionId = async (clientId) => {
//   return await axios
//     .post(adminTransactionFetchUrl + "fetchByTransactionid", {
//       clientId,
//     })
//     .then((response) => {
//       return response.data;
//     });
// };

const getChappaTransactionsById = async (id) => {
  return await NODE_API.get(
    `transaction/chappaTransactionById?merchant_id=${id}`
  ).then((response) => response.data);
};
const getChappaTransactions = async (id) => {
  return await NODE_API.get(`transaction/allChappaTransactions`).then(
    (response) => response.data
  );
};

const FetchTransactionServices = {
  getPaypalTransactionById,
  getAllTransactions,
  // getTransactionByTransactionId,
  getStripeandBankTransactionById,
  getEbirrTransactionsById,
  getPaypalTransactions,
  getStripeandBankTransaction,
  getEbirrTransactions,
  getChappaTransactions,
  getChappaTransactionsById,
};

export default FetchTransactionServices;
