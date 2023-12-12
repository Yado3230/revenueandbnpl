import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTutorial } from "../store/actions/bank_accountAction";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import Selectinput from "./Selectinput";
import jwtDecode from "jwt-decode";

const dropdown = [
  { label: "CBO", value: "CBO" },
  { label: "CBE", value: "CBE" },
  { label: "BOA", value: "BOA" },
];

function Maccounts(props) {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userProfile);
  const { token } = userData;
  const user_token = token && jwtDecode(token);
  const merchant_id = user_token?.merchant_id;

  const validationSchema = Yup.object().shape({
    accountHolder: Yup.string().required("Account Holder Name is required"),
    accountNumber: Yup.string().required("Account Number is required"),
    bankName: Yup.string().required("You Have to select Bank"),
  });
  return (
    <>
      <div className="">
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {props.title}
            </h2>
            <Formik
              initialValues={{
                accountHolder: "",
                accountNumber: "",
                bankName: "CBO",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(
                  createTutorial(
                    values.accountHolder,
                    values.accountNumber,
                    values.bankName,
                    merchant_id
                  )
                )
                  .then((res) => {
                    setMessage(res.message);
                    setSuccessful(true);
                  })
                  .catch((e) => e);
              }}
            >
              {(props) => (
                <>
                  {!successful && (
                    <>
                      {/* <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div>
                          <label
                            htmlFor="fname"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            First Name
                          </label>
                          <span className="text-sm link-error">
                            {props.errors.firstName && props.touched.firstName
                              ? props.errors.firstName
                              : null}
                          </span>
                          <input
                            type="fname"
                            name="firstName"
                            id="fname"
                            value={props.values.firstName}
                            onChange={props.handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                            placeholder="Lelisa"
                            required=""
                          />
                        </div>
                      </div> */}
                      <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="sm:col-span-2">
                          <span className="text-sm link-error">
                            {props.errors.accountHolder &&
                            props.touched.accountHolder
                              ? props.errors.accountHolder
                              : null}
                          </span>
                          <Input
                            label="accholder"
                            title="Account Holder"
                            type="text"
                            name="accountHolder"
                            id="accholder"
                            place="Hunda Temam Biniam"
                            required=""
                            value={props.values.accountHolder}
                            handleChange={props.handleChange}
                          />
                        </div>
                        <div className="w-full">
                          <span className="text-sm link-error">
                            {props.errors.accountNumber &&
                            props.touched.accountNumber
                              ? props.errors.accountNumber
                              : null}
                          </span>
                          <Input
                            label="accno"
                            title="Account Number"
                            type="text"
                            name="accountNumber"
                            id="accountNumber"
                            place="1022225648986"
                            required=""
                            value={props.values.accountNumber}
                            handleChange={props.handleChange}
                          />
                        </div>
                        <div>
                          <span className="text-sm link-error">
                            {props.errors.bankName && props.touched.bankName
                              ? props.errors.bankName
                              : null}
                          </span>
                          <Selectinput
                            arr={dropdown}
                            id="bankName"
                            name="bankName"
                            title="Choose Bank"
                            value={props.values.bankName}
                            handleChange={props.handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          type="submit"
                          onClick={props.handleSubmit}
                          className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                        onClick={props.handleClose}
                      >
                        {message}
                      </div>
                    </div>
                  )}
                </>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
}

export default Maccounts;
