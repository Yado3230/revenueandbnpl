import { Formik } from "formik";
import React, { useContext } from "react";
import { FormContext } from "../MultiStepForm";
import Input from "../../../components/Input";
// import Selectinput from "../../../components/Selectinput";
import Fileinput from "../../../components/Fileinput";
import Textarea from "../../../components/Textarea";
// import Addressproof from "../../../components/Addressproof";
import * as Yup from "yup";

function Basic2() {
  // const [successful, setSuccessful] = useState(false);

  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  // const renderError = (message) => (
  //   <p className="italic text-red-600">{message}</p>
  // );

  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const validationSchema = Yup.object().shape({
    waddress: Yup.string().required("Fullname is required"),

    description: Yup.string().required("Fullname is required"),
    file: Yup.mixed()
      .required("A file is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  return (
    <Formik
      initialValues={{
        waddress: "",
        description: "",
        file: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // formData.append("tradeLicenseImage", tradeLicenseImage);

        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      {(props) => (
        <>
          <>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:col-span-2 testdark:text-white">
                Business In Formation
              </h2>

              <div className="sm:col-span-2">
                <span className="text-sm link-error">
                  {props.errors.waddress && props.touched.waddress
                    ? props.errors.waddress
                    : null}
                </span>
                <Input
                  label="waddress"
                  title="Website Address"
                  type="text"
                  name="waddress"
                  value={props.values.waddress}
                  handleChange={props.handleChange}
                  id="waddress"
                  place="souqpass.com"
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <span className="text-sm link-error">
                  {props.errors.file && props.touched.file
                    ? props.errors.file
                    : null}
                </span>
                <Fileinput
                  lable="trdlicence"
                  title="Trade Licence"
                  name="file"
                  // handleChange={props.handleChange}
                  fileInputTOForm={(e) => {
                    props.setTouched({
                      file: true,
                    });
                    props.setFieldValue("file", e.target.files[0]);
                  }}
                  value={props.values.file}
                />
              </div>
              <div className="sm:col-span-2">
                <span className="text-sm link-error">
                  {props.errors.description && props.touched.description
                    ? props.errors.description
                    : null}
                </span>
                <Textarea
                  label="description"
                  title="Description Of Company"
                  value={props.values.description}
                  handleChange={props.handleChange}
                  name="description"
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

export default Basic2;
