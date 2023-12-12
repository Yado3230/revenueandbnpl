import { NODE_API } from "../utils/API";

const CreateLoanConfig = async (data) => {
  return await NODE_API.post("/loan/create", data).then((response) => response);
};
const EditLoanConfig = async (data) => {
  return await NODE_API.put("/loan/editloanConfig", data).then(
    (response) => response
  );
};

const getLoanConfig = async (merchant_id) => {
  return await NODE_API.get(`/loan/getAll?id=${merchant_id}`).then(
    (response) => response.data
  );
};
const AssignLoanConfig = async (item_id, loan_conf_id, merchant_id) => {
  return await NODE_API.post("/items/configureLoanForItem", {
    item_id,
    loan_conf_id,
    merchant_id,
  }).then((response) => response);
};

const createLoanRequest = async (formData) => {
  return await NODE_API.post("/loanprocess/newLoanRequest", {
    formData,
  }).then((response) => response);
};

const getLoanRequest = async (sales_id) => {
  return await NODE_API.get(
    `/loanprocess/getLoanReq?sales_id=${sales_id}`
  ).then((response) => response?.data?.customer_loan_request);
};

const generateLoanPdf = async (
  sales_id,
  loan_req_id,
  first_name,
  last_name,
  interest_rate,
  duation,
  amount,
  setLoanPdf
) => {
  return await NODE_API.post(`/loanprocess/generateLoanAgreement`, {
    sales_id,
    loan_req_id,
    first_name,
    last_name,
    interest_rate,
    duation,
    amount,
  }).then((response) => {
    setLoanPdf(response.data.data);
    return response.data.data;
  });
};

const LoanConfigService = {
  CreateLoanConfig,
  getLoanConfig,
  AssignLoanConfig,
  EditLoanConfig,
  getLoanRequest,
  createLoanRequest,
  generateLoanPdf,
};

export default LoanConfigService;
