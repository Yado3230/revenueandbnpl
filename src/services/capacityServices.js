import axios from "axios";

const getCalculatedBorrowingCapacity = async (
  payoffMonth,
  cohortId,
  data,
  revenueShareType
) => {
  return await axios
    .post("http://10.1.177.121:9181/api/v1/borrowing-capacities", {
      payOffMonth: payoffMonth,
      cohortId,
      data,
      revenueShareType,
    })
    .then((response) => response.data);
};

const generateAgreementDoc = async (
  payoffMonth,
  cohortId,
  data,
  revenueShareType
) => {
  return await axios
    .post("http://10.1.177.121:9181/api/v1/borrowing-capacities", {
      payOffMonth: payoffMonth,
      cohortId,
      data,
      revenueShareType,
    })
    .then((response) => response.data);
};
  
const applyForLoan = async (payoffMonth, cohortId, data, revenueShareType) => {
  return await axios
    .post("http://10.1.177.121:9181/api/v1/borrowing-capacities", {
      payOffMonth: payoffMonth,
      cohortId,
      data,
      revenueShareType,
    })
    .then((response) => response.data);
};

const CapacityService = {
  getCalculatedBorrowingCapacity,
  generateAgreementDoc,
  applyForLoan,
};

export default CapacityService;
