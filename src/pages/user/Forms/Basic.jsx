import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { FormContext } from "../MultiStepForm";
import Input from "../../../components/Input";
import Selectinput from "../../../components/Selectinput";
// import Fileinput from "../../../components/Fileinput";
// import Textarea from "../../../components/Textarea";
// import Addressproof from "../../../components/Addressproof";
import * as Yup from "yup";

// const region = [
//   { label: "Afar", value: "af" },
//   { label: "Amhara", value: "am" },
//   { label: "Benishangul", value: "bg" },
//   { label: "Fedral", value: "fd" },
//   { label: "Gambela", value: "gm" },
//   { label: "Harar", value: "hr" },
//   { label: "Oromia", value: "or" },
//   { label: "Sidama", value: "sd" },
//   { label: "Somalia", value: "sm" },
//   { label: "SNNPR", value: "sn" },
//   { label: "Tigray", value: "tg" },
// ];
const incorporation = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];
const industry = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];
const category = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
];
const staffsize = [
  { label: "Up to 5", value: "5" },
  { label: "6 to 15", value: "15" },
  { label: "16 to 50", value: "50" },
  { label: "Above 50", value: "a50" },
];
const transaction = [
  { label: "Below 10,000", value: "10000" },
  { label: "10,000 to 50,000", value: "50000" },
  { label: "50,000 to 100,000", value: "100000" },
  { label: "Above 100,000", value: "a100000" },
];

function Basic() {
  const [successful] = useState(false);

  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const validationSchema = Yup.object().shape({
    lgname: Yup.string().required("Legal Name is required"),
    incorporation: Yup.string().required("Incorporation is required"),
    industry: Yup.string().required("Industry is required"),
    category: Yup.string().required("Fullname is required"),
    regstaffsizeion: Yup.string().required("Fullname is required"),
    transaction: Yup.string().required("Fullname is required"),
    tinno: Yup.string().required("Fullname is required"),
  });

  return (
    <Formik
      initialValues={{
        lgname: "",
        incorporation: "",
        industry: "",
        category: "",
        regstaffsizeion: "",
        transaction: "",
        tinno: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      {(props) => (
        <>
          {!successful && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900 sm:col-span-2 testdark:text-white">
                  Business In Formation
                </h2>

                <div className="w-full">
                  <span className="text-sm link-error">
                    {props.errors.lgname && props.touched.lgname
                      ? props.errors.lgname
                      : null}
                  </span>
                  <Input
                    label="lgname"
                    title="Legal Name"
                    type="text"
                    name="lgname"
                    value={props.values.lgname}
                    handleChange={props.handleChange}
                    // onChange={props.handleChange}

                    place="Souqpass S.C"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <span className="text-sm link-error">
                    {props.errors.incorporation && props.touched.incorporation
                      ? props.errors.incorporation
                      : null}
                  </span>
                  <Selectinput
                    arr={incorporation}
                    id="incorporation"
                    name="incorporation"
                    value={props.values.incorporation}
                    handleChange={props.handleChange}
                    title="Type of Incorporation"
                  />
                </div>
                <div className="w-full">
                  <span className="text-sm link-error">
                    {props.errors.industry && props.touched.industry
                      ? props.errors.industry
                      : null}
                  </span>
                  <Selectinput
                    arr={industry}
                    id="industry"
                    name="industry"
                    value={props.values.industry}
                    handleChange={props.handleChange}
                    title="Industry"
                  />
                </div>

                <div>
                  <span className="text-sm link-error">
                    {props.errors.category && props.touched.category
                      ? props.errors.category
                      : null}
                  </span>
                  <Selectinput
                    arr={category}
                    id="category"
                    name="category"
                    title="Category"
                    value={props.values.category}
                    handleChange={props.handleChange}
                  />
                </div>
                <div>
                  <span className="text-sm link-error">
                    {props.errors.regstaffsizeion &&
                    props.touched.regstaffsizeion
                      ? props.errors.regstaffsizeion
                      : null}
                  </span>
                  <Selectinput
                    arr={staffsize}
                    id="regstaffsizeion"
                    name="regstaffsizeion"
                    title="Staff size"
                    value={props.values.regstaffsizeion}
                    handleChange={props.handleChange}
                  />
                </div>
                <div>
                  <span className="text-sm link-error">
                    {props.errors.transaction && props.touched.transaction
                      ? props.errors.transaction
                      : null}
                  </span>
                  <Selectinput
                    arr={transaction}
                    id="transaction"
                    name="transaction"
                    value={props.values.transaction}
                    handleChange={props.handleChange}
                    title="Monthly Transaction Amount"
                  />
                </div>
                <div>
                  <span className="text-sm link-error">
                    {props.errors.tinno && props.touched.tinno
                      ? props.errors.tinno
                      : null}
                  </span>
                  <Input
                    label="tinno"
                    title="Tin Number"
                    type="text"
                    name="tinno"
                    id="tinno"
                    value={props.values.tinno}
                    handleChange={props.handleChange}
                    place="FM48496469"
                    required=""
                  />
                </div>
                <div>
                  <span className="text-sm link-error">
                    {props.errors.bno && props.touched.bno
                      ? props.errors.bno
                      : null}
                  </span>
                  <Input
                    label="bno"
                    title="Business Registration Number"
                    type="text"
                    name="bno"
                    value={props.values.bno}
                    handleChange={props.handleChange}
                    id="bno"
                    place="FM48496469"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  onClick={props.handleSubmit}
                  className="sm:col-span-2 text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* <Form className="flex flex-col justify-center items-center">
        <div className="text-2xl font-medium self-center mb-2">Welcome!</div>
        <div className="flex flex-col items-start mb-2">
          <label className="font-medium text-gray-900">Name</label>
          <Field
            name="name"
            className="rounded-md border-2 p-2"
            placeholder="John Doe"
          />
        </div>
        <ErrorMessage name="name" render={renderError} />
        <div className="flex flex-col items-start mb-2">
          <label className="font-medium text-gray-900">Email</label>
          <Field
            name="email"
            className="rounded-md border-2 p-2"
            placeholder="john.doe@gmail.com"
          />
        </div>
        <ErrorMessage name="email" render={renderError} />
        <button
          className="rounded-md bg-indigo-500 font-medium text-white my-2 p-2"
          type="submit"
        >
          Continue
        </button>
      </Form> */}
    </Formik>
  );
}

export default Basic;
