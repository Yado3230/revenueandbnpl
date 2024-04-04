import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";

const Resetpassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    // acceptTerms: Yup.bool().oneOf([true], "Accept Terms"),
  });
  let navigate = useNavigate();
  return (
    <>
      <section className="bg-gray-50 testdark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow testdark:border md:mt-0 sm:max-w-md testdark:bg-gray-800 testdark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl testdark:text-white">
              Change Password
            </h2>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
                // acceptTerms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                // setOpen(true);
                AuthService.resetPassword(
                  values.password.toString(),
                  token,
                  id
                ).then(
                  (resp) => {
                    navigate("/auth");
                    window.location.reload();
                  },
                  (error) => {
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();

                    // setMessage(resMessage);
                    // setSuccessful(false);
                  }
                );
              }}
            >
              {(props) => (
                <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                    >
                      New Password
                    </label>
                    <span className="text-sm link-error">
                      {props.errors.password && props.touched.password
                        ? props.errors.password
                        : null}
                    </span>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
                      value={props.values.password}
                      onChange={props.handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                    >
                      Confirm password
                    </label>
                    <span className="text-sm link-error">
                      {props.errors.confirmPassword &&
                      props.touched.confirmPassword
                        ? props.errors.confirmPassword
                        : null}
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
                      value={props.values.confirmPassword}
                      onChange={props.handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={props.handleSubmit}
                    className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
                  >
                    Reset passwod
                  </button>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resetpassword;
