import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Selectinput from "../../components/Selectinput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import InventoryService from "../../services/inventory.service";
import { getProductDetails } from "../../store/actions/getInventoryAction";

const SaleProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductDetails());
  }, [dispatch]);

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { productsDetail } = inventoryInfo;

  const [values] = useState({
    product_id: params.id ? params.id : "",
    product_sale_price: productsDetail.filter(
      (item) => item?.product_id == params.id * 1
    )?.[0]?.product_price,
    quantity: 1,
  });

  const item_option = productsDetail.map((item) => ({
    value: item?.product_id,
    label: item?.product_name,
  }));

  const item_option2 = [
    {
      value: "Cash",
      label: "Cash",
    },
  ];

  const ValidationSchema = Yup.object().shape({
    product_sale_price: Yup.number().required("price is required"),
    quantity: Yup.number().required("quantity is required").default(1),
  });

  return (
    <div className="border p-7 rounded bg-white">
      <>
        <Formik
          initialValues={values}
          onSubmit={(values) => {
            dispatch(
              InventoryService.SellProduct(values, setUpdated, updated)
                .then((response) => {
                  setUpdated(!updated);
                  navigate("/sales/products");
                  return (
                    response &&
                    Swal.fire({
                      icon: "success",
                      title: "Product sold",
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
                      title:
                        error.response.data.error || "Something went wrong",
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
                    id="product_id"
                    name="product_id"
                    value={formik.values.product_id}
                    handleChange={formik.handleChange}
                    title="Select Product"
                  />
                </div>
                <div className="w-full">
                  <Selectinput
                    arr={item_option2}
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formik.values.paymentMethod}
                    handleChange={formik.handleChange}
                    title="Payment Method"
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
                    min={
                      productsDetail.filter(
                        (item) =>
                          item?.product_id == formik.values.product_id * 1
                      )?.[0]?.product_price
                    }
                    type="number"
                    name="product_sale_price"
                    id="product_sale_price"
                    placeholder="1025.63"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.product_sale_price}
                    onChange={formik.handleChange}
                    required
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
                    type="number"
                    name="quantity"
                    id="quantity"
                    min={0}
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
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Total price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={
                      formik.values.product_sale_price *
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

export default SaleProduct;
