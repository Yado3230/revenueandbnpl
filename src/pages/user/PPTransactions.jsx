import React, { useMemo, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllPaypalTransactionById,
  getChappaTransactionById,
  getCoopassPaymentById,
  getEbirrTransactionById,
  getStripePaymentById,
} from "../../store/actions/adminFetchAllTransactions";
import jwtDecode from "jwt-decode";
import Spinner from "../../components/Spinner/Spinner";

const CustomLoader = () => (
  <div>
    <h1>Loading data...</h1>
    <Spinner />
  </div>
);

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

const columns = [
  {
    name: "Transaction ID",
    selector: (row) => row.transactionId,
    sortable: true,
  },
  {
    name: "Credit Account",
    selector: (row) => row.creditAccount,
    sortable: true,
  },

  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: "Payee Phone",
    selector: (row) => row.payeePhone,
    sortable: true,
  },
  {
    name: "TRANSACTION_DATE",
    selector: (row) => new Date(row.createdAt)?.toISOString().split("T")[0],
    sortable: true,
  },
  {
    name: "PROCESSINGDATE",
    selector: (row) => new Date(row.updatedAt)?.toISOString().split("T")[0],
    sortable: true,
  },
  {
    name: "TRANSACTIONTYPE",
    selector: (row) => row.paymentService,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
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

function TransactionList() {
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
    if (csv == null) return;
    //Make dynamic the name of file
    let d = new Date();
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
  const { loading, error, transactionDetailAll } = getAllDevices;
  const tokenInfo = useSelector((state) => state.userProfile);
  const { token } = tokenInfo;
  const user_token = jwtDecode(token);
  const merchant_id = user_token?.merchant_id;

  const dispatch = useDispatch();
  useEffect(() => {
    merchant_id && dispatch(getAllPaypalTransactionById(merchant_id));
    merchant_id && dispatch(getCoopassPaymentById(merchant_id));
    merchant_id && dispatch(getStripePaymentById(merchant_id));
    merchant_id && dispatch(getEbirrTransactionById(merchant_id));
    merchant_id && dispatch(getChappaTransactionById(merchant_id));
  }, []);

  const transactionData = useSelector((state) => state.transactionDetailAll);
  const {
    paypalTransactions,
    coopassTransaction,
    stripeTransaction,
    ebirrTransactions,
    chappaTransactions,
  } = transactionData;

  const [filterText, setFilterText] = React.useState("");
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(transactionDetailAll)} />,
    []
  );
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = transactionDetailAll.filter(
    (item) =>
      item.transactionID &&
      item.transactionID.toLowerCase().includes(filterText.toLowerCase())
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

  const [Bank, setBank] = useState(true);
  const [Paypal, setPaypal] = useState(false);
  const [Stripe, setStripe] = useState(false);
  const [Ebirr, setEbirr] = useState(false);
  const [chappa, setChappa] = useState(false);
  const bankFunc = () => {
    setBank(true);
    setPaypal(false);
    setStripe(false);
    setEbirr(false);
    setChappa(false);
  };
  const ebirrFunc = () => {
    setEbirr(true);
    setBank(false);
    setPaypal(false);
    setStripe(false);
    setChappa(false);
  };
  const paypalFunc = () => {
    setBank(false);
    setPaypal(true);
    setStripe(false);
    setEbirr(false);
    setChappa(false);
  };
  const stripeFunc = () => {
    setBank(false);
    setPaypal(false);
    setStripe(true);
    setEbirr(false);
    setChappa(false);
  };
  const chappaFunc = () => {
    setBank(false);
    setPaypal(false);
    setStripe(false);
    setEbirr(false);
    setChappa(true);
  };

  return (
    <div className="">
      <div className="">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 testdark:border-gray-700 testdark:text-gray-400">
          <li className="mr-2">
            <button
              className={
                "inline-block p-4 rounded-t-lg " +
                (Bank
                  ? "text-gray-600 bg-gray-50 testdark:hover:bg-gray-800 testdark:hover:text-gray-300"
                  : "text-blue-600 bg-gray-100 active testdark:bg-gray-800 testdark:text-blue-500")
              }
              onClick={bankFunc}
            >
              Coopass
            </button>
          </li>
          <li className="mr-2">
            <button
              className={
                "inline-block p-4 rounded-t-lg " +
                (Ebirr
                  ? "text-gray-600 bg-gray-50 testdark:hover:bg-gray-800 testdark:hover:text-gray-300"
                  : "text-blue-600 bg-gray-100 active testdark:bg-gray-800 testdark:text-blue-500")
              }
              onClick={ebirrFunc}
            >
              Ebirr
            </button>
          </li>
          <li className="mr-2">
            <button
              className={
                "inline-block p-4 rounded-t-lg " +
                (Paypal
                  ? "text-gray-600 bg-gray-50 testdark:hover:bg-gray-800 testdark:hover:text-gray-300"
                  : "text-blue-600 bg-gray-100 active testdark:bg-gray-800 testdark:text-blue-500")
              }
              onClick={paypalFunc}
            >
              PayPal
            </button>
          </li>
          <li className="mr-2">
            <button
              className={
                "inline-block p-4 rounded-t-lg " +
                (Stripe
                  ? "text-gray-600 bg-gray-50 testdark:hover:bg-gray-800 testdark:hover:text-gray-300"
                  : "text-blue-600 bg-gray-100 active testdark:bg-gray-800 testdark:text-blue-500")
              }
              onClick={stripeFunc}
            >
              Stripe
            </button>
          </li>
          <li className="mr-2">
            <button
              className={
                "inline-block p-4 rounded-t-lg " +
                (chappa
                  ? "text-gray-600 bg-gray-50 testdark:hover:bg-gray-800 testdark:hover:text-gray-300"
                  : "text-blue-600 bg-gray-100 active testdark:bg-gray-800 testdark:text-blue-500")
              }
              onClick={chappaFunc}
            >
              Chappa
            </button>
          </li>
        </ul>
      </div>
      {/* {Bank ? ( */}
      <DataTable
        title="Transaction Lists"
        columns={columns}
        data={
          Bank
            ? coopassTransaction
            : Paypal
            ? paypalTransactions
            : Ebirr
            ? ebirrTransactions
            : Stripe
            ? stripeTransaction
            : chappa && chappaTransactions
        }
        pagination
        // selectableRows
        progressPending={loading}
        progressComponent={<CustomLoader />}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        dense
      />
      {/* ) : null} */}
    </div>
  );
}

export default TransactionList;
