import React, { useState } from "react";
import cbologo from "./../../assets/images/Cooperative_Bank_of_Oromia-3.png";
import ebirrlogo from "./../../assets/images/ebirr.jpg";
import souqpasslogo from "./../../assets/images/logo.png";

const PaymentModal = ({
  amount,
  bankAccounts,
  handleInputChange,
  formatInputValue,
}) => {
  const [activeTab, setActiveTab] = useState("account");

  const [account, setAccount] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputsChange = (e) => {
    const inputValue = e.target.value;
    setAccount(inputValue);

    // Filter account numbers based on input value
    const filteredSuggestions = bankAccounts
      ?.filter((item) => item.account_number.includes(inputValue.toString()))
      .map((item) => item.account_number); // Extract account numbers from filtered suggestions
    setSuggestions(filteredSuggestions);

    // Show/hide popup based on input value
    setShowPopup(!!inputValue);
  };

  console.log("bank accounts", bankAccounts);

  const handleSuggestionClick = (suggestion) => {
    setAccount(suggestion);
    setSuggestions([]);
    setShowPopup(false);
  };

  const defaultCurrency = "ETB";
  return (
    <div className="w-full mt-5">
      <div className="w-full">
        <div className="text-xl font-semibold">
          <h2>Select Your Payment Method</h2>
        </div>
        <div class="flex items-center justify-center p-4 py-6 space-x-2">
          <button
            onClick={() => setActiveTab("account")}
            className={`border ${
              activeTab === "account" && "border-orange-400 border-2"
            } shadow hover:shadow-md`}
          >
            <img src={cbologo} alt="ebirr" width="80px" class="my-4 mx-4" />
          </button>
          <button
            onClick={() => setActiveTab("ebirr")}
            className={`border ${
              activeTab === "ebirr" && "border-orange-400 border-2"
            } shadow hover:shadow-md`}
          >
            <img src={ebirrlogo} alt="ebirr" width="48px" class="my-2 mx-6" />
          </button>
        </div>
        <div>
          <div class="flex flex-col space-y-6">
            {activeTab === "account" ? (
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  id="fiat-currency-input"
                  className="block p-2.5 w-full rounded z-20 text-sm text-gray-900 bg-gray-50 outline-none rounded-s-lg border-e-gray-50 border-e-2 border border-cyan-300 focus:ring-cyan-500 focus:border-cyan-500testdark:bg-gray-700testdark:border-e-gray-700testdark:border-gray-600testdark:placeholder-gray-400testdark:text-whitetestdark:focus:border-blue-500"
                  placeholder={`Account Number`}
                  required
                  value={account}
                  onChange={handleInputsChange}
                />

                {/* Display popup if showPopup is true */}
                {showPopup && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 999,
                      backgroundColor: "#fff",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    className="w-full border"
                  >
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          className="cursor-pointer py-1 text-lg border-b hover:bg-gray-100"
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              activeTab === "ebirr" && (
                <div className="flex w-full space-x-0 md:w-auto">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-900 bg-gray-100 border border-cyan-300 rounded-l cursor-not-allowed">
                      <span>+251</span>
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      id="fiat-currency-input"
                      className="block p-2.5 w-full rounded-r z-20 text-sm text-gray-900 bg-gray-50 outline-none rounded-s-lg border-e-gray-50 border-e-2 border border-cyan-300 focus:ring-cyan-500 focus:border-cyan-500testdark:bg-gray-700testdark:border-e-gray-700testdark:border-gray-600testdark:placeholder-gray-400testdark:text-whitetestdark:focus:border-blue-500"
                      placeholder={`Phone Number`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              )
            )}
            <div className="flex w-full space-x-0 md:w-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="fiat-currency-input"
                  className="block p-2.5 w-full rounded-l z-20 text-sm text-gray-900 bg-gray-50 outline-none rounded-s-lg border-e-gray-50 border-e-2 border border-cyan-300 focus:ring-cyan-500 focus:border-cyan-500testdark:bg-gray-700testdark:border-e-gray-700testdark:border-gray-600testdark:placeholder-gray-400testdark:text-whitetestdark:focus:border-blue-500"
                  placeholder={`Enter amount in ${defaultCurrency}`}
                  required
                  disabled
                  value={formatInputValue(amount)}
                  onChange={(e) => handleInputChange(e)}
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
              className="text-white bg-cyan-500 from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300testdark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              CONTINUE
            </button>
          </div>
          <div className="flex items-start justify-start flex-col space-y-2 my-5">
            <div>
              <span>secure payment</span>
            </div>
            <div className="flex space-x-2 text-lg font-semibold">
              <span>Powered by</span>
              <img src={souqpasslogo} alt="ebirr" width="120px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
