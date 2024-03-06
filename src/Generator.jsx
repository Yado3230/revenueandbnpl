import React, { useState, useEffect } from "react";
import MyPDFComponent from "./pages/user/PdfGenerator";
import { PDFViewer } from "@react-pdf/renderer";

const Generator = () => {
  // State to manage input values
  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerAddress: "",
    borrowerID: "",
    loanAmount: "",
    interestRate: "",
    repaymentMonths: "",
    contact: "",
    business: "",
  });

  // State to manage the PDF data
  const [pdfData, setPdfData] = useState(null);

  // Function to regenerate PDF when form data changes
  const regeneratePdf = () => {
    // Your logic to generate PDF based on form data
    // For demonstration purposes, assuming MyPDFComponent generates the PDF content
    const newPdfData = <MyPDFComponent {...formData} />;
    setPdfData(newPdfData);
  };

  // Call regeneratePdf whenever formData changes
  useEffect(() => {
    regeneratePdf();
  }, [formData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col border p-2 m-2 items-center justify-center">
      {/* Input fields for each piece of data */}
      <input
        type="text"
        name="borrowerName"
        value={formData.borrowerName}
        onChange={handleChange}
        placeholder="Borrower Name"
      />
      <input
        type="text"
        name="borrowerAddress"
        value={formData.borrowerAddress}
        onChange={handleChange}
        placeholder="Borrower Address"
      />
      <input
        type="text"
        name="borrowerID"
        value={formData.borrowerID}
        onChange={handleChange}
        placeholder="Borrower ID"
      />
      <input
        type="text"
        name="loanAmount"
        value={formData.loanAmount}
        onChange={handleChange}
        placeholder="Loan Amount"
      />
      <input
        type="text"
        name="interestRate"
        value={formData.interestRate}
        onChange={handleChange}
        placeholder="Interest Rate"
      />
      <input
        type="text"
        name="repaymentMonths"
        value={formData.repaymentMonths}
        onChange={handleChange}
        placeholder="Repayment Months"
      />
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact Phone Number"
      />
      <input
        type="text"
        name="business"
        value={formData.business}
        onChange={handleChange}
        placeholder="Business"
      />

      {/* Display PDF */}
      <div style={{ width: "100%", height: "100vh" }}>
        <PDFViewer width="100%" height="100%">
          {/* Render the PDF data */}
          {pdfData}
        </PDFViewer>
      </div>
    </div>
  );
};

export default Generator;
