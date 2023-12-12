import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AgentComponent({ onSubmit, values, onCancel }) {
  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });
  return (
    <>
      <Formik
        initialValues={values}
        validationSchema={ValidationSchema}
        isInitialValid={ValidationSchema.isValidSync(values)}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="firstName"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Lelisa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="lastName" />
                </span>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Chera"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="email" />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="sample@souqpass.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="phoneNumber" />
                </span>
                <input
                  type="password"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.phoneNumber}
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
            <button onClick={onCancel} className="swal2-cancel swal2-styled">
              Cancel
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AgentComponent;
