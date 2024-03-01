import axios from "axios";

const getCalculatedBorrowingCapacity = async (
  payoffMonth,
  cohortId,
  data,
  revenueShareType,
  setLoadingCalculatedData
) => {
  return await axios
    .post("http://10.1.130.15:9010/api/v1/loans/calculate-borrow-capacity", {
      payOffMonth: payoffMonth,
      cohortId,
      data,
      revenueShareType,
    })
    .then((response) => {
      setLoadingCalculatedData(false);
      return response.data;
    });
};

const generateAgreementDoc = async (
  name,
  address,
  woreda,
  kebele,
  houseNumber,
  phoneNumber,
  idNumber,
  business,
  loanAmount,
  interestRate,
  repaymentMonth
) => {
  return await axios
    .post("http://10.1.130.15:9010/api/v1/loans/contract", {
      name,
      address,
      woreda,
      kebele,
      houseNumber,
      phoneNumber,
      idNumber,
      business,
      loanAmount,
      interestRate,
      repaymentMonth,
    })
    .then((response) => response.data);
};

const applyForLoan = async (
  merchantId,
  appliedAmount,
  totalRepayment,
  payOffMonth
) => {
  return await axios
    .post("http://10.1.130.15:9010/api/v1/loans/apply", {
      merchantId,
      appliedAmount,
      totalRepayment,
      payOffMonth,
    })
    .then((response) => response.data);
};

const getCustomerLoanRequest = async (merchant_id) => {
  return await axios
    .get(`http://10.1.130.15:9010/api/v1/loans/merchant/${merchant_id}`)
    .then((response) => response.data);
};
const getCapTable = async () => {
  return await axios
    .get(`http://10.1.130.15:9010/api/v1/payoff-months/cohort/37`)
    .then((response) => response.data);
};

const CapacityService = {
  getCalculatedBorrowingCapacity,
  generateAgreementDoc,
  applyForLoan,
  getCustomerLoanRequest,
  getCapTable,
};

export default CapacityService;
