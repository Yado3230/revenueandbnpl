import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";

// const MySwal = withReactContent(Swal);
const columns = [
  {
    name: "Transaction ID",
    selector: (row) => row.transactionID,
    sortable: true,
  },
  {
    name: "Credit Account",
    selector: (row) => row.CREDITACCTNO,
    sortable: true,
  },
  {
    name: "Debit Account",
    selector: (row) => row.DEBITACCTNO,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.STATUS,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.DEBITAMOUNT,
    sortable: true,
  },
  {
    name: "TRANSACTION_DATE",
    selector: (row) => row.TRANSACTION_DATE,
    sortable: true,
  },
  {
    name: "TRANSACTIONTYPE",
    selector: (row) => row.TRANSACTIONTYPE,
    sortable: true,
  },
];

const data = [
  {
    transactionID: "101",
    CREDITACCTNO: 10003258466,
    DEBITACCTNO: 10000254637,
    STATUS: "Success",
    DEBITAMOUNT: 5500,
    TRANSACTION_DATE: "20/5/2023",
    TRANSACTIONTYPE: "FT",
  },
  {
    transactionID: "102",
    CREDITACCTNO: 10003258466,
    DEBITACCTNO: 10000254637,
    STATUS: "Success",
    DEBITAMOUNT: 2100,
    TRANSACTION_DATE: "20/5/2023",
    TRANSACTIONTYPE: "FT",
  },
  {
    transactionID: "103",
    CREDITACCTNO: 10003258466,
    DEBITACCTNO: 10000254637,
    STATUS: "Success",
    DEBITAMOUNT: 7000,
    TRANSACTION_DATE: "20/5/2023",
    TRANSACTIONTYPE: "FT",
  },
  {
    transactionID: "104",
    CREDITACCTNO: 10003258466,
    DEBITACCTNO: 10000254637,
    STATUS: "Success",
    DEBITAMOUNT: 1300,
    TRANSACTION_DATE: "20/5/2023",
    TRANSACTIONTYPE: "FT",
  },
];

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="text"
      placeholder="Filter By Transaction Id"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary focus:border-primary block p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
    />

    <button
      type="button"
      onClick={onClear}
      className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
    >
      Clear
    </button>
  </>
);

const Export = ({ onExport }) => (
  <button
    onClick={(e) => onExport(e.target.value)}
    className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-3.5 py-2.5 mr-2 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
  >
    Export
  </button>
);

function Transactions() {
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(transactionDetailAll[0]);

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
    if (csv === null) return;
    //Make dynamic the name of file
    // let d = new Date();
    // let dformat = `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
    const filename = "TransactionMomo3.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const getAllDevices = useSelector((state) => state.transactionDetailAll);
  const { transactionDetailAll } = getAllDevices;
  const [filterText, setFilterText] = React.useState("");
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(transactionDetailAll)} />,
    // eslint-disable-next-line
    [transactionDetailAll]
  );
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.transactionID &&
      item.transactionID?.toLowerCase().includes(filterText.toLowerCase())
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

  return (
    <div className="">
      <DataTable
        title="Transaction Lists"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // selectableRows
        persistTableHeadstriped
        highlightOnHover
        fixedHeader
        actions={actionsMemo}
      />
    </div>
  );
}

export default Transactions;
