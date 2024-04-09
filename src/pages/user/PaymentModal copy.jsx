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

  const [account, setAccount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    <div style={{ width: "100%", marginTop: "1.25rem" }}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            fontWeight: 600,
          }}
        >
          <h2>Select Your Payment Method</h2>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => setActiveTab("account")}
            style={{
              border: activeTab === "account" ? "2px solid #f59e0b" : "none",
              boxShadow:
                activeTab === "account"
                  ? "0 0 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              cursor: "pointer",
            }}
          >
            <img
              src={cbologo}
              alt="ebirr"
              width="80px"
              style={{ margin: "4px" }}
            />
          </button>
          <button
            onClick={() => setActiveTab("ebirr")}
            style={{
              border: activeTab === "ebirr" ? "2px solid #f59e0b" : "none",
              boxShadow:
                activeTab === "ebirr" ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
              cursor: "pointer",
            }}
          >
            <img
              src={ebirrlogo}
              alt="ebirr"
              width="48px"
              style={{ margin: "2px 6px" }}
            />
          </button>
        </div>
        <div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {activeTab === "account" ? (
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  id="fiat-currency-input"
                  style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "2px solid #38b2ac",
                    outline: "none",
                  }}
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
                  >
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          style={{
                            cursor: "pointer",
                            padding: "8px",
                            borderBottom: "1px solid #cbd5e0",
                          }}
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
                <div style={{ display: "flex", gap: "0" }}>
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "10px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#374151",
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                        borderTopLeftRadius: "0.375rem",
                        borderBottomLeftRadius: "0.375rem",
                        cursor: "not-allowed",
                      }}
                    >
                      <span>+251</span>
                    </div>
                  </div>
                  <div style={{ position: "relative", flex: 1 }}>
                    <input
                      type="number"
                      id="fiat-currency-input"
                      style={{
                        padding: "10px",
                        width: "100%",
                        borderRadius: "5px",
                        border: "2px solid #38b2ac",
                        outline: "none",
                      }}
                      placeholder={`Phone Number`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              )
            )}
            <div style={{ display: "flex", gap: "0" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  type="text"
                  id="fiat-currency-input"
                  style={{
                    padding: "10px",
                    width: "calc(100% - 70px)",
                    borderRadius: "5px",
                    border: "2px solid #38b2ac",
                    outline: "none",
                  }}
                  placeholder={`Enter amount in ${defaultCurrency}`}
                  required
                  disabled
                  value={formatInputValue(amount)}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "10px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    borderTopRightRadius: "0.375rem",
                    borderBottomRightRadius: "0.375rem",
                    cursor: "not-allowed",
                  }}
                >
                  <span>{defaultCurrency}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              style={{
                padding: "10px 24px",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#fff",
                backgroundColor:
                  "linear-gradient(to bottom right, #37b8e9, #1883ba)",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              CONTINUE
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginTop: "1.25rem",
            }}
          >
            <div style={{}}>
              <span style={{}}>secure payment</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.125rem",
                fontWeight: 600,
              }}
            >
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
