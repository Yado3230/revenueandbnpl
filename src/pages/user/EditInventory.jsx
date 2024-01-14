import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Input from "../../components/Input";
// import Fileinput from "../../components/Fileinput";
import Addressproof from "../../components/Addressproof";
import Selectinput from "../../components/Selectinput";

function EditInventory({ onSubmit, values, onCancel, data, kyc, categories }) {
  console.log(values);
  const currentDate = new Date().toISOString().split("T")[0];
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const item_option = categories.map((item) => ({
    value: item?.item_category_id,
    label: item?.type,
  }));

  const ValidationSchema = Yup.object().shape({
    // picture: Yup.any().optional(),
    // picture: Yup.mixed()
    //   .required("A file is required")
    //   .test(
    //     "fileSize",
    //     "File too large",
    //     (value) => value && value.size <= FILE_SIZE
    //   )
    //   .test(
    //     "fileFormat",
    //     "Unsupported Format",
    //     (value) => value && SUPPORTED_FORMATS.includes(value.type)
    //   ),
    item_code: Yup.string().optional(),
    item_price: Yup.string().required("Price is required"),
    item_name: Yup.string().required("Name is required"),
    item_type: Yup.string().optional(),
    // loan_limit: Yup.string().optional(),
    totalQuantity: Yup.string().required("Total Quantity is required"),
    totalBuyPrice: Yup.string().required("Total Buy Price is required"),
    reorderPointUnit: Yup.string().required("Reorder Point Unit is required"),
    purchaseDate: Yup.string().optional(),
    supplier: Yup.string().optional(),
    location: Yup.string().optional(),
    description: Yup.string().optional(),
    // item_category_id: Yup.string().optional(),
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
            <div className="grid grid-cols-3 gap-4 mb-4 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="item_name"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Item Name <span className="text-red-500">*</span>
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
                  htmlFor="totalBuyPrice"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Buy Price <span className="text-red-500">*</span>
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="totalBuyPrice"></ErrorMessage>
                </span>
                <input
                  type="number"
                  name="totalBuyPrice"
                  id="totalBuyPrice"
                  placeholder="Buy Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.totalBuyPrice}
                  onChange={formik.handleChange}
                />
              </div>
              {/* <div className="w-full">
                <label
                  htmlFor="item_category_id"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Item Category
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="item_category_id"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="item_category_id"
                  id="item_category_id"
                  placeholder="Type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.item_category_id}
                  onChange={formik.handleChange}
                />
              </div> */}
              <div className="w-full">
                <Selectinput
                  arr={item_option}
                  id="item_category_id"
                  name="item_category_id"
                  value={formik.values.item_category_id}
                  handleChange={formik.handleChange}
                  title="Select Category"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="item_code"
                  className="mb-2 text-sm font-medium text-gray-900"
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
              {kyc.rbf == false ? (
                <div className="w-full">
                  <label
                    htmlFor="loan_limit"
                    className="mb-2 text-sm font-medium text-gray-900"
                  >
                    Max Loan Limit(%)
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
                    placeholder="loan_limit"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.loan_limit}
                    onChange={formik.handleChange}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="w-full">
                <label
                  htmlFor="totalQuantity"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Total Quantity <span className="text-red-500">*</span>
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="totalQuantity"></ErrorMessage>
                </span>
                <input
                  type="number"
                  name="totalQuantity"
                  id="totalQuantity"
                  placeholder="Total Quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.totalQuantity}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="item_price"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Sell Price <span className="text-red-500">*</span>
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
              {/* <div className="w-full">
                <label
                  htmlFor="onStock"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  On Stock
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="onStock"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="onStock"
                  id="onStock"

                  placeholder="On Stock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.onStock}
                  onChange={formik.handleChange}
                />
              </div> */}
              {/* <div className="w-full">
                <label
                  htmlFor="unitPrice"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Unit Price
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="unitPrice"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="unitPrice"
                  id="unitPrice"

                  placeholder="Unit Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.unitPrice}
                  onChange={formik.handleChange}
                />
              </div> */}
              <div className="w-full">
                <label
                  htmlFor="reorderPointUnit"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Reorder Quantity <span className="text-red-500">*</span>
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="reorderPointUnit"></ErrorMessage>
                </span>
                <input
                  type="number"
                  name="reorderPointUnit"
                  id="reorderPointUnit"
                  placeholder="Reorder Quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.reorderPointUnit}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="purchaseDate"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Purchase Date <span className="text-red-500">*</span>
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="purchaseDate"></ErrorMessage>
                </span>
                <input
                  type="date"
                  name="purchaseDate"
                  id="purchaseDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.purchaseDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="supplier"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Supplier
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="supplier"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="supplier"
                  id="supplier"
                  placeholder="Supplier"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.supplier}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={kyc.rbf === false ? "col-span-3" : "w-full"}>
                <label
                  htmlFor="location"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Location
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="location"></ErrorMessage>
                </span>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="description"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <span className="text-sm link-error">
                  <ErrorMessage name="description"></ErrorMessage>
                </span>
                <textarea
                  name="description"
                  id="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Your description here"
                ></textarea>
              </div>
              {/* <div className="sm:col-span-1">
                <Addressproof
                  lable="picture"
                  id="picture"
                  title="Item Image"
                  name="picture"
                  fileInput={(e) => {
                    formik.setTouched({
                      picture: true,
                    });
                    formik.setFieldValue("picture", e.target.files[0]);
                  }}
                  value={formik.values.picture}
                />
              </div> */}
              <div className="sm:col-span-1">
                <Addressproof
                  lable="picture"
                  id="picture"
                  title="Item Image"
                  name="picture"
                  picture={data?.item_pic?.replace("/uploads/", "/")}
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
              Update
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default EditInventory;
