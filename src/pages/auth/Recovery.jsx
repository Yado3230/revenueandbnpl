import React from "react";
// import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
// import { PASSWORD } from "../../../../server/configs/db";
import { Formik } from "formik";
import * as Yup from "yup";

function Recovery() {
  // const [successful, setSuccessful] = useState(false);
  // const [message, setMessage] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  // let navigate = useNavigate();

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Don't fret! Just type in your email and we will send you a code to
              reset your password!
            </p>

            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                resetForm({ values: "" });

                AuthService.resetPasswordRequest(values.email).then(
                  () => {},
                  (error) => {
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                      error.message ||
                      error.toString();

                    // setLoading(false);
                    // setMessage(resMessage);
                  }
                );
              }}
            >
              {(props) => (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <span className="text-sm link-error">
                      {props.errors.email && props.touched.email
                        ? props.errors.email
                        : null}
                    </span>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={props.values.email}
                      onChange={props.handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={props.handleSubmit}
                    className="w-full mt-4 text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
                  >
                    Reset password
                  </button>
                </>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
}

export default Recovery;
