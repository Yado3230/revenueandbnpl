import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import Selectinput from "./Selectinput";
import { getAccounts } from "../store/actions/bank_accountAction";

const expiryDate = [
  { label: "Select Date Of Expiry", value: "" },
  { label: "15 day", value: "15" },
  { label: "1-Month", value: "30" },
  { label: "2-Month", value: "60" },
  { label: "3-Month", value: "90" },
];

const ValidationSchema = Yup.object().shape({
  accountNumber: Yup.string().required("Account Number is required"),
  expiryDate: Yup.string().required("You Have to select Bank"),
});

export const ModalForm = ({ values, onSubmit, onCancel }) => {
  let accountNumber = values.accountNumber;
  const dropdown = [{ label: `${accountNumber}`, value: `${accountNumber}` }];
  return (
    <Formik
      initialValues={values}
      validationSchema={ValidationSchema}
      isInitialValid={ValidationSchema.isValidSync(values)}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div>
                <Selectinput
                  arr={dropdown}
                  id="accountNumber"
                  title="Choose Account"
                  name="accountNumber"
                  value={formik.values.accountNumber}
                  handleChange={formik.handleChange}
                />
              </div>
              <div>
                <Selectinput
                  arr={expiryDate}
                  id="expiryDate"
                  title="Set Expiry Date"
                  name="expiryDate"
                  value={formik.values.expiryDate}
                  handleChange={formik.handleChange}
                />
              </div>

              <div className="items-center col-span-2 space-x-4">
                <button
                  type="submit"
                  onSubmit={onSubmit}
                  className="text-white rounded-md swal2-styled bg-primary"
                  // className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="swal2-cancel swal2-styled"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* <button
            type="submit"
            onSubmit={onSubmit}
            className="swal2-confirm swal2-styled"
          >
            OK
          </button> */}
          </form>
        </>
      )}
    </Formik>
  );
};
