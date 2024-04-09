import React, { useEffect, useState } from "react";
import cbologo from "./../assets/images/Cooperative_Bank_of_Oromia-3.png";
import ebirrlogo from "./../assets/images/ebirr.jpg";
import souqpasslogo from "./../assets/images/logo.png";

import ReactDOM from "react-dom";

const Gateway = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
                  // onChange={handleInputsChange}
                />

                {/* Display popup if showPopup is true */}
                {/* {showPopup && ( */}
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
                  {/* <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          style={{
                            cursor: "pointer",
                            padding: "8px",
                            borderBottom: "1px solid #cbd5e0",
                          }}
                          key={index}
                          // onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul> */}
                </div>
                {/* )} */}
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
                  // value={formatInputValue(amount)}
                  // onChange={(e) => handleInputChange(e)}
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
const GatewayInNewWindow = () => {
  const url =
    "http://localhost:3001/gateway/0mYNIQ0EJmw3z71ZxyVUP0r5tT28JYz32o9UJS0qeNOv0";

  const openGatewayInNewWindow = () => {
    // Calculate the center position of the screen
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const windowWidth = 500; // Width of the new window
    const windowHeight = 600; // Height of the new window
    const left = (screenWidth - windowWidth) / 2;
    const top = (screenHeight - windowHeight) / 2;

    // Open the Gateway component in a new window at the center
    const newWindow = window.open(
      url,
      "_blank",
      `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`
    );
    newWindow.document.write(
      "<html><head><title>Souqpass</title></head><body>"
    );
    newWindow.document.write("<div id='gateway-container'></div>");
    newWindow.document.write("</body></html>");

    // Render the Gateway component inside the new window
    const gatewayContainer =
      newWindow.document.getElementById("gateway-container");
    ReactDOM.render(<Gateway />, gatewayContainer);

    newWindow.onload = () => {
      // Add the Souqpass logo to the top of the new window
      const souqpassLogo = newWindow.document.createElement("img");
      souqpassLogo.src = souqpasslogo;
      souqpassLogo.alt = "Souqpass";
      souqpassLogo.style.width = "120px";
      souqpassLogo.style.margin = "20px auto"; // Adjust margin as needed
      newWindow.document.body.appendChild(souqpassLogo);

      // Render the Gateway component inside the new window
      const gatewayContainer = newWindow.document.createElement("div");
      newWindow.document.body.appendChild(gatewayContainer);
      ReactDOM.render(<Gateway />, gatewayContainer);
    };
  };

  // Automatically open the popup window when the component mounts
  // useEffect(() => {
  //   openGatewayInNewWindow();
  // }, []); // Empty dependency array ensures this effect runs only once

  return (
    <button
      type="button"
      onClick={openGatewayInNewWindow}
      style={{
        color: "white",
        backgroundColor: "#2d3748",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        letterSpacing: "0.025em",
        padding: "0.75rem 1.5rem",
        textAlign: "center",
        transition:
          "background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
        cursor: "pointer",
        display: "inline-block",
        textDecoration: "none",
        textTransform: "none",
        whiteSpace: "nowrap",
        lineHeight: 1.5,
      }}
    >
      Open Payment Gateway
    </button>
  );
};

export default GatewayInNewWindow;
