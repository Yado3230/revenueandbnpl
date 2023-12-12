import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
function DomainComponent({ onSubmit, values, onCancel }) {
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("First Number is required"),
    url: Yup.string().required("Second Number is required"),
  });

  return (
    <>
      {/* <section className="text-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> */}
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <Formik
          initialValues={values}
          validationSchema={ValidationSchema}
          isInitialValid={ValidationSchema.isValidSync(values)}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <span className="text-sm link-error"></span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Souqpass"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    URL
                  </label>
                  <span className="text-sm link-error"></span>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    placeholder="souqpass.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.url}
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
                Register
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="swal2-cancel swal2-styled"
              >
                Cancel
              </button>
            </form>
          )}
        </Formik>
      </div>
      {/* </div>
      </section> */}
    </>
  );
}

export default DomainComponent;
