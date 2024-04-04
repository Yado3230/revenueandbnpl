import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";
import logo from "./../../assets/images/logo.png";

function Registration() {
  const [validationResult, setValidationResult] = useState({
    errors: [],
    requirements: {},
  });

  const StrongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = (value) => {
    let errors = [];
    const requirements = {
      length: value.length >= 8 && value.length <= 40,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[@$!%*?&]/.test(value),
    };

    if (!requirements.length) {
      errors.push("Password must be between 8 and 40 characters long.");
    }

    if (!requirements.lowercase) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    if (!requirements.uppercase) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!requirements.digit) {
      errors.push("Password must contain at least one digit.");
    }

    if (!requirements.specialChar) {
      errors.push("Password must contain at least one special character.");
    }

    return { errors, requirements };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const validationResult = validatePassword(newPassword);
    setValidationResult(validationResult);
  };

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        StrongPasswordRegex,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      )
      .min(8, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms"),
  });
  let navigate = useNavigate();
  return (
    <>
      <section className="bg-gray-50 lg:mx-32 testdark:bg-gray-900 lg:flex">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:w-1/2 md:h-screen lg:py-0">
          <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-full">
            <img className="w-full mb-2" src={logo} alt="front credit card" />
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-black testdark:text-white sm:text-4xl sm:leading-none">
              Shop Now, Pay Later
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-900 md:text-lg testdark:text-white">
              Experience the freedom of shopping with Buy Now, Pay Later. Shop
              now, pay later, and enjoy the convenience of flexible payments.
              Join us today and elevate your shopping experience. Indulge in
              what you love without compromise.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:w-1/2 md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow testdark:border md:mt-0 sm:max-w-md xl:p-0 testdark:bg-gray-800 testdark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl testdark:text-white">
                Create <span className="text-primary">Merchant</span> Account
              </h1>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  // confirmPassword: "",
                  confirmPassword: "",
                  acceptTerms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  AuthService.register(
                    values.username,
                    values.password.toString()
                  ).then(
                    (resp) => {
                      setMessage(resp.message);
                      setSuccessful(true);
                      Swal.fire({
                        title: "You are Successfully registers",
                        text: "Do you want to continue",
                        icon: "success",
                        confirmButtonText: "Cool",
                      });
                      navigate("/");
                      window.location.reload();
                    },
                    (error) => {
                      const resMessage =
                        (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                        error.message ||
                        error.toString();

                      setMessage(resMessage);
                      setSuccessful(false);
                    }
                  );
                }}
              >
                {(props) => (
                  <>
                    {!successful && (
                      <>
                        <div>
                          <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                          >
                            User Name (Email or Phone Number){" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <span className="text-sm link-error">
                            {props.errors.username && props.touched.username
                              ? props.errors.username
                              : null}
                          </span>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={props.values.username}
                            onChange={props.handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            placeholder="Valid Email or Phone Number"
                            required=""
                            maxlength="200"
                          />
                          {/* <ErrorMessage name="username"></ErrorMessage> */}
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                          >
                            Password <span className="text-red-500">*</span>
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
                            value={props.values.password}
                            onChange={(e) => {
                              props.handleChange(e);
                              handlePasswordChange(e, setValidationResult);
                            }}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            required=""
                          />
                          {/* <ErrorMessage name="password"></ErrorMessage> */}
                        </div>
                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                          >
                            Confirm password{" "}
                            <span className="text-red-500">*</span>
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
                            id="confirmPassword"
                            value={props.values.confirmPassword}
                            onChange={props.handleChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            required=""
                          />
                          {/* <ErrorMessage name="confirmPassword"></ErrorMessage> */}
                        </div>
                        <div>
                          {props.values.password.length > 0 ? (
                            validationResult.requirements.specialChar &&
                            validationResult.requirements.digit &&
                            validationResult.requirements.lowercase &&
                            validationResult.requirements.uppercase &&
                            validationResult.requirements.length ? (
                              <li className="flex items-center justify-between">
                                <span
                                  className={`font-semibold text-green-500`}
                                >
                                  Password Check{" "}
                                </span>
                                <span
                                  className={`font-semibold text-green-500`}
                                >
                                  ✓
                                </span>
                              </li>
                            ) : (
                              <div className="text-sm">
                                <ul className="">
                                  <li className="flex items-center justify-between">
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements.length
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      Password Length:{" "}
                                    </span>
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements.length
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {validationResult.requirements.length
                                        ? "✓"
                                        : "✗"}
                                    </span>
                                  </li>
                                  <li className="flex items-center justify-between">
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements.lowercase
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      Contains Lowercase Letter:{" "}
                                    </span>
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements.lowercase
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {validationResult.requirements.lowercase
                                        ? "✓"
                                        : "✗"}
                                    </span>
                                  </li>
                                  <li className="flex items-center justify-between">
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements.uppercase
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      Contains Uppercase Letter:{" "}
                                    </span>
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements.uppercase
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {validationResult.requirements.uppercase
                                        ? "✓"
                                        : "✗"}
                                    </span>
                                  </li>
                                  <li className="flex items-center justify-between">
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements.digit
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      Contains Digit:{" "}
                                    </span>
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements.digit
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {validationResult.requirements.digit
                                        ? "✓"
                                        : "✗"}
                                    </span>
                                  </li>
                                  <li className="flex items-center justify-between">
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements
                                          .specialChar
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      Contains Special Character:{" "}
                                    </span>
                                    <span
                                      className={`font-semibold ${
                                        validationResult.requirements
                                          .specialChar
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {validationResult.requirements.specialChar
                                        ? "✓"
                                        : "✗"}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            )
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center h-5">
                            <span className="text-sm link-error">
                              {props.errors.acceptTerms &&
                              props.touched.acceptTerms
                                ? props.errors.acceptTerms
                                : null}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <input
                              id="acceptTerms"
                              name="acceptTerms"
                              aria-describedby="terms"
                              type="checkbox"
                              value={props.values.acceptTerms}
                              onChange={props.handleChange}
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary testdark:bg-gray-700 testdark:border-gray-600 testdark:focus:ring-primary testdark:ring-offset-gray-800"
                            />
                            <label
                              htmlFor="terms"
                              className="font-light ml-2 text-gray-500 testdark:text-gray-300"
                            >
                              {" "}
                              Accept the{" "}
                              <Link
                                className="font-medium text-primary hover:underline testdark:text-primary"
                                to={"/auth/termsandconditions"}
                              >
                                Terms and Conditions
                              </Link>
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          onClick={props.handleSubmit}
                          className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
                        >
                          Create an account
                        </button>

                        <p className="text-sm font-light text-gray-500 testdark:text-gray-400">
                          Already have an account?{" "}
                          <Link
                            to={"/auth"}
                            className="font-medium text-primary hover:underline testdark:text-primary"
                          >
                            Login here
                          </Link>
                        </p>
                      </>
                    )}
                    {message && (
                      <div className="form-group">
                        <div
                          className={
                            successful
                              ? "alert alert-success"
                              : "alert alert-danger"
                          }
                          role="alert"
                        >
                          {message}
                          {/* <Link to={"/auth"} className="btn btn-primary">
                            Login
                          </Link> */}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registration;
