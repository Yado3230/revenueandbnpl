import React, { useEffect, useState, useMemo } from "react";
import Input from "./Input";
import { addBank, gateBanks } from "../store/actions/bankAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BankModal from "./BankModal";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
const MySwal = withReactContent(Swal);

const columns = [
  {
    name: "Bank Name",
    selector: (row) => row.bankName,
    sortable: true,
  },
  {
    name: "Bank Code",
    selector: (row) => row.bankCode,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    title: "Mac123qaz",
    year: "2023",
  },
  {
    id: 2,
    title: "Mac123qaz",
    year: "2022",
  },
];

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
      className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
    >
      Clear
    </button>
  </>
);

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(data[0]);

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

function BankTable() {
  const bankListData = useSelector((state) => state.bankInfo);
  let { bank, banks, response, message, loading } = bankListData;
  // const [backendResponse, setbackendResponse] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gateBanks());
    // dispatch(addBank);
    // setbackendResponse(response);
  }, []);

  const [filterText, setFilterText] = React.useState("");
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
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
    // let actionResponse = JSON.stringify(response);

    if (response.response === "success" || response.responseCode === 200) {
      Swal.fire({
        icon: "success",
        title: "Bank Created",
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
        title: "Bank Is Not Created",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  const fireSwal = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "",
        html: (
          <BankModal
            values={values}
            onSubmit={(values) => {
              dispatch(
                addBank({
                  bankName: values.bankName,
                  bankCode: values.bankCode,
                  interpretResponse,
                })
              );
            }}
            onCancel={() => MySwal.close()}
          ></BankModal>
        ),

        showConfirmButton: false,
      });
    });
  };

  const showModal = () => {
    fireSwal({
      bankName: "",
      bankCode: "",
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  return (
    <>
      <div className="m-4">
        <button
          type="button"
          className="mb-4 btn btn-outline btn-primary"
          onClick={showModal}
        >
          Add Bank
        </button>
        {loading ? (
          "Loading"
        ) : (
          <DataTable
            title="List Of Banks"
            columns={columns}
            data={banks}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            // selectableRows
            persistTableHeadstriped
            highlightOnHover
            actions={actionsMemo}
          />
        )}
      </div>
    </>
  );
}

export default BankTable;
