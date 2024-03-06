import React from "react";
import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  mainTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "extrabold",
    marginBottom: 10,
    textDecoration: "underline",
  },
  replaced: {
    textDecoration: "underline",
  },
});

const currentDate = new Date();
const formattedDate = currentDate.getDate();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const formattedMonth = monthNames[currentDate.getMonth()];
const formattedYear = currentDate.getFullYear();

// PDF component
const MyPDFComponent = ({
  borrowerName,
  borrowerAddress,
  borrowerID,
  loanAmount,
  interestRate,
  repaymentMonths,
  contact,
  business,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.mainTitle}>
            Contract of Souq pass Digital lending Term Loans
          </Text>
          <Text style={styles.paragraph}>
            Now, therefore, the parties have entered these digital loan contract
            to be processed and disbursed digitally as per this contract and
            terms and conditions made an annex and integral part of this
            contract. {`\n \n`}
            This contract is made and entered into this{" "}
            <Text style={styles.replaced}>{formattedDate}</Text> day of{" "}
            <Text style={styles.replaced}>{formattedMonth}</Text> the year{" "}
            <Text style={styles.replaced}>{formattedYear}</Text> between Mr/Ms{" "}
            <Text style={styles.replaced}> {borrowerName}</Text>, whose address
            is in <Text style={styles.replaced}>{borrowerAddress}</Text>{" "}
            City/Town/, Contact.
            <Text style={styles.replaced}>{contact}</Text> ID / passport No.{" "}
            <Text style={styles.replaced}>{borrowerID}</Text> and Cooperative
            Bank of Oromia S.C. whose address is Addis Ababa City, Kirkos
            Sub-city, Africa Avenue, Flamingo Area, Get House Building Tel: +251
            115150229 P.O. Box: 16936.{`\n \n`} Whereas the bank is a financial
            institution engaged in banking business and has consented to grant
            the borrower a term loan facility, {`\n \n`} Whereas the borrower is
            a business entity engaged{" "}
            <Text style={styles.replaced}>{business}</Text> business and has
            requested the bank for a term loan facility.
          </Text>
          <Text style={styles.title}>
            Article 1. loan amount and its disbursement
          </Text>
          <Text style={styles.paragraph}>
            1.1. The bank has agreed to grant a digital loan to the borrower and
            the latter has agreed to borrow a loan amount of birr{" "}
            <Text style={styles.replaced}>{loanAmount}</Text>.
          </Text>
          <Text style={styles.paragraph}>
            1.2. The loan shall be disbursed to the borrower account maintained
            at the bank.
          </Text>
          <Text style={styles.title}>Article 2. Interest Rate</Text>
          <Text style={styles.paragraph}>
            The bank shall charge an interest rate of{" "}
            <Text style={styles.replaced}>{interestRate}</Text> per month on the
            daily outstanding principal loan balance.
          </Text>
          <Text style={styles.title}>Article 3. Loan Repayment</Text>
          <Text style={styles.paragraph}>
            3.1. The loan with its interest and other costs shall be totally
            repaid in <Text style={styles.replaced}>{repaymentMonths}</Text>{" "}
            months.
          </Text>
          <Text style={styles.paragraph}>
            3.2. The repayment schedule will be provided over the platform.
          </Text>
          <Text style={styles.paragraph}>
            3.3. In an event of default, without prejudice to any rights and
            remedies the bank is entitled to under the law, the bank has the
            right to set off any outstanding loan, including interest, costs,
            and expenses, against any account of the borrower kept with any
            branch of the bank, cheques payable to the borrower, and money
            transfers made to the borrower through the bank. Additionally, it is
            understood that the bank will consistently block the amount
            equivalent to this month's repayment in the borrower's account as a
            preventive measure.
          </Text>
          <Text style={styles.title}>Article 4. Applicable Law</Text>
          <Text style={styles.paragraph}>
            This contact shall be subject to, governed by, and constructed in
            accordance with the relevant provision of Ethiopian Law.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyPDFComponent;
