import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Selectinput from "../../components/Selectinput";

function AddProduct({ onSubmit, values, onCancel, kyc }) {
  const ValidationSchema = Yup.object().shape({
    product_name: Yup.string().required("Product name is required"),
    product_category: Yup.string().required("Product Category is required"),
    product_price: Yup.string().required("Product price is required"),
    product_availablity: Yup.string().required("required"),
    product_description: Yup.string().optional(),
  });

  const category = [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ];

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
            <div className="grid grid-cols-2 gap-4 mb-4 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="product_name"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="product_name"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  placeholder="Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.product_name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="product_category"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Product Category
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="product_category"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="product_category"
                  id="product_category"
                  placeholder="Category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.product_category}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <Selectinput
                  arr={category}
                  id="product_availablity"
                  name="product_availablity"
                  value={formik.values.product_availablity}
                  handleChange={formik.handleChange}
                  title="Product Availablity"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="product_price"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Product Price
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="product_price"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="product_price"
                  id="product_price"
                  placeholder="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.product_price}
                  onChange={formik.handleChange}
                />
              </div>
              {/* <div className="w-full">
                <label
                  htmlFor="product_availablity"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Product Availablity
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="product_availablity"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="product_availablity"
                  id="product_availablity"
                  placeholder="Availablity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.product_availablity}
                  onChange={formik.handleChange}
                />
              </div> */}

              <div className="col-span-2">
                <label
                  htmlFor="product_description"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="product_description"></ErrorMessage>
                </span>
                <textarea
                  name="product_description"
                  id="product_description"
                  value={formik.values.product_description}
                  onChange={formik.handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Your product description here"
                ></textarea>
              </div>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className="swal2-cancel swal2-styled"
            >
              Cancel
            </button>
            <button
              type="submit"
              // onSubmit={onSubmit}
              style={{ backgroundColor: "#01AFEF" }}
              className="swal2-confirm swal2-styled"
            >
              Register
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AddProduct;
