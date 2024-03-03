import React from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getSalesDetail } from "../../store/actions/getSalesAction";
import { useState } from "react";
import LoanConfigService from "../../services/loanConfig.service";
import { getLoanConfigDetail } from "../../store/actions/getLoanConfigAction";
import Swal from "sweetalert2";
import { getAllCategoryData } from "../../store/actions/conf.action";
import ConfigService from "../../services/conf.service";

function Configuration() {
  const [activeTab, setActiveTab] = useState("category");
  const [updated, setUpdated] = useState();
  const userData = useSelector((state) => state.userProfile);
  const { userID, kyc } = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoanConfigDetail(userID));
    dispatch(getAllCategoryData());
  }, [userID, updated, dispatch]);

  const loanConfigData = useSelector((state) => state.loanConfigInfo);
  const { loanConfigDetail } = loanConfigData;

  const categoryData = useSelector((state) => state.confInfo);
  const { categories } = categoryData;

  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState({
    interest_rate: "",
    duration: "",
    merchant_id: userID,
  });
  const [categorydata, setCategoryData] = useState({
    type: "",
    merchant_id: userID,
  });

  const handleEdit = (row) => {
    setData({
      ...data,
      loan_conf_id: row.loan_conf_id,
      interest_rate: row.interest_rate,
      duration: row.duration,
      merchant_id: userID,
    });
    setIsEdit(true);
  };
  // const handleCategoryEdit = (row) => {
  //   setCategoryData({
  //     ...categorydata,
  //     category_id: row.category_id,
  //     item_type: row.item_type,
  //     item_code: row.item_code,
  //     merchant_id: userID,
  //   });
  //   setIsEdit(true);
  // };

  const categoryColumn = [
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt)?.toISOString().split("T")[0],
      sortable: true,
    },
  ];

  const columns = [
    {
      name: "Title",
      selector: (row) => row.interest_rate,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt)?.toISOString().split("T")[0],
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <svg
          className="cursor-pointer h-6 w-6 text-orange-500"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={() => handleEdit(row)}
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
          <line x1="16" y1="5" x2="19" y2="8" />
        </svg>
      ),
      sortable: true,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categorydata,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    try {
      isEdit
        ? dispatch(
            LoanConfigService.EditLoanConfig(data)
              .then((response) => {
                setUpdated(!updated);
                return (
                  response &&
                  Swal.fire({
                    icon: "success",
                    title: "Edited Successfully",
                    showConfirmButton: false,
                    timer: 3000,
                  })
                );
              })
              .catch((error) => {
                setUpdated(!updated);
                return (
                  error &&
                  Swal.fire({
                    icon: "error",
                    title: `Something went wrong`,
                    showConfirmButton: false,
                    timer: 3000,
                  })
                );
              })
          )
        : dispatch(
            LoanConfigService.CreateLoanConfig(data)
              .then(
                (response) =>
                  response &&
                  Swal.fire({
                    icon: "success",
                    title: "Created Successfully",
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
    } catch (error) {
      return error;
    }
  };
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        ConfigService.createCategory(categorydata, setUpdated, updated)
          .then(
            (response) =>
              response &&
              Swal.fire({
                icon: "success",
                title: "Created Successfully",
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
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <span className="text-xl p-2 font-bold my-5">Configurations</span>
      <div className="my-4">
        {!kyc.rbf ? (
          <div className="flex-wrap">
            <button
              className={`px-6 py-2 rounded-tl-lg ${
                activeTab === "category"
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("category")}
            >
              Item Category
            </button>
            <button
              className={`px-6 py-2 ${
                activeTab === "loan" ? "bg-cyan-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("loan")}
            >
              Loan Config
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="bg-white rounded-b-lg shadow p-4">
          {activeTab === "loan" ? (
            <div className="">
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="md:flex md:space-x-4 mb-4 items-center"
                >
                  <div className="grid flex-grow gap-6 mb-4 grid-cols-4 sm:mb-5">
                    <div className="w-full col-span-2">
                      <label
                        htmlFor="interest_rate"
                        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Interest Rate (%):
                      </label>
                      <span className="text-sm link-error">
                        {/* <ErrorMessage name="interest_rate"></ErrorMessage> */}
                      </span>
                      <input
                        type="number"
                        name="interest_rate"
                        id="interest_rate"
                        placeholder="Percent"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.interest_rate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full col-span-2">
                      <label
                        htmlFor="duration"
                        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Duration (months):
                      </label>
                      <span className="text-sm link-error">
                        {/* <ErrorMessage name="duration"></ErrorMessage> */}
                      </span>
                      <input
                        type="number"
                        name="duration"
                        id="duration"
                        placeholder="Month"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.duration}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      style={{ backgroundColor: "#01AFEF" }}
                      className="swal2-confirm h-10 flex items-center swal2-styled"
                    >
                      {isEdit ? "Update" : "Register"}
                    </button>
                  </div>
                </form>
              </div>
              <DataTable
                columns={columns}
                data={loanConfigDetail}
                pagination
                persistTableHeadstriped
                highlightOnHover
              />
            </div>
          ) : (
            <div className="">
              <div>
                <form
                  onSubmit={handleCategorySubmit}
                  className="md:flex md:space-x-4 mb-4 items-center"
                >
                  <div className="grid flex-grow gap-6 mb-4 grid-cols-4 sm:mb-5">
                    <div className="w-full col-span-4">
                      <label
                        htmlFor="interest_rate"
                        className="mb-3 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category Name:
                      </label>
                      <span className="text-sm link-error">
                        {/* <ErrorMessage name="interest_rate"></ErrorMessage> */}
                      </span>
                      <input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Category Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={categorydata.type}
                        onChange={handleCategoryChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      style={{ backgroundColor: "#01AFEF" }}
                      className="swal2-confirm h-10 flex items-center swal2-styled"
                    >
                      {isEdit ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
              {kyc.rbf === true && (
                <DataTable
                  columns={categoryColumn}
                  data={categories}
                  pagination
                  persistTableHeadstriped
                  highlightOnHover
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Configuration;
