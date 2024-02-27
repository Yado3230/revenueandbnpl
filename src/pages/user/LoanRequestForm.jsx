import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCalculatedCapacity } from "../../store/actions/capacityAction";

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

  const generateMonthOptions = (numberOfMonths) => {
    const currentMonth = new Date().getMonth();
    const months = ["Current Month", "Previous Month", "Two Months Ago"];

    return months.slice(0, numberOfMonths).map((label, index) => ({
      label,
      value: (currentMonth - index + 12) % 12,
    }));
  };

  const capacityData = useSelector((state) => state.capacityInfo);
  const { borrowingCapacity } = capacityData;

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

  const renderMonthInputs = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
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

    return Array.from({ length: parseInt(howMuchMonth, 10) }, (_, index) => {
      const targetMonth = (currentMonth - index + 12) % 12;
      const targetYear = currentYear + Math.floor((currentMonth - index) / 12);
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
    });
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
    { label: "3 Months", value: "3" },
    { label: "6 Months", value: "6" },
    { label: "9 Months", value: "9" },
    { label: "12 Months", value: "12" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="p-5 rounded-xl shadow bg-white">
      <h2 className="mt-2 mb-5 text-2xl text-cyan-500 font-bold">
        REQUEST FOR LOAN
      </h2>
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
              <div role="tablist" className="tabs tabs-boxed grid grid-cols-4">
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
            <div className="grid grid-cols-3 gap-4">{renderMonthInputs()}</div>
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
            {payoffMonth.map((arr) => (
              <option key={arr.value} value={arr.value}>
                {arr.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
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
        {!calculated && (
          <button
            disabled={
              !term.length ||
              !revenueShareType.length ||
              !revenueProvided.length
            }
            //   type="submit"
            onClick={() => {
              dispatch(
                getCalculatedCapacity(term, 37, revenueValues, revenueShareType)
              );
              setCalculated(true);
            }}
            style={{ backgroundColor: "#01AFEF" }}
            className="swal2-confirm swal2-styled"
          >
            Calculate
          </button>
        )}
        {calculated && (
          <div className="col-span-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="text-xl text-cyan-500 font-bold flex items-center justify-between">
                <span>Offer</span>
                <span>
                  ETB{" "}
                  {(borrowingCapacity.borrowingCapacity * 1).toLocaleString()}
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
                  max={borrowingCapacity.borrowingCapacity}
                  value={Math.round(borrowingCapacity.borrowingCapacity)}
                  id={`loanAmount`}
                  placeholder="Enter Loan amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  required
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
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
                      htmlFor="my_modal_6"
                      className="text-cyan-500 font-semibold cursor-pointer"
                    >
                      {" "}
                      terms and conditions
                    </label>
                    {/* Put this part before </body> tag */}
                    <input
                      type="checkbox"
                      id="my_modal_6"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">
                          Banks Term and Conditions!
                        </h3>
                        <div class="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
                          <h1 class="text-2xl font-bold mb-4">
                            Loan Terms and Conditions - Cooperative Bank of
                            Oromia
                          </h1>

                          <div class="mb-4">
                            <h2 class="text-xl font-bold mb-2">
                              1. Eligibility Criteria:
                            </h2>
                            <ul class="list-disc pl-6">
                              <li>
                                Must be a member of the Cooperative Bank of
                                Oromia.
                              </li>
                              <li>Age must be between 18 and 65 years.</li>
                              <li>Proof of a stable source of income.</li>
                            </ul>
                          </div>

                          <div class="mt-8">
                            <p class="text-sm text-gray-600">
                              Applicants are advised to carefully read and
                              understand these terms before applying for a loan
                              from the Cooperative Bank of Oromia.
                            </p>
                          </div>
                        </div>

                        <div className="modal-action">
                          <label htmlFor="my_modal_6" className="btn">
                            Close!
                          </label>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <button
                disabled={!agreementChecked}
                style={{ backgroundColor: "#01AFEF" }}
                className="swal2-confirm swal2-styled items-center
                justify-center flex"
              >
                {!agreementChecked ? (
                  "Apply"
                ) : (
                  <label
                    //   type="submit"
                    className="w-full"
                    htmlFor="my_modal_4"
                  >
                    Apply
                  </label>
                )}
              </button>
              <input type="checkbox" id="my_modal_4" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box">
                  <h3 className="font-bold text-cyan-500 text-xl">
                    Estimated Re-Payments!
                  </h3>

                  <div className="w-full p-5">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Monthly Payment</th>
                          <th>Commulative</th>
                        </tr>
                      </thead>
                      <tbody>
                        {estimatedData.slice(0, term * 1).map((item, index) => (
                          <tr key={index}>
                            <td>{item.month}</td>
                            <td>{item.value}</td>
                            <td>{item.Commulative}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="modal-action flex items-center">
                    <label htmlFor="my_modal_4" className="btn btn-autline">
                      Close!
                    </label>
                    <button
                      disabled={!agreementChecked}
                      style={{ backgroundColor: "#01AFEF" }}
                      onClick={() => {
                        alert("Your request is successfully submitted");
                        navigate("/users");
                      }}
                      className="swal2-confirm swal2-styled items-center
                justify-center flex"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanRequestForm;
