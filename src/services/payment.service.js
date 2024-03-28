import axios from "axios";
import { NODE_API } from "../utils/API";

const pay = async (accountNumber, paymentId) => {
  return await NODE_API.post("/payment", {
    accountNumber,
    paymentId,
  }).then((response) => {
    const SuccesStatus = response.status;
    const returnUrl = response.data.returnUrl;
    return [SuccesStatus, returnUrl];
  });
};
const StripePayment = async (data) => {
  return await NODE_API.post("/stripe-payment", { data }).then((response) => {
    return response;
  });
};
const verifyStripePayment = async ({ paymentId, data }) => {
  return await NODE_API.post("/verify-stripe-payment", {
    paymentId,
    data,
  }).then((response) => {
    return response;
  });
};


const getPendingPaymentInfo = async (data) => {
  return await NODE_API.get(`/getPaymentStatus`, {
    params: {
      data: data,
    },
  })
    .then((response) => {
      return [response.status, response.data];
    })
    .catch((error) => error);
};

const logPayPalResponse = async (
  paymentId,
  orderId,
  status,
  amountValue,
  currency_code,
  payeeEmail,
  payeeMerchant_id,
  description,
  transactionId,
  create_time,
  update_time,
  payerGiven_name,
  payerSurname,
  payerEmailAddress,
  payer_id,
  payerCountry_code,
  linksHref
) => {
  return await NODE_API.post("/paypal-payment", {
    paymentId,
    orderId,
    status,
    amountValue,
    currency_code,
    payeeEmail,
    payeeMerchant_id,
    description,
    transactionId,
    create_time,
    update_time,
    payerGiven_name,
    payerSurname,
    payerEmailAddress,
    payer_id,
    payerCountry_code,
    linksHref,
  }).then((response) => {
    return response.data;
  });
};

// This function sends the payment response back to the commerce site
const sendPaymentResponse = async (endpoint, paymentData) => {
  try {
    // Replace `https://commerce-site.com/payment-response` with the actual endpoint URL provided by the commerce site
    const response = await axios.post(endpoint, paymentData, {
      headers: {
        "Content-Type": "application/json", // Replace with any additional headers required by the commerce site
      },
    });

    return response;
  } catch (error) {
    console.error("Error sending payment response:", error);

    return error;
  }
};

const PaymentServices = {
  pay,
  // verifyPin,
  logPayPalResponse,
  // checkCredentials,
  getPendingPaymentInfo,
  StripePayment,
  verifyStripePayment,
  sendPaymentResponse,
};

export default PaymentServices;
