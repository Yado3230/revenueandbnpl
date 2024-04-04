import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PaymentServices from "../services/payment.service";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Otp from "./Otp";
import BankAccountServices from "../../src/services/bank-account.services";
import queryString from "query-string";
const MySwal = withReactContent(Swal);
function Bankpay(props) {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(0);
  const [phoneNumber, setphoneNumber] = useState("");
  const [primaryAccount, setPrimaryAccount] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const clientid = searchParams.get("secretKey");
  const secretKey = searchParams.get("secretKey");
  const key = searchParams.get("key");
  const amount = searchParams.get("amount");
  const callBackUrl = searchParams.get("callBackUrl");
  useEffect(() => {}, []);
  const validationSchema = Yup.object().shape({
    accountHolder: Yup.string().required("Account Holder Name is required"),
    accountNumber: Yup.string().required("Account Number is required"),
    bankName: Yup.string().required("You Have to select Bank"),
  });

  const PinvalidationSchema = Yup.object().shape({
    // phoneNumber: Yup.string().required("Phone Number is required"),
    pin: Yup.string().required("Pin is required"),
    // bankName: Yup.string().required("You Have to select Bank"),
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("eyeOff");
  const handleToggle = () => {
    if (type === "password") {
      setType("number");
      setIcon("eye");
    } else {
      setType("password");
      setIcon("eyeOff");
    }
  };

  const changeState = () => {
    setVerified(true);
  };
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/epass");
  };
  const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
  `;
  return (
    <>
      {verified === 0 ? (
        <>
          <Formik
            initialValues={{
              phoneNumber: props.phoneNumber,
              pin: "",
              // bankName: "",
            }}
            validationSchema={PinvalidationSchema}
            onSubmit={(values) => {
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
              PaymentServices.verifyPin(props.phoneNumber, values.pin)
                .then((resp) => {
                  // setSuccessful(true);
                  if (resp[0] == "200") {
                    setphoneNumber(props.phoneNumber);
                    setVerified(1);
                    setPrimaryAccount(resp[1].accountNumber);
                  } else {
                    setMessage(resp);
                  }
                })
                .catch((error) => {
                  setMessage(error);
                });
            }}
          >
            {(prop) => (
              <>
                <div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    <div className="w-full col-span-3">
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
                        placeholder="Phone Number"
                        disabled
                        // required=""
                        value={props.phoneNumber}
                        onChange={prop.handleChange}
                      />
                    </div>
                    <div className="w-full col-span-2">
                      <div className="form-control">
                        <div className="input-group">
                          <input
                            type={type}
                            name="pin"
                            value={prop.values.pin}
                            onChange={prop.handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
                            placeholder="••••••"
                          />
                          <button
                            className="btn btn-square btn-primary"
                            onClick={handleToggle}
                          >
                            <svg
                              className="h-8 w-8 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {icon === "eyeOff" ? (
                                <path
                                  strokeLinecap="round"
                                  stroke-linejoin="round"
                                  strokeWidth="2"
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                              ) : (
                                <>
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                  <circle cx="12" cy="12" r="3" />
                                </>
                              )}
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* <input
                        type="text"
                        name="pin"
                        id="pin"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
                        placeholder="Pin"
                        value={props.values.pin}
                        onChange={props.handleChange}
                      /> */}
                    </div>
                  </div>
                </div>
                <span className="text-orange-500">{message}</span>
                <div className="flex items-center">
                  <button
                    // href="/otp"
                    type="submit"
                    // onClick={changeState}
                    onClick={prop.handleSubmit}
                    className="w-full text-white rounded-md swal2-styled bg-primary"
                  >
                    Verify
                  </button>
                  {/* <button
                    className="w-1/2 text-white rounded-md swal2-styled bg-primary"
                    onClick={handleClick}
                  >
                    SignUp
                  </button> */}
                </div>
              </>
            )}
          </Formik>
        </>
      ) : (
        <Formik
          initialValues={{
            debitAccount: "",
          }}
          onSubmit={(val) => {
            setLoadingOtp(true);
            const value = {
              first: "",
              second: "",
              third: "",
              fourth: "",
              fifth: "",
              sixth: "",
            };
            BankAccountServices.sendOtp(props.phoneNumber).then((res) => {
              res.status === "Success" && setLoadingOtp(false);
              return (
                res.status === "Success" &&
                MySwal.fire({
                  title: "",
                  html: (
                    <Otp
                      values={value}
                      onSubmit={(values) => {
                        // resolve(values);
                        const otp =
                          values.first +
                          values.second +
                          values.third +
                          values.fourth +
                          values.fifth +
                          values.sixth;
                        BankAccountServices.confirmOtp(
                          props.phoneNumber,
                          otp
                        ).then((res) => {
                          // dispatch(setPrimaryAccount(e.target.value));
                          res === "ok" &&
                            PaymentServices.pay(
                              primaryAccount,
                              props.paymentId
                            ).then((res) => {
                              res[0] === 201 &&
                                Swal.fire({
                                  icon: "success",
                                  title: "Successfully Paid",
                                  showConfirmButton: false,
                                  timer: 2000,
                                });
                              setInterval(() => {
                                navigate(res[1]);
                              }, 2000);
                            });
                        });
                      }}
                      onCancel={() => MySwal.close()}
                    ></Otp>
                  ),

                  // onClose: () => reject(),
                  showConfirmButton: false,
                })
              );
            });
            // .catch((e) => setLoadingOtp(false));
          }}
        >
          {(pro) => (
            <>
              {!successful && (
                <>
                  {/* <div className="grid grid-cols-2 gap-2 sm:grid-cols-5"> */}
                  <div className="w-full">
                    <input
                      type="text"
                      name="debitAccount"
                      id="debitAccount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
                      placeholder="Account Number"
                      disabled
                      // required=""
                      value={primaryAccount}
                      onChange={pro.handleChange}
                    />
                  </div>

                  {/* </div> */}
                  <button
                    // href="/otp"
                    type="submit"
                    onClick={pro.handleSubmit}
                    disabled={loadingOtp}
                    className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
                  >
                    {loadingOtp ? "Loading..." : "Pay Now"}
                  </button>
                </>
              )}
            </>
          )}
        </Formik>
      )}
    </>
  );
}

export default Bankpay;
