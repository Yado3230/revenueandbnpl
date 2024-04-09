import React, { useState } from "react";
import DataTable from "react-data-table-component";

const Loans = () => {
  const [activeTab, setActiveTab] = useState("all");
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

  const filterData = () => {
    if (activeTab === "pending") {
      return loans.filter(
        (item) =>
          item?.approvalStatus === "PENDING" ||
          item?.approvalStatus === "IN_PROCESS"
      );
    } else if (activeTab === "approved") {
      return loans.filter((item) => item.approvalStatus === "APPROVED");
    } else if (activeTab === "rejected") {
      return loans.filter((item) => item.approvalStatus === "REJECTED");
    } else {
      return loans;
    }
  };

  const filteredData = filterData();

  const columns = [
    {
      name: "Sales ID",
      selector: (row) => row?.salesId,
      sortable: true,
    },
    {
      name: "Item ID",
      selector: (row) => row?.itemId,
      sortable: true,
    },
    {
      name: "Loan Purpose",
      selector: (row) => row?.loanPurpose,
      sortable: true,
    },
    {
      name: "Loan Amount",
      selector: (row) => row?.loanAmount,
      sortable: true,
    },
    {
      name: "Interest Rate",
      selector: (row) => row?.interestRate,
      sortable: true,
    },
    {
      name: "Comulative Interest",
      selector: (row) => row?.cumulativeInterest,
      sortable: true,
    },
    {
      name: "Total Payment",
      selector: (row) => row?.totalRepayment,
      sortable: true,
    },
    {
      name: "status",
      cell: (row) => {
        return (
          <div>
            {row?.approvalStatus === "PENDING" ? (
              <div className="flex items-center justify-center w-24 h-6 bg-gray-300 border rounded-lg">
                <span className="text-black">PENDING</span>
              </div>
            ) : row?.approvalStatus === "IN_PROCESS" ? (
              <div className="flex items-center justify-center w-24 h-6 bg-green-500 border rounded-lg">
                <span className="text-white">IN_PROCESS</span>
              </div>
            ) : row?.approvalStatus === "REJECTED" ? (
              <div className="flex items-center justify-center w-24 h-6 bg-orange-500 border rounded-lg">
                <span className="text-white">REJECTED</span>
              </div>
            ) : (
              row?.approvalStatus === "APPROVED" && (
                <div className="flex items-center justify-center w-24 h-6 border rounded-lg bg-cyan-500">
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
      selector: (row) =>
        new Date(row?.requestedAt)?.toISOString().split("T")[0],
      sortable: true,
    },
  ];

  const ExpandableTableComponent = ({ data }) => {
    const testData = [
      {
        payment_date: "10/20/2023",
        biginning_balance: 20000,
        scheduled_payment: "housing",
        total_payment: 2000,
        principal: 5,
        interest: 25,
        ending_balance: 2025,
        cumulative_interest: "PENDING",
      },
      {
        payment_date: "10/20/2023",
        biginning_balance: 20000,
        scheduled_payment: "housing",
        total_payment: 2000,
        principal: 5,
        interest: 25,
        ending_balance: 2025,
        cumulative_interest: "PENDING",
      },
      {
        payment_date: "10/20/2023",
        biginning_balance: 20000,
        scheduled_payment: "housing",
        total_payment: 2000,
        principal: 5,
        interest: 25,
        ending_balance: 2025,
        cumulative_interest: "PENDING",
      },
    ];

    const loanColumns = [
      {
        name: "Payment Date",
        selector: (row) => row.payment_date,
        sortable: true,
      },
      {
        name: "Beginning Balance",
        selector: (row) => row.biginning_balance,
        sortable: true,
      },
      {
        name: "Scheduled Payment",
        selector: (row) => row?.scheduled_payment,
        sortable: true,
      },
      {
        name: "Total Payment",
        selector: (row) => row?.total_payment,
        sortable: true,
      },
      {
        name: "Principal",
        selector: (row) => row?.principal,
        sortable: true,
      },
      {
        name: "Interest",
        selector: (row) => row?.interest,
        sortable: true,
      },
      {
        name: "Ending Balance",
        selector: (row) => row?.ending_balance,
        sortable: true,
      },
      {
        name: "Cumulative Interest",
        selector: (row) => row?.cumulative_interest,
        sortable: true,
      },
    ];
    return (
      <div className="bg-gray-50">
        <span className="py-1 ml-2 text-xl font-semibold text-cyan-500">
          Repayment Schedule
        </span>
        <div className="m-2 mx-12 border-x-2 border-cyan-500">
          <DataTable
            columns={loanColumns}
            data={testData}
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
        <div className="my-4">
          <div className="tabs tabs-boxed">
            <span
              className={`tab ${activeTab === "all" && "tab-active"}`}
              onClick={() => setActiveTab("all")}
              style={{
                color: activeTab === "all" ? "white" : null,
                backgroundColor: activeTab === "all" ? "#01BBF2" : null,
              }}
            >
              All
            </span>
            <span
              className={`tab ${activeTab === "pending" && "tab-active"}`}
              onClick={() => setActiveTab("pending")}
              style={{
                color: activeTab === "pending" ? "white" : null,
                backgroundColor: activeTab === "pending" ? "#01BBF2" : null,
              }}
            >
              Pending
            </span>
            <span
              className={`tab ${
                activeTab === "approved" && "tab-active text-white"
              }`}
              onClick={() => setActiveTab("approved")}
              style={{
                color: activeTab === "approved" ? "white" : null,
                backgroundColor: activeTab === "approved" ? "#01BBF2" : null,
              }}
            >
              Accepted
            </span>
            <span
              className={`tab ${activeTab === "rejected" && "tab-active"}`}
              style={{
                color: activeTab === "rejected" ? "white" : null,
                backgroundColor: activeTab === "rejected" ? "#01BBF2" : null,
              }}
              onClick={() => setActiveTab("rejected")}
            >
              Rejected
            </span>
          </div>

          <div className="p-4 bg-white rounded-b-lg shadow">
            <DataTable
              columns={columns}
              data={filteredData}
              dense
              highlightOnHover
              pagination
              expandableRows
              expandableRowDisabled={(row) => row.approvalStatus !== "APPROVED"}
              expandableRowsComponent={ExpandableTableComponent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
