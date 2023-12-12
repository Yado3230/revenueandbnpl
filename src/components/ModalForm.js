import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Selectinput from "./Selectinput";
import BankServices from "../services/bank.services";
// import BankAccountServices from "../services/bank-account.services";
import {
  nameEnquiryByAccountNumber,
  // setPrimaryAccount,
} from "../store/actions/bank_accountAction";
const ValidationSchema = Yup.object().shape({
  // accountHolder: Yup.string().required("Account Holder Name is required"),
  accountNumber: Yup.string().required("Account Number is required"),
  bankName: Yup.string().required("You Have to select Bank"),
});

export const ModalForm = ({ values, onSubmit, onCancel }) => {
  const AccountListData = useSelector((state) => state.accountsList);
  const [currentBank, setCurrentUser] = useState({});
  // const [currentName, setCurrentName] = useState({});
  const dispatch = useDispatch();
  const {  criteriaValue } = AccountListData;

  const dropdown = [];
  dropdown[0] = { label: "Select Bank", value: "Bank Name" };
  if (currentBank instanceof Array) {
    currentBank.map((item, index) =>
      dropdown.push({ label: item.bankName, value: item.bankCode })
    );
  }

  useEffect(() => {
     BankServices.getBank().then((res) => {
      setCurrentUser(res);
    });

  }, []);

  const queryCustomerName = (e) => {
    if (e.target.value.length === 13) {
      dispatch(nameEnquiryByAccountNumber(e.target.value));
      // const customerName = BankAccountServices.nameEnquiryByAccountNumber(
      //   e.target.value
      // ).then((res) => {
      //   setCurrentName(res);
      // });
    }
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={ValidationSchema}
      isInitialValid={ValidationSchema.isValidSync(values)}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <span className="text-sm link-error">
                  <ErrorMessage name="accountNumber" />
                </span>
                <Input
                  label="accno"
                  title="Account Number"
                  type="text"
                  name="accountNumber"
                  id="accountNumber"
                  place="1022225648986"
                  value={formik.values.accountNumber}
                  handleChange={formik.handleChange}
                  fetchName={queryCustomerName}
                  //   handleChange={handleChange}
                />
              </div>
              <div>
                <span className="text-sm link-error">
                  <ErrorMessage name="bankName" />
                </span>
                <Selectinput
                  arr={dropdown}
                  id="bankName"
                  name="bankName"
                  title="Choose Bank"
                  value={values.bankName}
                  handleChange={formik.handleChange}
                  // selectName={selectBankName}
                />
              </div>
              <div className="sm:col-span-2">
                <span className="text-sm link-error">
                  <ErrorMessage name="accountHolder" />
                </span>
                <Input
                  label="accholder"
                  title="Account Holder"
                  type="text"
                  name="accountHolder"
                  id="accountHolder"
                  disabled="disabled"
                  value={typeof criteriaValue === "string" ? criteriaValue : ""}
                  handleChange={formik.handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              onSubmit={onSubmit}
              className="swal2-confirm swal2-styled"
            >
              OK
            </button>
            <button onClick={onCancel} className="swal2-cancel swal2-styled">
              Cancel
            </button>
          </form>
        </>
      )}
    </Formik>
    //   render={({ isValid }) => {
    //     return (
    //       <Form>

    //       </Form>
    //     );
    //   }}
    // />
  );
};
