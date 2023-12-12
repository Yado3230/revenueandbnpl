import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Input from "../../components/Input";
// import Fileinput from "../../components/Fileinput";
import Addressproof from "../../components/Addressproof";

function EditInventory({ onSubmit, values, onCancel, data }) {
  // const FILE_SIZE = 160 * 1024;
  // const SUPPORTED_FORMATS = [
  //   "image/jpg",
  //   "image/jpeg",
  //   "image/gif",
  //   "image/png",
  // ];
  const ValidationSchema = Yup.object().shape({
    item_code: Yup.string().required("Item Code is required"),
    item_price: Yup.string().required("Price is required"),
    item_name: Yup.string().required("Name is required"),
    item_type: Yup.string().required("Type is required"),
    loan_limit: Yup.string().required("Loan Limit is required"),
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
            <div className="grid gap-4 mb-4 grid-cols-1 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="item_name"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Name
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="item_name"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="item_name"
                  id="item_name"
                  placeholder="Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.item_name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="item_price"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Price
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="item_price"></ErrorMessage>
                </span>
                <input
                  type="number"
                  name="item_price"
                  id="item_price"
                  placeholder="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.item_price}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="item_type"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Type
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="item_type"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="item_type"
                  id="item_type"
                  placeholder="Type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.item_type}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="item_code"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Code
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="item_code"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="item_code"
                  id="item_code"
                  placeholder="Code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.item_code}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="loan_limit"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Loan Limit(%)
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="loan_limit"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="loan_limit"
                  id="loan_limit"
                  min={0}
                  max={100}
                  placeholder="Code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.loan_limit}
                  onChange={formik.handleChange}
                />
              </div>
              {/* <div className="col-span-2">
                <Fileinput title="test" />
              </div> */}
              <div className="sm:col-span-2">
                <Addressproof
                  lable="picture"
                  id="picture"
                  title="Item Image"
                  name="picture"
                  picture={data.item_pic}
                  fileInput={(e) => {
                    formik.setTouched({
                      picture: true,
                    });
                    formik.setFieldValue("picture", e.target.files[0]);
                  }}
                  value={formik.values.picture}
                />
              </div>
            </div>

            <button onClick={onCancel} className="swal2-cancel swal2-styled">
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

export default EditInventory;
