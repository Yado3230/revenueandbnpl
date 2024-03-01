import React, { useMemo, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";

import { getLoanRequests } from "../../store/actions/capacityAction";
const MySwal = withReactContent(Swal);
const columns = [
  {
    name: "Loan Amount",
    selector: (row) => row.appliedAmount,
    sortable: true,
  },
  {
    name: "Total Repayment",
    selector: (row) => row.totalRepayment,
    sortable: true,
  },
  {
    name: "Term",
    selector: (row) => row.payOffMonth,
    sortable: true,
  },
  {
    name: "Agreement File",
    selector: (row) => row.agreementFile,
    cell: (row) => {
      return <div>{row.agreementFile}</div>;
    },
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Requested At",
    selector: (row) => new Date(row.createdDate).toISOString().split("T")[0],
    sortable: true,
  },
];

function MerchantLoanList() {
  const addedDomain = useSelector((state) => state.domain);
  const userData = useSelector((state) => state.userProfile);
  const { userID } = userData;
  const { loading } = addedDomain;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoanRequests(userID));
  }, [userID]);

  const capacityData = useSelector((state) => state.capacityInfo);
  const { merchantLoan } = capacityData;

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <input
        id="search"
        type="text"
        placeholder="Filter By Title"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary focus:border-primary block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <button
        type="button"
        onClick={onClear}
        className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-3.5 py-2.5 mr-2 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
      >
        Clear
      </button>
    </>
  );

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(merchantLoan[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <button
      onClick={(e) => onExport(e.target.value)}
      className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-2.5 py-2.5 mr-4 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
    >
      Export
    </button>
  );

  const [filterText, setFilterText] = React.useState("");
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(merchantLoan)} />,
    []
  );
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = merchantLoan?.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const interpretResponse = (response) => {
    let actionResponse = JSON.stringify(response);
    if (response.response === "success" && response.responseCode == 201) {
      Swal.fire({
        icon: "success",
        title: "Domain Created",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (response.responseCode == 403 && response.respone === "error") {
      Swal.fire({
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (response.responseCode === 401 || response.respone === "error") {
      Swal.fire({
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Domain Is Not Created",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="">
      {loading ? (
        "Loading"
      ) : (
        <DataTable
          title="Loan Request Lists"
          columns={columns}
          data={merchantLoan}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHeadstriped
          highlightOnHover
          actions={actionsMemo}
        />
      )}
    </div>
  );
}

export default MerchantLoanList;
