import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCalculatedCapacity,
  getLoanRequests,
  getReturnCapTables,
} from "../../store/actions/capacityAction";
import CapacityService from "../../services/capacityServices";
import { getModifiedReports } from "../../store/actions/reportActions";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner/Spinner";

import PDFGenerator from "./PdfGenerator";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./PdfGenerator";

const LoanRequestForm = () => {
  const [revenueProvided, setRevenueProvided] = useState("");
  const [howMuchMonth, setHowMuchMonth] = useState("");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [revenueValues, setRevenueValues] = useState({});
  const [term, setTerm] = useState("");
  const [revenueShareType, setRevenueShareType] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [capacity] = useState(50000);
  const [loanAmount, setLoanAmount] = useState(capacity);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [agrement, setAgreement] = useState();

  const [loadingCalculatedData, setLoadingCalculatedData] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  const generateMonthOptions = (numberOfMonths) => {
    const currentMonth = new Date().getMonth();
    const months = ["Current Month", "Previous Month", "Two Months Ago"];

    return months.slice(0, numberOfMonths).map((label, index) => ({
      label,
      value: (currentMonth - index + 12) % 12,
    }));
  };

  const userData = useSelector((state) => state.userProfile);
  const { kyc, userID, username } = userData;

  useEffect(() => {
    dispatch(getLoanRequests(userID));
    dispatch(getReturnCapTables());
  }, [userID]);

  const capacityData = useSelector((state) => state.capacityInfo);
  const { borrowingCapacity, capTable } = capacityData;

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setHowMuchMonth(selectedValue);
    setRevenueValues({});
    const months = generateMonthOptions(parseInt(selectedValue, 10));
    setSelectedMonths(
      Object.fromEntries(months.map(({ label }) => [label, ""]))
    );
  };

  const handleChange = (e, month) => {
    const value = e.target.value;
    setRevenueValues((prevValues) => ({
      ...prevValues,
      [month]: value,
    }));

    console.log(revenueValues);
  };

  var currentDate = new Date();
  var thirtyDaysAgo = new Date(currentDate);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Format the date to match the expected format (YYYY-MM-DD)
  var formattedDate = thirtyDaysAgo.toISOString().split("T")[0];

  useEffect(() => {
    dispatch(getModifiedReports(userID, "2024-02-01", "2024-03-01", "", true));
  }, [userID]);

  const reportData = useSelector((state) => state.reportInfo);
  const { modifiedReports } = reportData;

  console.log("modified", modifiedReports?.total_revenue?.total);
  const renderMonthInputs = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 2); // Adjust to current month minus one
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const reversedArray = Array.from(
      { length: parseInt(howMuchMonth, 10) },
      (_, index) => {
        const targetMonth = (currentMonth - index + 12) % 12;
        const targetYear =
          currentYear + Math.floor((currentMonth - index) / 12);
        const monthName = monthNames[targetMonth];

        return (
          <div key={index} className="w-full">
            <input
              type="number"
              id={`monthInput-${index}`}
              value={revenueValues[`${monthName}-${targetYear}`] || ""}
              placeholder={`${monthName}, ${targetYear} Revenue`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              required
              onChange={(e) => handleChange(e, `${monthName}-${targetYear}`)}
            />
          </div>
        );
      }
    );

    return reversedArray.reverse();
  };

  const revenue = [
    { label: "I Can Provide Monthly Revenue", value: "true" },
    { label: "Use My Monthly Revenue from souqpass", value: "false" },
  ];

  const shareType = [
    { label: "Fixed", value: "fixed" },
    { label: "Variable", value: "variable" },
  ];

  const howMuchMonthRevenue = [
    { label: "3 Months", value: "3" },
    { label: "6 Months", value: "6" },
    { label: "9 Months", value: "9" },
    { label: "12 Months", value: "12" },
  ];

  const payoffMonth = [
    { label: "3 Months", value: "3", amount: 20000 },
    { label: "6 Months", value: "6", amount: 25000 },
  ];

  const payoffMonths = capTable
    ?.filter((item) => item.month <= 6)
    ?.map((item) => ({
      label: item.month + " Months",
      value: item.month,
    }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (borrowingCapacity) {
      setLoanAmount(
        Math.round(
          borrowingCapacity?.overflowed
            ? borrowingCapacity.overflowBorrowingCapacity
            : borrowingCapacity?.borrowingCapacity
        )
      );
    }
  }, [borrowingCapacity]);

  return (
    <div className="p-1 md:p-5 rounded-xl shadow bg-white dark:bg-black">
      <h2 className="mt-2 mb-5 text-2xl text-cyan-500 font-bold">
        REQUEST FOR LOAN
      </h2>
      {agrement ? (
        <div>
          <div
            className="md:p-5 p-1"
            dangerouslySetInnerHTML={{ __html: agrement }}
          ></div>
          <div className="col-span-2">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="agreementCheckbox"
                checked={agreementChecked}
                onChange={() => setAgreementChecked(!agreementChecked)}
                className="mr-2"
              />
              <label
                htmlFor="agreementCheckbox"
                className="text-sm text-gray-900 dark:text-white whitespace-nowrap"
              >
                I agree to the banks loan
                <label
                  onClick={() =>
                    dispatch(
                      CapacityService.generateAgreementDoc(
                        kyc?.first_name + " " + kyc?.last_name,
                        kyc?.business_address,
                        "",
                        "",
                        "",
                        username,
                        kyc.tin_number,
                        kyc.business_name,
                        borrowingCapacity?.term,
                        loanAmount * borrowingCapacity?.returnCarp,
                        loanAmount
                      ).then((res) => {
                        const newWindow = window.open();
                        newWindow.document?.open();
                        newWindow.document?.write(res);
                        newWindow.document?.close();
                        return (
                          <div dangerouslySetInnerHTML={{ __html: res }}></div>
                        );
                      })
                    )
                  }
                  // htmlFor="my_modal_6"
                  className="text-cyan-500 font-semibold cursor-pointer"
                >
                  {" "}
                  agreement
                </label>
              </label>
            </div>
            {/* <div style={{ width: "100%", height: "100vh" }}>
              <PDFViewer style={{ width: "100%", height: "100%" }}>
                <PDFDocument agrement={agrement} />
              </PDFViewer>
            </div> */}
          </div>
          <div className="w-full flex items-center justify-end">
            <button
              disabled={!agreementChecked || applyLoading}
              onClick={() => {
                setApplyLoading(true);
                return dispatch(
                  CapacityService.applyForLoan(
                    userID,
                    borrowingCapacity.borrowingCapacity,
                    borrowingCapacity.totalRepayment,
                    borrowingCapacity.term
                  )
                    .then((res) => {
                      Swal.fire({
                        icon: "success",
                        title: "Request successful, wait for approval",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      navigate("/users");
                    })
                    .catch((error) =>
                      Swal.fire({
                        icon: "error",
                        title:
                          error?.response?.data?.message ||
                          "Something went wrong!",
                        showConfirmButton: false,
                        timer: 2000,
                      })
                    )
                    .finally(() => setApplyLoading(false))
                );
              }}
              style={{ backgroundColor: "#01AFEF" }}
              className="swal2-confirm swal2-styled items-center
                justify-end flex "
            >
              {!agreementChecked ? (
                "Apply"
              ) : (
                <label
                  //   type="submit"
                  className="w-full cursor-pointer"
                >
                  {applyLoading ? "Loading..." : "Apply"}
                </label>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 ">
          <div className="w-full col-span-2 grid md:grid-cols-2 items-center">
            <div className="w-full">
              {revenue.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center mb-2 w-full"
                >
                  <input
                    type="radio"
                    id={`revenueOption-${option.value}`}
                    value={option.value}
                    checked={revenueProvided === option.value}
                    onChange={() => setRevenueProvided(option.value)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`revenueOption-${option.value}`}
                    className="text-sm text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {revenueProvided === "true" && (
              <div className="w-full col-span-1">
                <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  Select Duration <span className="text-red-500">*</span>
                </label>
                <div
                  role="tablist"
                  className="tabs tabs-boxed grid grid-cols-4"
                >
                  {howMuchMonthRevenue.map((arr) => (
                    <a
                      role="tab"
                      onClick={() =>
                        handleSelectChange({ target: { value: arr.value } })
                      }
                      className={`tab whitespace-nowrap ${
                        howMuchMonth === arr.value ? "tab-active" : ""
                      }`}
                    >
                      {arr.label}
                    </a>
                  ))}
                </div>
                {/* ))} */}
                {/* </div> */}
              </div>
            )}
          </div>
          <div className="border-b-4 col-span-2 my-4"></div>
          {revenueProvided === "true" && (
            <div className="col-span-2">
              <div className="grid md:grid-cols-3 gap-4">
                {renderMonthInputs()}
              </div>
              <div className="w-full my-2 font-semibold text-xl">
                <span>This Month Revenue:</span>{" "}
                {(modifiedReports?.total_revenue?.total * 1).toLocaleString()}{" "}
                Birr
              </div>
            </div>
          )}
          <div className="border-b-4 col-span-2 mt-4"></div>
          <div className="w-full">
            <label
              htmlFor="revenues"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Loan Term <span className="text-red-500">*</span>
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              value={term}
              required
              onChange={(e) => setTerm(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              {payoffMonths
                // .filter((item) => item.amount <= 25000)
                .map((arr) => (
                  <option key={arr.value} value={arr.value}>
                    {arr.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full hidden">
            <label
              htmlFor="revenues"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Revenue Share Type <span className="text-red-500">*</span>
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              value={revenueShareType}
              required
              onChange={(e) => setRevenueShareType(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              {shareType.map((arr) => (
                <option key={arr.value} value={arr.value}>
                  {arr.label}
                </option>
              ))}
            </select>
          </div>
          <div></div>
          <button
            disabled={
              !term.length || !revenueProvided.length || loadingCalculatedData
            }
            onClick={() => {
              setLoadingCalculatedData(true);
              dispatch(
                getCalculatedCapacity(
                  term,
                  1,
                  revenueValues,
                  "variable",
                  modifiedReports?.total_revenue?.total,
                  setLoadingCalculatedData
                )
              );
              setLoanAmount(borrowingCapacity.borrowingCapacity);
              setCalculated(true);
            }}
            style={{ backgroundColor: "#01AFEF" }}
            className="swal2-confirm swal2-styled"
          >
            {!calculated
              ? "Calculate"
              : loadingCalculatedData
              ? "Calculating..."
              : "Re-Calculate"}
          </button>
          {calculated &&
            (loadingCalculatedData ? (
              <div>
                <Spinner />
              </div>
            ) : borrowingCapacity.eligible ? (
              <div className="col-span-2">
                <div className="grid md:grid-cols-3 items-center gap-4">
                  <div className="text-xl whitespace-nowrap text-cyan-500 font-bold flex items-center justify-between">
                    <span>Offer</span>
                    <span>
                      {" "}
                      ETB{" "}
                      {(
                        (borrowingCapacity?.overflowed
                          ? borrowingCapacity?.overflowBorrowingCapacity
                          : borrowingCapacity.borrowingCapacity) * 1
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div></div>
                  <div className="w-full items-center">
                    <label
                      htmlFor="revenues"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Loan Request Amount
                    </label>
                    <input
                      type="number"
                      name="loanAmount"
                      max={Math.round(
                        borrowingCapacity?.overflowed
                          ? borrowingCapacity?.overflowBorrowingCapacity
                          : borrowingCapacity?.borrowingCapacity
                      )}
                      value={loanAmount}
                      id={`loanAmount`}
                      placeholder="Enter Loan amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                      required
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                    {loanAmount >
                      Math.round(
                        borrowingCapacity?.overflowed
                          ? borrowingCapacity?.overflowBorrowingCapacity
                          : borrowingCapacity?.borrowingCapacity
                      ) && (
                      <span className="text-red-500">
                        {"value cannot be greater than" +
                          " " +
                          (
                            Math.round(
                              borrowingCapacity?.overflowed
                                ? borrowingCapacity?.overflowBorrowingCapacity
                                : borrowingCapacity?.borrowingCapacity
                            ) * 1
                          )?.toFixed(0)}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2"></div>
                  <div>
                    <button
                      disabled={
                        loanAmount >
                        Math.round(
                          borrowingCapacity?.overflowed
                            ? borrowingCapacity?.overflowBorrowingCapacity
                            : borrowingCapacity?.borrowingCapacity
                        )
                      }
                      style={{ backgroundColor: "#01AFEF" }}
                      className="swal2-confirm swal2-styled items-center
                justify-center w-full"
                      onClick={() =>
                        dispatch(
                          CapacityService.generateAgreementDoc(
                            kyc?.first_name + " " + kyc?.last_name,
                            kyc?.business_address,
                            "",
                            "",
                            "",
                            username,
                            kyc.tin_number,
                            kyc.business_name,
                            borrowingCapacity?.term,
                            loanAmount * borrowingCapacity?.returnCarp,
                            loanAmount
                          ).then((res) => setAgreement(res))
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-red-500 italic">
                  Sorry, You are not eligible with this month
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LoanRequestForm;
