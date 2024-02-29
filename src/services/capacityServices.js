import axios from "axios";

const getCalculatedBorrowingCapacity = async (
  payoffMonth,
  cohortId,
  data,
  revenueShareType
) => {
  return await axios
    .post("http://10.1.177.121:9181/api/v1/loans/calculate-borrow-capacity", {
      payOffMonth: payoffMonth,
      cohortId,
      data,
      revenueShareType,
    })
    .then((response) => response.data);
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
    .post("http://10.1.177.121:9181/api/v1/loans/contract", {
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
    .post("http://10.1.177.121:9181/api/v1/loans/apply", {
      merchantId,
      appliedAmount,
      totalRepayment,
      payOffMonth,
    })
    .then((response) => response.data);
};

const CapacityService = {
  getCalculatedBorrowingCapacity,
  generateAgreementDoc,
  applyForLoan,
};

export default CapacityService;
