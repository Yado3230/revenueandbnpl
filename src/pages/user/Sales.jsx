import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddSales from "./AddSales";
import { useSelector, useDispatch } from "react-redux";
import UserService from "../../services/user.service";
import { useEffect } from "react";
import {
  getSalesDetail,
  getSalesKyc,
} from "../../store/actions/getSalesAction";
import { useState } from "react";
import SalesKycApprove from "./KYCApproveModal";

const MySwal = withReactContent(Swal);

const columns = [
  {
    name: "Sales Id",
    selector: (row) => row.sales_id,
    sortable: true,
  },
  {
    name: "First Name",
    selector: "firstName",
    sortable: true,
  },
  {
    name: "Last Name",
    selector: "lastName",
    sortable: true,
  },
  {
    name: "Username",
    selector: (row) =>
      row.phone_number ? row.phone_number : row.email_address,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.emailStatus,
    sortable: true,
  },
];

function Sales() {
  const userData = useSelector((state) => state.userProfile);
  const [updated, setUpdated] = useState(true);
  const { userID } = userData;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("registered");
  const [filteredData, setFilteredData] = useState([]);

  const kycCol = [
    {
      name: "Sales ID",
      selector: "sales_id",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "first_name",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "last_name",
      sortable: true,
    },
    {
      name: "TIN Number",
      selector: "tin_number",
      sortable: true,
    },
    {
      name: "status",
      cell: (row) => {
        return (
          <div>
            {row.status?.toLowerCase() === "pending" ? (
              <div
                onClick={() => {
                  // setLoanToApprove(row);
                  showKYCApproveModal(row);
                }}
                className="btn btn-outline  btn-xs w-24 btn-accent"
              >
                <span>APPROVE</span>
              </div>
            ) : row.status.toLowerCase() === "rejected" ? (
              <div className="border flex items-center justify-center rounded-lg bg-orange-500 w-24 h-6">
                <span className="text-white">REJECTED</span>
              </div>
            ) : (
              row.status.toLowerCase() === "approved" && (
                <div className="border flex items-center justify-center rounded-lg bg-cyan-500 w-24 h-6">
                  <span className="text-white">APPROVED</span>
                </div>
              )
            )}
          </div>
        );
      },
      left: true,
    },
    {
      name: "Requested At",
      selector: (row) => new Date(row.createdAt)?.toISOString().split("T")[0],
      sortable: true,
    },
  ];

  useEffect(() => {
    if (userID) {
      dispatch(getSalesDetail(userID));
      dispatch(getSalesKyc(userID));
    }
  }, [userID, updated, dispatch]);

  const salesData = useSelector((state) => state.salesInfo);
  const { salesDetail, salesKyc } = salesData;
  useEffect(() => {
    const filterData =
      salesKyc &&
      (activeTab === "all"
        ? salesKyc
        : activeTab === "pending"
        ? salesKyc.filter((item) => item.status?.toLowerCase() === "pending")
        : activeTab === "accepted"
        ? salesKyc.filter((item) => item.status?.toLowerCase() === "approved")
        : activeTab === "rejected"
        ? salesKyc.filter((item) => item.status?.toLowerCase() === "rejected")
        : activeTab === "registered" && salesDetail && salesDetail);

    setFilteredData(filterData);
  }, [activeTab, salesKyc, salesDetail]);

  const showFormModalSales = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Register Sales",
        html: (
          <AddSales
            values={values}
            onSubmit={(values) => {
              dispatch(
                UserService.CreateSales(
                  values.username,
                  values.firstName,
                  values.lastName,
                  userID,
                  setUpdated,
                  updated
                )
                  .then(
                    (response) =>
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "Sales Created Successfully",
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

  const showModalSales = () => {
    showFormModalSales({
      username: "",
      firstName: "",
      lastName: "",
      merchant_id: userID,
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const showKycApproveModal = (row) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Approve Sales Request",
        customClass: {
          popup: "custom-popup-class", // Add a custom class to the popup
          content: "custom-content-class", // Add a custom class to the content
        },
        html: (
          <SalesKycApprove
            sales={row}
            userID={userID}
            dispatch={dispatch}
            setUpdated={setUpdated}
            updated={updated}
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

  const showKYCApproveModal = (row) => {
    showKycApproveModal(row)
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
        Add New Sales
      </button>
      <div className="tabs tabs-boxed">
        {/* <a
          className={`tab ${activeTab === "all" && "tab-active"}`}
          onClick={() => setActiveTab("all")}
          style={{
            color: activeTab === "all" ? "white" : null,
            backgroundColor: activeTab === "all" ? "#01BBF2" : null,
          }}
        >
          All KYC
        </a>
        <a
          className={`tab ${activeTab === "pending" && "tab-active"}`}
          onClick={() => setActiveTab("pending")}
          style={{
            color: activeTab === "pending" ? "white" : null,
            backgroundColor: activeTab === "pending" ? "#01BBF2" : null,
          }}
        >
          Pending KYC
        </a>
        <a
          className={`tab ${
            activeTab === "accepted" && "tab-active text-white"
          }`}
          onClick={() => setActiveTab("accepted")}
          style={{
            color: activeTab === "accepted" ? "white" : null,
            backgroundColor: activeTab === "accepted" ? "#01BBF2" : null,
          }}
        >
          Accepted KYC
        </a>
        <a
          className={`tab ${activeTab === "rejected" && "tab-active"}`}
          style={{
            color: activeTab === "rejected" ? "white" : null,
            backgroundColor: activeTab === "rejected" ? "#01BBF2" : null,
          }}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected KYC
        </a> */}
        <span
          className={`tab ${activeTab === "registered" && "tab-active"}`}
          onClick={() => setActiveTab("registered")}
          style={{
            color: activeTab === "registered" ? "white" : null,
            backgroundColor: activeTab === "registered" ? "#01BBF2" : null,
          }}
        >
          Registered Sales
        </span>
      </div>
      <DataTable
        columns={activeTab === "registered" ? columns : kycCol}
        data={filteredData}
        pagination
        persistTableHeadstriped
        highlightOnHover
      />
    </div>
  );
}

export default Sales;
