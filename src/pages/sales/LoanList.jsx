import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getSalesPayments } from "../../store/actions/getSalesAction";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import {
//   getLoanDetail,
//   // setLoanToApprove,
// } from "../../store/actions/loanAction";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import "./alert.css";

// const MySwal = withReactContent(Swal);

const Loans = () => {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();

  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 10; // Number of items per page

  // const userData = useSelector((state) => state.userProfile);
  // // const { username } = userData;

  useEffect(() => {
    dispatch(getSalesPayments());
  }, [dispatch]);

  const salesData = useSelector((state) => state.salesInfo);
  const { payments } = salesData;

  const loans = [
    {
      salesId: 1,
      itemId: 2,
      loanPurpose: "housing",
      loanAmount: 2000,
      interestRate: 5,
      cumulativeInterest: 25,
      totalRepayment: 2025,
      approvalStatus: "PENDING",
      requestedAt: "10/02/2022",
    },
    {
      salesId: 1,
      itemId: 2,
      loanPurpose: "housing",
      loanAmount: 2000,
      interestRate: 5,
      cumulativeInterest: 25,
      totalRepayment: 2025,
      approvalStatus: "APPROVED",
      requestedAt: "10/02/2022",
    },
    {
      salesId: 1,
      itemId: 2,
      loanPurpose: "housing",
      loanAmount: 2000,
      interestRate: 5,
      cumulativeInterest: 25,
      totalRepayment: 2025,
      approvalStatus: "REJECTED",
      requestedAt: "10/02/2022",
    },
    {
      salesId: 1,
      itemId: 2,
      loanPurpose: "housing",
      loanAmount: 2000,
      interestRate: 5,
      cumulativeInterest: 25,
      totalRepayment: 2025,
      approvalStatus: "APPROVED",
      requestedAt: "10/02/2022",
    },
  ];

  const columns = [
    {
      name: "Amount",
      selector: (row) => row?.amount,
      sortable: true,
    },
    {
      name: "Tip",
      selector: (row) => row?.tip_amount,
      sortable: true,
    },
    {
      name: "Discount",
      selector: (row) => row?.discount,
      sortable: true,
    },
    {
      name: "Currency",
      selector: (row) => row?.currency,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row?.payment_method,
      sortable: true,
    },
    {
      name: "Payed At",
      selector: (row) => new Date(row?.createdAt)?.toISOString()?.split("T")[0],
      sortable: true,
    },
  ];

  const ExpandableTableComponent = ({ data }) => {

    const loanColumns = [
      {
        name: "Item ID",
        selector: (row) => row.itemItemId,
        sortable: true,
      },
      {
        name: "Item Sale Price",
        selector: (row) => row.item_sale_price,
        sortable: true,
      },
      {
        name: "Quantity",
        selector: (row) => row.quantity,
        sortable: true,
      },
      {
        name: "Payed At",
        selector: (row) =>
          new Date(row?.createdAt)?.toISOString()?.split("T")[0],
        sortable: true,
      },
    ];

    return (
      <div className="bg-gray-50">
        <span className="ml-2 py-1 text-xl text-cyan-500 font-semibold">
          Sold Items
        </span>
        <div className="m-2 mx-12 border-x-2 border-cyan-500">
          <DataTable
            columns={loanColumns}
            data={data || []}
            // pagination
            dense
            persistTableHeadstriped
            highlightOnHover
            // expandableRows
            // expandableRowsComponent={ExpandableTableComponent}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container mx-auto">
        <span className="ml-2 py-1 text-3xl text-cyan-500 font-semibold">
          Payments
        </span>
        <div className="my-4">
          <div className="bg-white rounded-b-lg shadow p-4">
            <DataTable
              columns={columns}
              data={payments}
              dense
              highlightOnHover
              pagination
              expandableRows
              expandableRowsComponent={({ data }) => (
                <ExpandableTableComponent data={data?.sold_items} />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
