import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Selectinput from "../../components/Selectinput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import InventoryService from "../../services/inventory.service";
import { getInventoryDetail } from "../../store/actions/getInventoryAction";

const SaleBulkItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails());
  }, [dispatch]);

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { productsDetail } = inventoryInfo;

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

  const idsArray = params?.id?.split("-");
  const numericIds = idsArray.map((id) => parseInt(id, 10));

  return (
    <div className="border p-7 rounded bg-white">
      <Formik
        initialValues={{
          discount: 0,
          tipAmount: 0,
          paymentMethod: "Cash",
          items: productsDetail
            .filter((item) => numericIds.includes(item.product_id))
            .map((item) => ({
              product_id: item?.product_id.toString(),
              product_sale_price: item?.product_price,
              suk: "Yared", // Replace with actual value
              quantity: 1,
              paymentMethod: "Cash", // Replace with actual value
              itemItemId: item?.item_id.toString(),
              itemsItemId: item?.item_id.toString(),
            })),
        }}
        // validationSchema={ValidationSchema}
        onSubmit={(values) => {
          setLoading(true);
          dispatch(
            InventoryService.SellItems(values, setUpdated, updated)
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
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: error.response?.data?.error || "Something went wrong",
                  showConfirmButton: false,
                  timer: 3000,
                });
              })
              .finally(() => setLoading(false))
          );
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="md:col-span-2 grid md:grid-cols-3 gap-2 items-center">
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
                    htmlFor="discount"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Discount
                  </label>
                  <span className="text-sm link-error">
                    <ErrorMessage name="discount" />
                  </span>
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    min={0}
                    placeholder="discount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="tipAmount"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tip
                  </label>
                  <span className="text-sm link-error">
                    <ErrorMessage name="tipAmount" />
                  </span>
                  <input
                    type="number"
                    name="tipAmount"
                    id="tipAmount"
                    min={0}
                    placeholder="tipAmount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.tipAmount}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              {formik.values.items.map((item, index) => (
                <div key={index} className="border bg-gray-100 p-5 rounded-xl">
                  <div className="w-full">
                    <Selectinput
                      arr={item_option}
                      id={`items[${index}].item_id`}
                      name={`items[${index}].item_id`}
                      value={item.item_id}
                      handleChange={formik.handleChange}
                      title="Select Item"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor={`items[${index}].item_sale_price`}
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <span className="text-sm link-error">
                      <ErrorMessage name={`items[${index}].item_sale_price`} />
                    </span>
                    <input
                      min={
                        inventoryDetail.find(
                          (invItem) => invItem?.item_id === item.item_id
                        )?.item_price * 1
                      }
                      type="number"
                      name={`items[${index}].item_sale_price`}
                      id={`items[${index}].item_sale_price`}
                      placeholder="1025.63"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={item.item_sale_price}
                      onChange={formik.handleChange}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor={`items[${index}].quantity`}
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quantity
                    </label>
                    <span className="text-sm link-error">
                      <ErrorMessage name={`items[${index}].quantity`} />
                    </span>
                    <input
                      type="number"
                      name={`items[${index}].quantity`}
                      id={`items[${index}].quantity`}
                      min={0}
                      max={
                        inventoryDetail.find(
                          (invItem) => invItem?.item_id === item.item_id
                        )?.onStock * 1
                      }
                      placeholder="quantity"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={item.quantity}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor={`items[${index}].total_price`}
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Total Price
                    </label>
                    <span className="text-sm link-error">
                      <ErrorMessage name={`items[${index}].quantity`} />
                    </span>
                    <input
                      type="number"
                      name={`items[${index}].total_price`}
                      id={`items[${index}].total_price`}
                      placeholder="quantity"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={item.item_sale_price * 1 * (item.quantity * 1)}
                      disabled
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#01AFEF" }}
              className="swal2-confirm swal2-styled"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SaleBulkItem;
