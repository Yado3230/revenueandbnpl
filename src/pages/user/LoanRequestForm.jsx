import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCalculatedCapacity,
  getLoanRequests,
  getReturnCapTables,
} from "../../store/actions/capacityAction";
import CapacityService from "../../services/capacityServices";
import { error } from "daisyui/src/colors";
import { getModifiedReports } from "../../store/actions/reportActions";
import Swal from "sweetalert2";

const estimatedData = [
  { month: "Month 1", value: 5868.1, Commulative: 5868.1 },
  { month: "Month 2", value: 6044.14, Commulative: 11912.24 },
  { month: "Month 3", value: 6225.47, Commulative: 18137.71 },
  { month: "Month 4", value: 6412.23, Commulative: 24549.94 },
  { month: "Month 5", value: 6604.6, Commulative: 31154.54 },
  { month: "Month 6", value: 6802.74, Commulative: 37957.28 },
  { month: "Month 7", value: 7006.82, Commulative: 44964.09 },
  { month: "Month 8", value: 7217.02, Commulative: 52181.12 },
  { month: "Month 9", value: 7433.53, Commulative: 59614.65 },
  { month: "Month 10", value: 7433.53, Commulative: 65868.1 },
  { month: "Month 11", value: 7433.53, Commulative: 75868.1 },
  { month: "Month 12", value: 7433.53, Commulative: 85868.1 },
];

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
    dispatch(
      getModifiedReports(
        userID,
        formattedDate,
        new Date().toISOString().split("T")[0],
        "",
        true
      )
    );
  }, [userID]);

  const reportData = useSelector((state) => state.reportInfo);
  const { modifiedReports } = reportData;

  console.log("modified", modifiedReports?.total_revenue?.total);
  const renderMonthInputs = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1); // Adjust to current month minus one
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
      setLoanAmount(Math.round(borrowingCapacity.borrowingCapacity));
    }
  }, [borrowingCapacity]);

  return (
    <div className="p-5 rounded-xl shadow bg-white">
      <h2 className="mt-2 mb-5 text-2xl text-cyan-500 font-bold">
        REQUEST FOR LOAN
      </h2>
      {agrement ? (
        <div>
          <div
            className="p-5"
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
                className="text-sm text-gray-900 dark:text-white"
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
                        loanAmount,
                        "5%",
                        borrowingCapacity?.payOffMonth
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
        <div className="grid grid-cols-2 gap-2">
          <div className="w-full col-span-2 grid grid-cols-2 items-center">
            <div className="w-full">
              {revenue.map((option) => (
                <div key={option.value} className="flex items-center mb-2">
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
                    className="text-sm text-gray-900 dark:text-white"
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
                      className={`tab ${
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
          <div className="border-b-4 col-span-2 mb-4"></div>
          {revenueProvided === "true" && (
            <div className="col-span-2">
              <div className="grid grid-cols-3 gap-4">
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
            disabled={!term.length || !revenueProvided.length}
            onClick={() => {
              setLoadingCalculatedData(true);
              dispatch(
                getCalculatedCapacity(
                  term,
                  37,
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
            {!calculated ? "Calculate" : "Re-Calculate"}
          </button>
          {calculated &&
            (loadingCalculatedData ? (
              <div>calculating...</div>
            ) : (
              <div className="col-span-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="text-xl text-cyan-500 font-bold flex items-center justify-between">
                    <span>Offer</span>
                    <span>
                      ETB{" "}
                      {(
                        borrowingCapacity.borrowingCapacity * 1
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
                      max={Math.round(borrowingCapacity.borrowingCapacity)}
                      value={loanAmount}
                      id={`loanAmount`}
                      placeholder="Enter Loan amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                      required
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                    {loanAmount >
                      Math.round(borrowingCapacity.borrowingCapacity) && (
                      <span className="text-red-500">
                        {"value cannot be greater than" +
                          " " +
                          (
                            Math.round(borrowingCapacity.borrowingCapacity) * 1
                          )?.toFixed(0)}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2"></div>
                  <div>
                    <button
                      disabled={
                        loanAmount >
                        Math.round(borrowingCapacity.borrowingCapacity)
                      }
                      style={{ backgroundColor: "#01AFEF" }}
                      className="swal2-confirm swal2-styled items-center
                justify-center w-full"
                      onClick={() =>
                        dispatch(
                          CapacityService.generateAgreementDoc(
                            kyc.first_name + " " + kyc.last_name,
                            kyc.business_address,
                            "",
                            "",
                            "",
                            username,
                            kyc.tin_number,
                            kyc.business_name,
                            loanAmount,
                            "5%",
                            borrowingCapacity.payOffMonth
                          ).then((res) => setAgreement(res))
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LoanRequestForm;
