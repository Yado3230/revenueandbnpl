import axios from "axios";
import { NODE_API } from "../utils/API";
const SPRING_ENDPOINT = "";
const getBankAccountById = async (id) => {
  return await NODE_API.get(`/eky/account?merchant_id=${id}`).then(
    (response) => response.data.account_number
  );
};

const setPrimaryAccount = async (merchant_id, bank_account_id) => {
  return await NODE_API.patch(`/eky/setPrimaryAccount`, {
    merchant_id,
    bank_account_id,
  })
    .then((response) => [response.data.bankAccounts, response.status])
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};


const confirmOtp = async (mobile, otpValue) => {
  const response = await NODE_API.post("/user/verifyOtp", {
    Mobile: mobile,
    Text: otpValue,
  });
  let data = response.data;
  return data;
};
const nameEnquiryByAccountNumber = async (criteriaValue) => {
  const res = await axios.post(SPRING_ENDPOINT + "customerNameByAccno", {
    criteriaValue,
  });
  let data = res.data.AccountDetailsResponse.name;
  return data;
};
const accountByPhone = async (phoneNumber) => {
  const res = await NODE_API.post("/user/userinfo", { phoneNumber });
  return [res.status, res.data.userInfo.accounts];
};

const CreateBankAccount = async (
  accountHolderName,
  accountNumber,
  bankName,
  merchant_id,
  phone_number
) => {
  return await NODE_API.post("/eky/account", {
    accountHolderName,
    account_number: accountNumber,
    bankName,
    merchant_id,
    phone_number,
  })
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

const BankAccountServices = {
  CreateBankAccount,
  getBankAccountById,
  setPrimaryAccount,
  // sendOtp,
  confirmOtp,
  // activateAccount,
  nameEnquiryByAccountNumber,
  // getBankAccountByPhone,
  accountByPhone,
};

export default BankAccountServices;
