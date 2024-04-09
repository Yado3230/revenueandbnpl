import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Bankpay from "./Bankpay";
import Cardpay from "./Cardpay";
import Mobilepay from "./Mobilepay";
import PayPal from "./PayPal";
import PaymentServices from "../services/payment.service";
import Stripe from "./Stripe";
import { useSearchParams } from "react-router-dom";
import logo from "./../assets/images/logo.png";

function Gateway() {
  const [select, setSelect] = useState("");
  const [currency, setCurrency] = useState("");
  const [paymentService, setPaymentService] = useState("");
  const [amount, setAmount] = useState();
  const [orderID, setOrderId] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [returnUrl, setReturnUrl] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paypalPaymentStatus, setPaypalPaymentStatus] = useState();
  const location = useLocation();
  const path = location.pathname;
  const data = path.substring(path.lastIndexOf("gateway/") + 8);
  const encodedUri = encodeURIComponent(data);
  useEffect(() => {
    PaymentServices.getPendingPaymentInfo(encodedUri)
      .then((res) => {
        setCurrency(res[1].currency);
        setAmount(res[1].amount);
        setOrderId(res[1].orderID);
        setPhoneNumber(res[1].phoneNumber);
        setReturnUrl(res[1].returnUrl);
        setPaymentService(res[1].paymentServices);
        setPaypalPaymentStatus(res[1].status);
      })
      .catch((error) => {
        return error;
      });
    if (paymentService == "CBOA") {
      setSelect("CBOA");
    } else if (paymentService == "stripe") {
      setSelect("stripe");
    } else if (paymentService == "paypal") {
      setSelect("paypal");
    } else if (paymentService == "coopass") {
      setSelect("CBOA");
    } else if (paymentService == "ebirr") {
      setSelect("ebirr");
    }
  }, [currency, paymentService]);
  return (
    <div>
      <section className="bg-gray-100 testdark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow testdark:border md:mt-0 sm:max-w-md xl:p-0 testdark:bg-gray-800 testdark:border-gray-700">
            <div className="flex flex-1 p-2 bg-gray-50 shadow">
              <img
                width={120}
                className=""
                src={logo}
                alt="front credit card"
              />
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="grid grid-cols-2">
                <h1 className="leading-tight mt-2 text-lg tracking-tight text-gray-900 testdark:text-white">
                  Choose payment
                </h1>
                {/* <div className="w-full col-span-2"> */}
                <h1 className="mt-2 text-lg font-bold text-center testdark:text-white">
                  {amount} {currency}
                </h1>
                {/* </div> */}
              </div>

              <div className="">
                <select
                  onChange={(e) => {
                    setSelect(e.target.value);
                  }}
                  className="my-6 select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
                >
                  {currency === "ETB" ? (
                    <option
                      value={"CBOA"}
                      hidden={paymentService === "CBOC"}
                      disabled={paymentService === "CBOC"}
                      selected={paymentService === "coopass"}
                    >
                      Coopass
                    </option>
                  ) : (
                    ""
                  )}
                  {currency === "ETB" ? (
                    <option
                      value={"CBOC"}
                      hidden={paymentService === "coopass"}
                      disabled={paymentService === "coopass"}
                      selected={paymentService === "CBOC"}
                    >
                      Cooperative bank of Oromia Card {paymentService}
                    </option>
                  ) : (
                    ""
                  )}
                  {/* {currency === "ETB" ? (
                    <option value={"EB"}>E-birr</option>
                  ) : (
                    ""
                  )} */}
                  {currency === "USD" ? (
                    <option
                      value={"stripe"}
                      hidden={paymentService === "paypal"}
                      disabled={paymentService === "paypal"}
                      selected={paymentService === "stripe"}
                    >
                      Stripe
                    </option>
                  ) : (
                    ""
                  )}
                  {currency === "USD" && (
                    <>
                      <option
                        value={"paypal"}
                        hidden={paymentService === "stripe"}
                        disabled={paymentService === "stripe"}
                        selected={paymentService === "paypal"}
                      >
                        payPal
                      </option>
                      {/* <option value={"payPal"}>payPal</option> */}
                    </>
                  )}

                  {/* <option value={"payPal"}>payPal</option> */}
                </select>
              </div>

              <htmlForm className="space-y-4 md:space-y-6" action="">
                {currency === "ETB"
                  ? select === "CBOA" && (
                      <Bankpay
                        amount={amount}
                        data={data}
                        paymentId={data}
                        phoneNumber={phoneNumber}
                      />
                    )
                  : ""}
                {currency === "ETB"
                  ? select === "CBOC" && <Cardpay amount={amount} />
                  : ""}
                {currency === "ETB" ? select === "EB" && <Mobilepay /> : ""}
                {currency === "USD" && select === "paypal" && (
                  <PayPal
                    amount={amount}
                    paymentId={encodedUri}
                    orderId={orderID}
                    status={paypalPaymentStatus}
                  />
                )}
                {currency === "USD" && select === "stripe" && (
                  <Stripe
                    amount={amount}
                    orderId={orderID}
                    paymentId={encodedUri}
                    returnUrl={returnUrl}
                  />
                )}
              </htmlForm>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gateway;
