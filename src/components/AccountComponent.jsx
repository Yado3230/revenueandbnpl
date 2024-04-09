import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AccountComponent({ onSubmit, values, onCancel }) {
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("First Number is required"),
    url: Yup.string().required("Second Number is required"),
  });
  return (
    <>
      <div className="w-full p-6 bg-white rounded-lg testdark:border md:mt-0 sm:max-w-md testdark:bg-gray-800 testdark:border-gray-700 sm:p-8">
        <Formik
          initialValues={values}
          validationSchema={ValidationSchema}
          isInitialValid={ValidationSchema.isValidSync(values)}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4 sm:mb-5">
                <div>
                  <label
                    htmlFor="account"
                    className="mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                  >
                    Account
                  </label>
                  <span className="text-sm link-error"></span>
                  <input
                    type="number"
                    name="account"
                    id="account"
                    placeholder="1022200133436"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                onSubmit={onSubmit}
                style={{ backgroundColor: "#01AFEF" }}
                className="swal2-confirm swal2-styled"
              >
                Add
              </button>
              <button onClick={onCancel} className="swal2-cancel swal2-styled">
                Cancel
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AccountComponent;
