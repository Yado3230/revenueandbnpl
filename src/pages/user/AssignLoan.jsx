import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import Selectinput from "../../components/Selectinput";

const AssignLoan = ({
  onSubmit,
  values,
  onCancel,
  loanConfigDetail,
  inventoryDetail,
}) => {
  const ValidationSchema = Yup.object().shape({
    item_id: Yup.string().required("Item is required"),
    loan_conf_id: Yup.string().required("Loan Config is required"),
  });

  const item_option = inventoryDetail.map((item) => ({
    value: item.item_id,
    label: item.item_name,
  }));

  const loan_option = loanConfigDetail.map((item) => ({
    value: item.loan_conf_id,
    label: item.interest_rate + " % Interest by " + item.duration + " months",
  }));
  return (
    <>
      <Formik
        initialValues={values}
        validationSchema={ValidationSchema}
        isInitialValid={ValidationSchema.isValidSync(values)}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <Selectinput
                  arr={item_option}
                  id="item_id"
                  name="item_id"
                  value={formik.values.item_id}
                  handleChange={formik.handleChange}
                  title="Select Item"
                />
              </div>
              <div className="w-full">
                <Selectinput
                  arr={loan_option}
                  id="loan_conf_id"
                  name="loan_conf_id"
                  value={formik.values.loan_conf_id}
                  handleChange={formik.handleChange}
                  title="Select Loan"
                />
              </div>
            </div>

            <button onClick={onCancel} className="swal2-cancel swal2-styled">
              Cancel
            </button>
            <button
              type="submit"
              onSubmit={onSubmit}
              style={{ backgroundColor: "#01AFEF" }}
              className="swal2-confirm swal2-styled"
            >
              Assign
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AssignLoan;
