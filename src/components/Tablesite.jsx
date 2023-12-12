import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import M2settingView from "./M2settingView";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import { ModalForm } from "./ModalForm";
import BankAccountServices from "../services/bank-account.services";
import { approvePendingBussiness } from "../store/actions/BussinessAction";
import Otp from "./Otp";
import UserService from "../services/user.service";
import DataTable from "react-data-table-component";

const MySwal = withReactContent(Swal);

function Tablesite(props) {
  const bussinesResponse = useSelector((state) => state.bussinessInfo);
  const { loading, error, response, pendingBussiness } = bussinesResponse;
  const dispatch = useDispatch();
  const tableData = props.request;
  const interpretResponse = (response) => {
    if (response.response === "success" && response.responseCode === "200") {
      Swal.fire({
        icon: "success",
        title: "Bussiness Approved",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (response.responseCode === 403 && response.respone === "error") {
      Swal.fire({
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Bussiness Is Not Created",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const showFormModal = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Activate this Account",
        html: (
          <M2settingView
            modal_data={values}
            // title="View Unactivated Account"
            onSubmit={(value) => {
              dispatch(
                approvePendingBussiness({ id: value, interpretResponse })
              );
            }}
            onCancel={() => {
              Swal.close();
            }}
          />
        ),
        customClass: "swal-width",

        onClose: () => reject(),
        showConfirmButton: false,
      });
    });
  };

  const showSecondModal = (index) => {
    showFormModal(index)
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  const columns = [
    {
      name: "Legal Name",
      selector: (row) => row.legalName,
      sortable: true,
    },
    {
      name: "Incorporation Type",
      selector: (row) => row.incorporationType,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "View",
      cell: (row) => (
        <label
          htmlFor="my-modal-3"
          className="cursor-pointer"
          onClick={() => showSecondModal(row)}
        >
          <svg
            className="w-6 h-6 text-primary"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
        </label>
      ),
    },
  ];

  if (tableData) {
    const showModal = (index) => {
      showFormModal(tableData[index])
        .then((values) => values)
        .catch(() => console.log("Modal closed"));
    };

    return (
      <>
        <DataTable
          title="Activate Business"
          columns={columns}
          data={tableData}
          pagination
          // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          // subHeaderComponent={subHeaderComponentMemo}
          // selectableRows
          persistTableHeadstriped
          highlightOnHover
          // actions={actionsMemo}
        />
      </>
    );
  }
}

export default Tablesite;
