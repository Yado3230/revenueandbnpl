import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import InventoryService from "../../services/inventory.service";
import {
  getInventoryDetail,
  getProductDetails,
} from "../../store/actions/getInventoryAction";
import { getLoanConfigDetail } from "../../store/actions/getLoanConfigAction";
import { getSalesDetail } from "../../store/actions/getSalesAction";
import EditInventory from "./EditInventory";
import { useState } from "react";
import { useMemo } from "react";
import AddExpense from "./AddExpense";
import ExpenseService from "../../services/expense.service";
import AddProduct from "./AddProduct";
import CustomizedMenus from "./OptionDropdown";
const MySwal = withReactContent(Swal);

function Product() {
  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Product Category",
      selector: (row) => row.product_category,
      sortable: true,
    },
    {
      name: "Product Price",
      selector: (row) => row.product_price,
      sortable: true,
    },
    {
      name: "Product Availablity",
      selector: (row) => (row.product_availablity ? "True" : "False"),
      sortable: true,
    },
    {
      name: "Product Description",
      selector: (row) => row.product_description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <CustomizedMenus
          data={row}
          kyc={kyc}
          showEditModal={showEditModal}
          showAddExpense={showAddExpense}
        />
      ),
      sortable: true,
    },
  ];
  let formData = new FormData();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userProfile);
  const [toggeled, setToggeled] = useState(false);
  const [updated, setUpdated] = useState(true);
  const { userID, kyc } = userData;

  useEffect(() => {
    if (userID) {
      dispatch(getProductDetails());
    }
  }, [userID, toggeled, updated, dispatch]);

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { productsDetail } = inventoryInfo;

  useEffect(() => {
    if (userID) {
      dispatch(getLoanConfigDetail(userID));
    }
  }, [userID, toggeled, updated, dispatch]);

  // const handleToggleEdit = async (row) => {
  //   dispatch(InventoryService.ToggleStatus(row, setToggeled, toggeled));
  // };

  useEffect(() => {
    if (userID) {
      dispatch(getSalesDetail(userID));
    }
  }, [userID, toggeled, dispatch]);

  const showFormModal = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Register Product",
        // width: 1000,
        html: (
          <AddProduct
            values={values}
            kyc={kyc}
            onSubmit={(values) => {
              dispatch(
                InventoryService.CreateProduct(values, setUpdated, updated)
                  .then(
                    (response) =>
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "Product Created Successfully",
                        showConfirmButton: false,
                        timer: 3000,
                      })
                  )
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
            onCancel={() => MySwal.close()}
          />
        ),
        onClose: () => reject(),
        onCancel: () => Swal.close(),
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: "#01AFEF",
      });
    });
  };

  const showEditFormModal = (values, data) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Edit Product",
        html: (
          <AddProduct
            values={values}
            kyc={kyc}
            onSubmit={(values) => {
              dispatch(
                InventoryService.EditProduct(values, setUpdated, updated)
                  .then(
                    (response) =>
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "Product Updated Successfully",
                        showConfirmButton: false,
                        timer: 3000,
                      })
                  )
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
            onCancel={() => MySwal.close()}
          />
        ),
        onClose: () => reject(),
        onCancel: () => Swal.close(),
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: "#01AFEF",
      });
    });
  };

  const showAddExpenseForm = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Add Expense",
        html: (
          <AddExpense
            inventoryDetail={productsDetail}
            values={values}
            general={false}
            product={true}
            onSubmit={(values) => {
              dispatch(
                ExpenseService.registerExpense(
                  {
                    expense_name: values.expense_name,
                    expense_amount: values.expense_amount,
                    expense_date: values.expense_date,
                    expense_category: values.expense_category,
                    paymentMethod: values.paymentMethod,
                    expense_receipURL: ["coffee", "banana"],
                    description: values.description,
                    status: "unpaid",
                    // item_id: values.item_id,
                    product_id: values.product_id * 1,
                  },
                  setUpdated,
                  updated
                )
                  .then((response) => {
                    setUpdated(!updated);
                    return (
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "Expense added successfully",
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
            onCancel={() => MySwal.close()}
          />
        ),
        onClose: () => reject(),
        onCancel: () => Swal.close(),
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: "#01AFEF",
      });
    });
  };

  const showModal = () => {
    showFormModal({
      product_name: "",
      product_category: "",
      product_price: "",
      product_availablity: "",
      product_description: "",
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const showEditModal = (data) => {
    showEditFormModal(
      {
        product_id: data.product_id,
        product_name: data.product_name || "",
        product_category: data.product_category || "",
        product_price: data.product_price || "",
        product_availablity: data.product_availablity || "",
        product_description: data.product_description || "",
        merchant_id: userID,
      },
      data
    )
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const showAddExpense = (data) => {
    showAddExpenseForm({
      item_id: data.item_id ? data.item_id : "",
      product_id: data.product_id ? data.product_id : "",
      expense_name: "",
      expense_amount: "",
      expense_date: "",
      expense_category: "",
      paymentMethod: "",
      expense_receipURL: [],
      description: "",
      status: "",
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const sortedData = useMemo(
    () =>
      [...productsDetail].sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      ),
    [productsDetail]
  );

  return (
    <div>
      <button
        type="button"
        className="mb-4 btn btn-outline btn-primary"
        onClick={showModal}
      >
        Add Product
      </button>

      <button
        type="button"
        className="mb-4 ml-2 btn btn-outline btn-primary"
        onClick={showAddExpense}
      >
        Add Expense
      </button>
      <DataTable
        title="Product Lists"
        columns={columns}
        data={sortedData}
        pagination
        persistTableHeadstriped
        highlightOnHover
        dense
      />
    </div>
  );
}

export default Product;
