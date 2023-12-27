import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddInventory from "./AddInventory";
import { useDispatch, useSelector } from "react-redux";
import InventoryService from "../../services/inventory.service";
import { getInventoryDetail } from "../../store/actions/getInventoryAction";
import AssignInventory from "./AssignInventory";
import { getLoanConfigDetail } from "../../store/actions/getLoanConfigAction";
import { getSalesDetail } from "../../store/actions/getSalesAction";
import AssignLoan from "./AssignLoan";
import LoanConfigService from "../../services/loanConfig.service";
import CustomizedMenus from "./OptionDropdown";
import EditInventory from "./EditInventory";
import { useState } from "react";
import { useMemo } from "react";
import AddExpense from "./AddExpense";
import ExpenseService from "../../services/expense.service";
import { getAllCategoryData } from "../../store/actions/conf.action";
const MySwal = withReactContent(Swal);

function Inventory() {
  const currentDate = new Date().toISOString().split("T")[0];
  const columns = [
    {
      name: "Image",
      cell: (row) => {
        return (
          <div className="p-2">
            <img
              crossorigin="anonymous"
              src={`${row.item_pic?.replace("/uploads/", "/")}`}
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
          </div>
        );
      },
    },
    {
      name: "Name",
      selector: (row) => row.item_name,
      sortable: true,
    },
    // {
    //   name: "Type",
    //   selector: (row) => row.item_type,
    //   sortable: true,
    // },
    {
      name: "Code",
      selector: (row) => row.item_code,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.item_price,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toISOString().split("T")[0],
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <input
          onChange={() => handleToggleEdit(row)}
          type="checkbox"
          className="toggle toggle-info"
          checked={row.status}
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <CustomizedMenus
          data={row}
          kyc={kyc}
          showEditModal={showEditModal}
          showDetailModal={showDetailModal}
          showAssignLoan={showAssignLoan}
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
  const [toggleInput, setToggleInput] = useState(true);
  const { userID, kyc } = userData;

  useEffect(() => {
    if (userID) {
      dispatch(getInventoryDetail(userID));
    }
  }, [userID, toggeled, updated, dispatch]);

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { inventoryDetail } = inventoryInfo;

  useEffect(() => {
    if (userID) {
      dispatch(getLoanConfigDetail(userID));
    }
  }, [userID, toggeled, updated, dispatch]);

  const handleToggleEdit = async (row) => {
    dispatch(InventoryService.ToggleStatus(row, setToggeled, toggeled));
  };

  const loanConfigData = useSelector((state) => state.loanConfigInfo);
  const { loanConfigDetail } = loanConfigData;

  useEffect(() => {
    dispatch(getSalesDetail(userID));
    dispatch(getAllCategoryData());
  }, [userID, toggeled, dispatch]);

  const salesData = useSelector((state) => state.salesInfo);
  const { salesDetail } = salesData;

  const categoryData = useSelector((state) => state.confInfo);
  const { categories } = categoryData;

  const showFormModal = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Register Item",
        width: 1000,
        html: (
          <AddInventory
            values={values}
            kyc={kyc}
            categories={categories}
            onSubmit={(values, { resetForm }) => {
              formData.append(
                "item_name",
                values.item_name ? values.item_name : ""
              );
              formData.append(
                "item_type",
                values.item_type ? values.item_type : ""
              );
              formData.append(
                "item_price",
                values.item_price ? values.item_price : ""
              );
              formData.append(
                "item_code",
                values.item_code ? values.item_code : ""
              );
              formData.append("picture", values.picture ? values.picture : "");
              formData.append(
                "location",
                values.location ? values.location : ""
              );
              formData.append(
                "description",
                values.description ? values.description : ""
              );
              formData.append(
                "supplier",
                values.supplier ? values.supplier : ""
              );
              formData.append(
                "purchaseDate",
                values.purchaseDate ? values.purchaseDate : ""
              );
              formData.append(
                "reorderPointUnit",
                values.reorderPointUnit ? values.reorderPointUnit : ""
              );
              formData.append(
                "unitPrice",
                values.unitPrice ? values.unitPrice : ""
              );
              formData.append("onStock", values.onStock ? values.onStock : "");
              formData.append(
                "totalBuyPrice",
                values.totalBuyPrice ? values.totalBuyPrice : ""
              );
              formData.append(
                "totalQuantity",
                values.totalQuantity ? values.totalQuantity : ""
              );
              formData.append(
                "item_category_id",
                values.item_category_id ? values.item_category_id : ""
              );
              resetForm({ values: "" });

              dispatch(
                InventoryService.CreateInventory(formData, setUpdated, updated)
                  .then(
                    (response) =>
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "Inventory Created Successfully",
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
        title: "Edit Item",
        width: 1000,
        html: (
          <EditInventory
            values={values}
            data={data}
            kyc={kyc}
            categories={categories}
            onSubmit={(values, { resetForm }) => {
              formData.append("item_id", values.item_id ? values.item_id : "");
              formData.append(
                "item_name",
                values.item_name ? values.item_name : ""
              );
              formData.append(
                "item_type",
                values.item_type ? values.item_type : ""
              );
              formData.append(
                "item_price",
                values.item_price ? values.item_price : ""
              );
              formData.append(
                "item_code",
                values.item_code ? values.item_code : ""
              );
              formData.append("picture", values.picture ? values.picture : "");
              formData.append(
                "location",
                values.location ? values.location : ""
              );
              formData.append(
                "description",
                values.description ? values.description : ""
              );
              formData.append(
                "supplier",
                values.supplier ? values.supplier : ""
              );
              formData.append(
                "purchaseDate",
                values.purchaseDate ? values.purchaseDate : ""
              );
              formData.append(
                "reorderPointUnit",
                values.reorderPointUnit ? values.reorderPointUnit : ""
              );
              formData.append(
                "unitPrice",
                values.unitPrice ? values.unitPrice : ""
              );
              formData.append("onStock", values.onStock ? values.onStock : "");
              formData.append(
                "totalBuyPrice",
                values.totalBuyPrice ? values.totalBuyPrice : ""
              );
              formData.append(
                "totalQuantity",
                values.totalQuantity ? values.totalQuantity : ""
              );
              formData.append(
                "item_category_id",
                values.item_category_id ? values.item_category_id : ""
              );
              resetForm({ values: "" });

              dispatch(
                InventoryService.EditInventory(formData, setUpdated, updated)
                  .then(
                    (response) =>
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "Inventory Edited Successfully",
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

  const showSingleItemDetail = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Item Details",
        html: (
          <AssignInventory
            values={values}
            inventoryDetail={inventoryDetail}
            salesDetail={salesDetail}
            onSubmit={(values) => {
              dispatch(
                InventoryService.AssignInventory(
                  values.item_id,
                  values.sales_id,
                  userID
                )

                  .then((response) => {
                    setUpdated(!updated);
                    return (
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "Inventory Assigned Successfully",
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

  const showAssignLoanForm = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Assign Loan",
        html: (
          <AssignLoan
            inventoryDetail={inventoryDetail}
            loanConfigDetail={loanConfigDetail}
            values={values}
            onSubmit={(values) => {
              dispatch(
                LoanConfigService.AssignLoanConfig(
                  values.item_id,
                  values.loan_conf_id,
                  userID
                )
                  .then((response) => {
                    setUpdated(!updated);
                    return (
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "Item Assigned to Loan Successfully",
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
  const showAddExpenseForm = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Add Expense",
        html: (
          <AddExpense
            inventoryDetail={inventoryDetail}
            values={values}
            general={false}
            product={false}
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
                    item_id: values.item_id,
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
      item_type: "",
      picture: "",
      item_code: "",
      item_price: "",
      item_name: "",
      loan_limit: "",
      merchant_id: userID,
      purchaseDate: currentDate,
      item_category_id: "",
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const showEditModal = (data) => {
    showEditFormModal(
      {
        item_id: data.item_id,
        item_type: data.item_type,
        item_code: data.item_code,
        item_price: data.item_price,
        item_name: data.item_name,
        loan_limit: data.loan_limit,
        totalQuantity: data.totalQuantity,
        totalBuyPrice: data.totalBuyPrice,
        reorderPointUnit: data.reorderPointUnit,
        purchaseDate: data.purchaseDate.split("T")[0] || currentDate,
        supplier: data.supplier,
        location: data.location,
        description: data.description,
        item_category_id: data.item_category_id,
        picture: data.picture,
        merchant_id: userID,
      },
      data
    )
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const showDetailModal = (data) => {
    showSingleItemDetail({
      item_id: data.item_id ? data?.item_id : "",
      sales_id: "",
      merchant_id: userID,
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };
  const showAssignLoan = (data) => {
    showAssignLoanForm({
      item_id: data.item_id ? data?.item_id : "",
      loan_conf_id: "",
      merchant_id: userID,
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const showAddExpense = (data) => {
    showAddExpenseForm({
      item_id: data.item_id ? data?.item_id : "",
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
      [...inventoryDetail].sort((a, b) =>
        a.item_name.localeCompare(b.item_name)
      ),
    [inventoryDetail]
  );

  const ExpandableTableComponent = ({ data }) => {
    const loanColumns = [
      {
        name: "Interest Rate",
        selector: (row) => row.interest_rate,
        sortable: true,
      },
      {
        name: "Duration",
        selector: (row) => row.duration,
        sortable: true,
      },
      {
        name: "totalAmountWithInterest",
        selector: (row) => row?.items_loan?.totalAmountWithInterest,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row) => (
          <input
            onChange={() => setToggleInput(!toggleInput)}
            type="checkbox"
            className="toggle toggle-info"
            checked={toggleInput}
          />
        ),
      },
    ];
    // Render the additional table component here
    return (
      <div className="bg-gray-50">
        <div className="m-2 mx-12 border-x-2 border-cyan-500">
          <DataTable
            columns={loanColumns}
            data={data?.loanConfs}
            dense
            persistTableHeadstriped
            highlightOnHover
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <button
        type="button"
        className="mb-4 btn btn-outline btn-primary"
        onClick={showModal}
      >
        Add Inventory
      </button>
      {/* <button
        type="button"
        className="mb-4 ml-2 btn btn-outline btn-primary"
        onClick={showAssignModal}
      >
        Assign Sales
      </button> */}
      {kyc?.rbf === false ? (
        <button
          type="button"
          className="mb-4 ml-2 btn btn-outline btn-primary"
          onClick={showAssignLoan}
        >
          Assign Loan
        </button>
      ) : (
        <button
          type="button"
          className="mb-4 ml-2 btn btn-outline btn-primary"
          onClick={showAddExpense}
        >
          Add Expense
        </button>
      )}
      <DataTable
        columns={columns}
        data={sortedData}
        pagination
        persistTableHeadstriped
        highlightOnHover
        dense
        expandableRows={kyc?.rbf === false ? true : false}
        expandableRowDisabled={(row) =>
          row?.loanConfs?.length > 0 ? false : true
        }
        expandableRowsComponent={ExpandableTableComponent}
      />
    </div>
  );
}

export default Inventory;
