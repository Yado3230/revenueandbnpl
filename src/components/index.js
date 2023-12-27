import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import BankAccountServices from "../services/bank-account.services";
import { createTutorial } from "../store/actions/bank_accountAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import OTP from "../pages/auth/OTP";
const MySwal = withReactContent(Swal);

function ModalFire() {
  const [trys, setTry] = useState(true);
  const customerName2 = useRef("");
  const AccountListData = useSelector((state) => state.accountsList);
  const dispatch = useDispatch();
  const { criteriaValue } = AccountListData;

  const [otp1, setOpt1] = useState("");

  const otp2 = useRef("");
  const tokenInfo = useSelector((state) => state.userProfile);
  const { token } = tokenInfo;
  const user_token = jwtDecode(token);
  const merchant_id = user_token?.merchant_id;

  customerName2.current = criteriaValue;

  const interpretResponse = (response) => {
    let actionResponse = JSON.stringify(response);
    if (response.response === "success" || response.responseCode == 200) {
      Swal.fire({
        icon: "success",
        title: "Account Created",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (response.responseCode === 403 && response.respone === "error") {
      Swal.fire({
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (response.responseCode === 409 && response.response === "error") {
      Swal.fire({
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Account Is Not Created",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  useEffect(() => {
    otp1.length === 6 && setOpt1(otp1);
  }, [otp1, trys]);
  const readState = () => {
    return otp1;
  };
  const handleOtpSubmit = (values, res, reject, readState) => {
    BankAccountServices.confirmOtp(values.phoneNumber, otp2.current)
      .then((re) => {
        let accNo = "";
        let custName = "";

        const renderList = res[1].map((item, index) => (
          <div className="flex items-center mb-4">
            <input
              type="radio"
              name="radio-2"
              className="radio radio-primary"
              value={item.accountNumber}
              onChange={(e) => {
                accNo = e.target.value;
                custName = item.accountTitle;
                // setAccountNumber(e.target.value)
                // setcustomerName(item.accountTitle)
              }}
            />
            <label
              for="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              {item.accountNumber}
            </label>
            {/* <p>{item.accountTitle}</p> */}
          </div>
        ));
        MySwal.fire({
          title: "Choose Account",
          html: (
            <div className="">
              {renderList}
              {/* <button type="button" onClick={createAccount}>submit</button> */}
              <div className="col-span-2 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      createTutorial({
                        current: custName,
                        accountNumber: accNo,
                        bankName: "CBO",
                        merchant_id,
                        phone_number: values.phoneNumber,
                        interpretResponse,
                      })
                    );
                  }}
                  className="swal2-confirm swal2-styled btn-primary"
                >
                  submit
                </button>
              </div>
            </div>
          ),
          onClose: () => reject(),
          onCancel: () => Swal.close(),
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonColor: "#01AFEF",
        });
      })
      .catch((er) => {});
  };

  const showFormModal = (values) => {
    return new Promise((resolve, reject) => {
      const ValidationSchema = Yup.object().shape({
        phoneNumber: Yup.string().required("Phone Number is required"),
      });
      MySwal.fire({
        title: "Provide Phone Number",
        html: (
          <>
            <Formik
              initialValues={{ phoneNumber: "" }}
              validationSchema={ValidationSchema}
              isInitialValid={ValidationSchema.isValidSync(values)}
              onSubmit={(values) => {
                BankAccountServices.accountByPhone(values.phoneNumber)
                  .then((res) => {
                    if (res[0] == 200) {
                      BankAccountServices.sendOtp(values.phoneNumber)
                        .then((resp) => {
                          return resp;
                        })
                        .catch((err) => {
                          return err;
                        });

                      MySwal.fire({
                        title: "",
                        html: (
                          <OTP
                            dispatch={dispatch}
                            setOpt1={setOpt1}
                            otp2={otp2}
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleOtpSubmit(values, res, reject, readState);
                            }}
                          ></OTP>
                        ),
                        onClose: () => reject(),
                        showConfirmButton: false,
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "No Account Found With This Phone Number",
                        showConfirmButton: false,
                        timer: 3000,
                      });
                    }
                  })
                  .catch((err) => {
                    return err;
                  });
              }}
            >
              {(formik) => (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-2 sm:grid-cols-5 sm:gap-6 sm:mb-5">
                      <div className="col-span-3">
                        <span className="text-sm link-error">
                          <ErrorMessage name="phoneNumber" />
                        </span>
                        <label
                          htmlFor="pno"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Phone Number
                        </label>
                        <input
                          type="number"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                          placeholder="0987654321"
                        />
                      </div>
                      <div className="col-span-2 mt-5">
                        <button
                          type="submit"
                          onClick={formik.handleSubmit}
                          className="swal2-confirm swal2-styled btn-primary"
                        >
                          verify
                        </button>
                      </div>
                    </div>
                    {/* <button
                      type="submit"
                      onSubmit={onSubmit}
                      className="swal2-confirm swal2-styled"
                    >
                      OK
                    </button>
                    <button
                      onClick={onCancel}
                      className="swal2-cancel swal2-styled"
                    >
                      Cancel
                    </button> */}
                  </form>
                </>
              )}
            </Formik>
          </>
        ),
        onClose: () => reject(),
        onCancel: () => Swal.close(),
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: "#01AFEF",
      });
    });
  };

  const showModal = () => {
    showFormModal({
      name: "",
      url: "",
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  return (
    <button
      type="button"
      className="mb-4 btn btn-outline btn-primary"
      onClick={showModal}
    >
      Add New Account
    </button>
  );
}

export default ModalFire;
