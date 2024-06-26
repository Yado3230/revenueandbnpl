import axios from "axios";
import { SPRING_API } from "../utils/API";

const getCalculatedBorrowingCapacity = async (
  payoffMonth,
  cohortId,
  data,
  revenueShareType,
  setLoadingCalculatedData
) => {
  return await SPRING_API.post("/v1/loans/calculate-borrow-capacity", {
    payOffMonth: payoffMonth,
    cohortId,
    data,
    revenueShareType,
  })
    .then((response) => response.data)
    .finally(() => setLoadingCalculatedData(false));
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
  repaymentMonth,
  totalRepayment,
  loanAmount
) => {
  return await SPRING_API.post("/v1/loans/contract", {
    name,
    address,
    woreda,
    kebele,
    houseNumber,
    phoneNumber,
    idNumber,
    business,
    repaymentMonth,
    totalRepayment,
    loanAmount,
  }).then((response) => response.data);
};

const applyForLoan = async (
  merchantId,
  appliedAmount,
  totalRepayment,
  payOffMonth,
  agrement,
  revenueShareDriver
) => {
  return await SPRING_API.post("/v1/loans/apply", {
    merchantId,
    appliedAmount,
    totalRepayment,
    payOffMonth,
    agreementFile: agrement,
    revenueShareType: "variable",
    cohortId: "2",
    revenueShareDriver: revenueShareDriver,
  }).then((response) => response.data);
};

const getCustomerLoanRequest = async (merchant_id) => {
  return await SPRING_API.get(`/v1/loans/merchant/${merchant_id}`).then(
    (response) => response.data
  );
};

const getMerchantRepaymentSchedule = async (loanId) => {
  return await SPRING_API.get(
    `/v1/loans/repayment-schedules?loanId=${loanId}`
  ).then((response) => response.data);
};

const acceptLoan = async (newData, updated, setUpdated) => {
  return await SPRING_API.post("/v1/loans/merchant-acceptance", newData).then(
    (response) => {
      setUpdated(!updated);
      window.location.reload();
      return response.data;
    }
  );
};

const getCapTable = async () => {
  return await SPRING_API.get(`/v1/payoff-months/cohort/2`).then(
    (response) => response.data
  );
};

const CapacityService = {
  getCalculatedBorrowingCapacity,
  generateAgreementDoc,
  applyForLoan,
  getCustomerLoanRequest,
  getCapTable,
  getMerchantRepaymentSchedule,
  acceptLoan,
};

export default CapacityService;
