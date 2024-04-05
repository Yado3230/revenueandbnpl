import React, { useMemo, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevron from "./chevron.svg";

import {
  getLoanRequests,
  getRepaymentSchedule,
} from "../../store/actions/capacityAction";
import CapacityService from "../../services/capacityServices";
import PaymentModal from "./PaymentModal";
import withReactContent from "sweetalert2-react-content";

function RepaymentSchedule() {
  const userData = useSelector((state) => state.userProfile);
  const { userID, kyc } = userData;
  const dispatch = useDispatch();
  const capacityData = useSelector((state) => state.capacityInfo);
  const { merchantLoan, repaymentSchedule, loading } = capacityData;
  const [updated, setUpdated] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  useEffect(() => {
    dispatch(getLoanRequests(userID));
  }, [userID, updated]);

  const defaultCurrency = "ETB"; // Set your default currency here
  const [amount, setAmount] = useState();

  const formatInputValue = (value) => {
    return value?.replace(/\D/g, "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Event handler for input change
  const handleInputChange = (e) => {
    const formattedValue = formatInputValue(e.target.value);
    setAmount(formattedValue?.replace(/,/g, ""));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission
  };

  const [timeLeft, setTimeLeft] = useState(0); // Initial time in seconds

  useEffect(() => {
    // Target date
    const targetDate = new Date(merchantLoan[0]?.approvedAt);
    const twentyFourHoursLater = new Date(
      targetDate.getTime() + 24 * 60 * 60 * 1000
    );

    // Function to calculate time difference between current date and 24 hours past the target date
    const calculateTimeDifference = () => {
      const currentDate = new Date();
      const differenceInSeconds = Math.floor(
        (twentyFourHoursLater - currentDate) / 1000
      );
      setTimeLeft(differenceInSeconds);
    };

    // Call calculateTimeDifference once to set initial time difference
    calculateTimeDifference();

    // Function to update the countdown timer
    const updateCountdown = () => {
      // If timeLeft is already zero, no need to continue countdown
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        return;
      }
      // Decrement timeLeft by 1 second
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    };

    // Call updateCountdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clear the interval when component unmounts or when timeLeft becomes zero
    return () => clearInterval(countdownInterval);
  }, [updated]); // Run this effect only once after initial render

  // Convert timeLeft to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Format the time values
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Define x and get the current date
  let currentDate = new Date();

  // Add x months to the current date
  currentDate.setMonth(currentDate.getMonth() + merchantLoan[0]?.payOffMonth);

  // Format the date
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");

  useEffect(
    () => {
      if (merchantLoan[0]?.id) {
        dispatch(getRepaymentSchedule(merchantLoan[0]?.id));
      }
    },
    [merchantLoan[0]?.id],
    updated
  );

  const paymentColumns = [
    {
      name: "Merchant ID",
      selector: (row) => row.merchantId,
      sortable: true,
    },
    {
      name: "Debit Account",
      selector: (row) => row.debitAccount,
      sortable: true,
    },
    {
      name: "Transaction ID",
      selector: (row) => row.transactionRef,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Currency",
      selector: (row) => row.currency,
      sortable: true,
    },
    {
      name: "Transaction Status",
      selector: (row) => row.transactionStatus,
      sortable: true,
    },
    {
      name: "TRANSACTION_DATE",
      selector: (row) => new Date()?.toISOString().split("T")[0],
      sortable: true,
    },
  ];

  const columns = [
    {
      name: "DUE DATE",
      cell: (row) =>
        new Date(row?.expectedPaymentDate)?.toISOString().split("T")[0],
      sortable: true,
      width: "200px",
    },
    {
      name: "RECEIPTS RATE",
      cell: (row) => row.receiptsRate + "%",
      sortable: true,
      width: "150px",
    },
    {
      name: "REVENUE SHARE MONTHLY",
      cell: (row) => {
        const revenue = row?.revenueShareMonthly?.toFixed(2); // Ensures two decimal places
        return (
          <div className="w-full flex items-center justify-around">
            <span>{revenue?.toLocaleString()}</span>
            <span className="border rounded bg-gray-100 p-1 px-2 border-cyan-500">
              ETB
            </span>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "REVENUE SHARE COMMULATIVE",
      cell: (row) => {
        const revenue = row?.revenueShareCommutative?.toFixed(2); // Ensures two decimal places
        return (
          <div className="w-full flex items-center justify-around">
            <span>{revenue?.toLocaleString()}</span>
            <span className="border rounded bg-gray-100 p-1 px-2 border-cyan-500">
              ETB
            </span>
          </div>
        );
      },
      sortable: true,
      // width: "220px",
    },
    {
      name: "TOTAL DUE AMOUNT",
      selector: "totalAmountDue",
      cell: (row) => {
        const revenue = row?.totalAmountDue?.toFixed(2); // Ensures two decimal places
        return (
          <div className="w-full flex items-center justify-around">
            <span>{revenue?.toLocaleString()}</span>
            <span className="border rounded bg-gray-100 p-1 px-2 border-cyan-500">
              ETB
            </span>
          </div>
        );
      },
      sortable: true,
    },
  ];
  // console.log(merchantLoan);

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <input
        id="search"
        type="text"
        placeholder="Filter By Title"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary focus:border-primary block p-2.5testdark:bg-gray-700testdark:border-gray-600testdark:placeholder-gray-400testdark:text-whitetestdark:focus:ring-blue-500testdark:focus:border-blue-500"
      />

      <button
        type="button"
        onClick={onClear}
        className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-3.5 py-2.5 mr-2 text-centertestdark:bg-primarytestdark:hover:bg-primarytestdark:focus:ring-primary"
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
      className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-2.5 py-2.5 mr-4 text-centertestdark:bg-primarytestdark:hover:bg-primarytestdark:focus:ring-primary"
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

  const AccordionItem = ({ header, ...rest }) => (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          {header}
          <img
            className={`ml-auto transition-transform duration-200 ease-out ${
              isEnter && "rotate-180"
            }`}
            src={chevron}
            alt="Chevron"
          />
        </>
      )}
      className="border-b"
      buttonProps={{
        className: ({ isEnter }) =>
          `flex w-full p-3 text-left hover:bg-slate-100 ${
            isEnter && "bg-slate-200"
          }`,
      }}
      contentProps={{
        className: "transition-height duration-200 ease-out",
      }}
      panelProps={{ className: "p-2" }}
    />
  );

  const MySwal = withReactContent(Swal);

  return (
    <div className="">
      {loading ? (
        "Loading"
      ) : (
        <div className="flex flex-col">
          {merchantLoan[0]?.merchantAcceptanceStatus === null && (
            <div className="flex items-end h-full flex-col md:flex-row space-y-4 justify-between px-8  border rounded p-4 mb-4 bg-white shadow-sm">
              <div>
                <div className="flex flex-col items-start">
                  <span className="w-full space-x-10 flex items-center justify-between">
                    <span>Due Date: </span>
                    <span className="text-cyan-500 whitespace-nowrap font-semibold underline">
                      {year + "-" + month + "-" + day}
                    </span>{" "}
                  </span>
                  <span className="w-full space-x-10 flex items-center justify-between">
                    <span>Amount to Disburse: </span>
                    <span className="text-cyan-500 whitespace-nowrap font-semibold underline">
                      {(merchantLoan[0]?.appliedAmount * 1).toLocaleString()}{" "}
                      ETB
                    </span>{" "}
                  </span>
                  <span className="w-full space-x-10 flex items-center justify-between">
                    <span className="flex flex-col">
                      <span>Repayment amount on due date </span>
                    </span>
                    <span className="text-cyan-500 whitespace-nowrap font-semibold underline">
                      {(merchantLoan[0]?.totalRepayment * 1).toLocaleString()}{" "}
                      ETB
                    </span>{" "}
                  </span>
                  <span className="w-full space-x-10 flex items-center justify-between">
                    <span>Interest Rate Per Month</span>
                    <span className="text-cyan-500 whitespace-nowrap font-semibold underline">
                      {merchantLoan[0]?.payOffMonth === 6 ? 7 : 12.33} %
                    </span>{" "}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center space-x-2">
                <div className="flex items-center justify-between w-full"></div>
                <div className="flex items-center justify-between w-full">
                  <button
                    type="submit"
                    onClick={() =>
                      Swal.fire({
                        title: "Do you want to reject the offer?",
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: "Reject",
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          const newData = {
                            status: "REJECTED",
                            loanId: merchantLoan[0]?.id,
                            merchantId: merchantLoan[0]?.merchantId,
                          };
                          dispatch(
                            CapacityService.acceptLoan(
                              newData,
                              updated,
                              setUpdated
                            )
                              .then(
                                (response) =>
                                  response &&
                                  Swal.fire({
                                    icon: "success",
                                    title: "Offer Rejected",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  })
                              )
                              .catch(
                                (error) =>
                                  error?.response?.data?.message &&
                                  Swal.fire({
                                    icon: "error",
                                    title: `${error?.response?.data?.message}`,
                                    showConfirmButton: false,
                                    timer: 1500,
                                  })
                              )
                          );
                        } else if (result.isDenied) {
                          Swal.fire("Loan is not approved", "", "info");
                        }
                      })
                    }
                    className="text-white bg-red-400 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300testdark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Reject
                  </button>
                  <button
                    type="submit"
                    disabled={acceptLoading}
                    onClick={async () => {
                      setAcceptLoading(true);
                      return Swal.fire({
                        title: "Accept the offer!",
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: "Accept",
                      })
                        .then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            const newData = {
                              status: "ACCEPTED",
                              loanId: merchantLoan[0]?.id,
                              merchantId: merchantLoan[0]?.merchantId,
                            };
                            dispatch(
                              CapacityService.acceptLoan(
                                newData,
                                updated,
                                setUpdated
                              )
                                .then(
                                  (response) =>
                                    response &&
                                    Swal.fire({
                                      icon: "success",
                                      title: "Accepted Successfully",
                                      showConfirmButton: false,
                                      timer: 1500,
                                    })
                                )
                                .catch(
                                  (error) =>
                                    error?.response?.data?.message &&
                                    Swal.fire({
                                      icon: "error",
                                      title: `${error?.response?.data?.message}`,
                                      showConfirmButton: false,
                                      timer: 1500,
                                    })
                                )
                            );
                          } else if (result.isDenied) {
                            Swal.fire("Loan is not approved", "", "info");
                          }
                        })
                        .finally(() => setAcceptLoading(false));
                    }}
                    className="text-white bg-cyan-500 from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300testdark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          )}
          {merchantLoan[0]?.merchantAcceptanceStatus === "ACCEPTED" && (
            <div className="flex flex-col md:flex-row items-center justify-between px-8 py-4 mb-4 border rounded bg-white shadow-sm">
              <div>
                <div className="w-full space-y-4 md:space-y-0 md:space-x-4 md:w-auto flex flex-col md:flex-row md:items-center justify-between">
                  <span className="text-gray-600">Credit Amount:</span>
                  <span className="text-cyan-500 font-semibold whitespace-nowrap underline">
                    {(merchantLoan[0]?.appliedAmount * 1).toLocaleString()} ETB
                  </span>
                </div>
                <div className="w-full space-y-4 md:space-y-0 md:space-x-4 md:w-auto flex flex-col md:flex-row md:items-center justify-between">
                  <span className="text-gray-600">
                    Total Amount to Pay on Due Date:
                  </span>
                  <span className="text-cyan-500 font-semibold whitespace-nowrap underline">
                    {(merchantLoan[0]?.totalRepayment * 1).toLocaleString()} ETB
                  </span>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full md:w-auto flex items-center space-y-4 md:space-y-0 md:space-x-4"
              >
                <div className="flex w-full space-x-0 md:w-auto">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      id="fiat-currency-input"
                      className="block p-2.5 w-full rounded-l z-20 text-sm text-gray-900 bg-gray-50 outline-none rounded-s-lg border-e-gray-50 border-e-2 border border-cyan-300 focus:ring-cyan-500 focus:border-cyan-500testdark:bg-gray-700testdark:border-e-gray-700testdark:border-gray-600testdark:placeholder-gray-400testdark:text-whitetestdark:focus:border-blue-500"
                      placeholder={`Enter amount in ${defaultCurrency}`}
                      required
                      value={formatInputValue(amount)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-900 bg-gray-100 border border-cyan-300 rounded-r cursor-not-allowed">
                      <span>{defaultCurrency}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!amount}
                  onClick={() =>
                    MySwal.fire({
                      html: (
                        <PaymentModal
                          amount={amount}
                          kyc={kyc}
                          setAmount={setAmount}
                          formatInputValue={formatInputValue}
                          handleInputChange={handleInputChange}
                        />
                      ),
                      showCloseButton: true,
                      showCancelButton: false,
                      showConfirmButton: false,
                    })
                  }
                  className="text-white bg-cyan-500 from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300testdark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Pay
                </button>
              </form>
            </div>
          )}
          {merchantLoan[0]?.merchantAcceptanceStatus === "TIME_OUT" && (
            <div className="flex flex-col md:flex-row items-center text-cyan-500 justify-between px-8 py-4 mb-4 border rounded bg-white shadow-sm">
              Your Offer is expired, please apply for other loan
            </div>
          )}
          {merchantLoan[0]?.merchantAcceptanceStatus !== "TIME_OUT" &&
            merchantLoan[0]?.merchantAcceptanceStatus !== "REJECTED" && (
              <div className="mx-2 my-4 border-t">
                {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
                <Accordion transition transitionTimeout={200}>
                  <AccordionItem
                    header="Forcasted Repayment Schedule"
                    initialEntered
                  >
                    <DataTable
                      // title="Forecasted Repayment Schedule"
                      columns={columns}
                      data={repaymentSchedule?.filter(
                        (item) => item.month !== 0
                      )}
                      pagination
                      paginationResetDefaultPage={resetPaginationToggle}
                      persistTableHeadstriped
                      highlightOnHover
                      actions={actionsMemo}
                    />
                  </AccordionItem>
                  <AccordionItem header="Payments">
                    <DataTable
                      // title="Payments"
                      columns={paymentColumns}
                      data={[]}
                      pagination
                      paginationResetDefaultPage={resetPaginationToggle}
                      persistTableHeadstriped
                      highlightOnHover
                      actions={actionsMemo}
                    />
                  </AccordionItem>
                </Accordion>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default RepaymentSchedule;
