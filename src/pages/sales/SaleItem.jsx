import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Selectinput from "../../components/Selectinput";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import InventoryService from "../../services/inventory.service";
import { getInventoryDetail } from "../../store/actions/getInventoryAction";

const SaleItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  const [values] = useState({
    item_id: params.id ? params.id : "",
    item_sale_price: null,
    quantity: 1,
  });

  useEffect(() => {
    dispatch(getInventoryDetail());
  }, [dispatch]);

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { inventoryDetail } = inventoryInfo;

  const item_option = inventoryDetail.map((item) => ({
    value: item?.item_id,
    label: item?.item_name,
  }));

  const ValidationSchema = Yup.object().shape({
    item_id: Yup.string().required("Item Id is required"),
    item_sale_price: Yup.number().required("price is required"),
    quantity: Yup.number().required("quantity is required").default(1),
  });

  // const item_option = [
  //   {
  //     value: "1",
  //     label: "A32",
  //   },
  //   {
  //     value: "2",
  //     label: "Galaxy A33",
  //   },
  // ];

  return (
    <div className="border p-7 rounded bg-white">
      <>
        <Formik
          initialValues={values}
          validationSchema={ValidationSchema}
          isInitialValid={ValidationSchema.isValidSync(values)}
          onSubmit={(values) => {
            dispatch(
              InventoryService.SellItem(values, setUpdated, updated)
                .then((response) => {
                  setUpdated(!updated);
                  navigate("/sales/itemlists");
                  return (
                    response &&
                    Swal.fire({
                      icon: "success",
                      title: "Item sold",
                      showConfirmButton: false,
                      timer: 3000,
                    })
                  );
                })
                .catch(
                  (error) =>
                    error &&
                    Swal.fire({
                      icon: "error",
                      title: `Something went wrong`,
                      showConfirmButton: false,
                      timer: 3000,
                    })
                )
            );
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="w-full">
                  <Selectinput
                    arr={item_option}
                    id="item_id"
                    name="item_id"
                    value={formik.values.item_id}
                    handleChange={formik.handleChange}
                    title="Select Item"
                  />
                </div>
                {/* <div className="w-full">
                  <label
                    htmlFor="suk"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Suk
                  </label>
                  <span className="text-sm link-error">
                    <ErrorMessage name="suk"></ErrorMessage>
                  </span>
                  <input
                    type="text"
                    name="suk"
                    id="suk"
                    placeholder="suk"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.suk}
                    onChange={formik.handleChange}
                  />
                </div> */}

                <div className="w-full">
                  <label
                    htmlFor="paymentMethod"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Payment Method
                  </label>
                  <span className="text-sm link-error">
                    <ErrorMessage name="paymentMethod"></ErrorMessage>
                  </span>
                  <input
                    type="text"
                    name="paymentMethod"
                    id="paymentMethod"
                    placeholder="payment-method"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.paymentMethod}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="item_sale_price"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <span className="text-sm link-error">
                    <ErrorMessage name="item_sale_price"></ErrorMessage>
                  </span>
                  <input
                    type="text"
                    name="item_sale_price"
                    id="item_sale_price"
                    placeholder="1025.63"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.item_sale_price}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="quantity"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <span className="text-sm link-error">
                    <ErrorMessage name="quantity"></ErrorMessage>
                  </span>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    placeholder="quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="quantity"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Price
                  </label>
                  <span className="text-sm link-error">
                    <ErrorMessage name="quantity"></ErrorMessage>
                  </span>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    placeholder="quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={
                      formik.values.item_sale_price *
                      1 *
                      (formik.values.quantity * 1)
                    }
                    disabled
                  />
                </div>
              </div>
              <button
                type="submit"
                // onSubmit={onSubmit}
                style={{ backgroundColor: "#01AFEF" }}
                className="swal2-confirm swal2-styled"
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </>
    </div>
  );
};

export default SaleItem;
