import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import AddExpense from "./AddExpense";
import { useDispatch, useSelector } from "react-redux";
import ExpenseService from "../../services/expense.service";
import { getAllMerchantExpenses } from "../../store/actions/expense.action";
import { useEffect } from "react";
import CustomizedMenus from "./OptionDropdown";

const MySwal = withReactContent(Swal);

const Expense = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("registered");
  const [updated, setUpdated] = useState(false);
  const userData = useSelector((state) => state.userProfile);
  const { kyc } = userData;

  useEffect(() => {
    dispatch(getAllMerchantExpenses());
  }, [updated, dispatch]);

  const columns = [
    {
      name: "Expense Id",
      selector: (row) => row.expense_id,
      sortable: true,
    },
    {
      name: "Expense Name",
      selector: (row) => row.expense_name,
      sortable: true,
    },
    {
      name: "Expense Amount",
      selector: "expense_amount",
      sortable: true,
    },
    {
      name: "Expense Category",
      selector: "expense_category",
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: "paymentMethod",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <CustomizedMenus
          data={row}
          kyc={kyc}
          expense={true}
          showEditModal={showEditModal}
        />
      ),
    },
  ];

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { inventoryDetail } = inventoryInfo;

  const expenseData = useSelector((state) => state.expenseInfo);
  const { expenses } = expenseData;

  const showEditModal = (data) => {
    showEditFormModal(
      {
        expense_name: data?.expense_name,
        expense_amount: data?.expense_amount,
        expense_date: data?.expense_date,
        expense_category: data?.expense_category,
        paymentMethod: data?.paymentMethod,
        expense_receipURL: data?.expense_receipURL,
        description: data?.description,
        status: data?.status,
        expense_id: data?.expense_id,
      },
      data
    )
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const showEditFormModal = (values, data) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Edit Expense",
        html: (
          <AddExpense
            inventoryDetail={inventoryDetail}
            values={values}
            general={true}
            data={data}
            kyc={kyc}
            isUpdate={true}
            onSubmit={(values) => {
              dispatch(
                ExpenseService.editExpense(
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
                    expense_id: values?.expense_id,
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

  const showAddExpenseForm = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Add Expense",
        html: (
          <AddExpense
            inventoryDetail={inventoryDetail}
            values={values}
            general={true}
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

  const showModalSales = () => {
    showAddExpenseForm({
      expense_name: "",
      expense_amount: "",
      expense_date: "",
      expense_category: "",
      paymentMethod: "",
      expense_receipURL: [],
      description: "",
      status: "",
      item_id: "",
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  return (
    <div>
      <button
        type="button"
        className="mb-4 btn btn-outline btn-primary"
        onClick={showModalSales}
      >
        Add Expense
      </button>
      <div className="tabs tabs-boxed">
        <span
          className={`tab ${activeTab === "registered" && "tab-active"}`}
          onClick={() => setActiveTab("registered")}
          style={{
            color: activeTab === "registered" ? "white" : null,
            backgroundColor: activeTab === "registered" ? "#01BBF2" : null,
          }}
        >
          Expenses
        </span>
      </div>
      <DataTable
        columns={columns}
        data={expenses}
        pagination
        dense
        persistTableHeadstriped
        highlightOnHover
      />
    </div>
  );
};

export default Expense;
