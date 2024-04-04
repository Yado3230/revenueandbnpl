import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
// import { useState } from "react";
function EpassRegistration() {
  // const form = useRef();
  // const checkButton = useRef();

  // const [fname, setFname] = useState("");
  // const [lname, setLname] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Fullname is required"),
    lastName: Yup.string().required("Fullname is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phone: Yup.string().required("Phone is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms"),
  });
  let navigate = useNavigate();
  return (
    <>
      <section className="bg-gray-50 testdark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow testdark:border md:mt-0 sm:max-w-md xl:p-0 testdark:bg-gray-800 testdark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl testdark:text-white">
                SignUp to Epass
              </h1>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  password: "",
                  // confirmPassword: "",
                  confirmPassword: "",
                  acceptTerms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   setSubmitting(false);
                  // }, 400);
                  setOpen(true);
                  AuthService.register(
                    values.firstName,
                    values.lastName,
                    values.email,
                    values.phone,
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

                      setMessage(resMessage);
                      setSuccessful(false);
                    }
                  );
                }}
              >
                {(props) => (
                  <>
                    {isOpen && (
                      <>
                        {MySwal.fire({
                          title: <p>Hello World</p>,
                          show: { isOpen },
                          didOpen: () => {
                            // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                            MySwal.showLoading();
                          },
                        })}
                      </>
                    )}

                    {!successful && (
                      <>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                          <div>
                            <label
                              htmlFor="fname"
                              className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                            >
                              First Name
                            </label>
                            <span className="text-sm link-error">
                              {props.errors.firstName && props.touched.firstName
                                ? props.errors.firstName
                                : null}
                            </span>
                            <input
                              type="fname"
                              name="firstName"
                              id="fname"
                              value={props.values.firstName}
                              onChange={props.handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                              placeholder="Lelisa"
                              required=""
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="mname"
                              className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                            >
                              Middle Name
                            </label>
                            <span className="text-sm link-error">
                              {props.errors.lastName && props.touched.lastName
                                ? props.errors.lastName
                                : null}
                            </span>
                            <input
                              type="mname"
                              name="lastName"
                              id="mname"
                              value={props.values.lastName}
                              onChange={props.handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                              placeholder="Abdusemed"
                              required=""
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                          >
                            Business email
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            placeholder="name@company.com"
                            required=""
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                          >
                            Business Phone
                          </label>
                          <span className="text-sm link-error">
                            {props.errors.phone && props.touched.phone
                              ? props.errors.phone
                              : null}
                          </span>
                          <input
                            type="number"
                            name="phone"
                            id="phone"
                            value={props.values.phone}
                            onChange={props.handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            placeholder="0900000000"
                            required=""
                            maxlength="9"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                          >
                            Password
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
                            onChange={props.handleChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            required=""
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
                            value={props.values.confirmPassword}
                            onChange={props.handleChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            required=""
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                          >
                            SET PIN
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
                            value={props.values.confirmPassword}
                            onChange={props.handleChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            required=""
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
                          >
                            Confirm PIN
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
                            value={props.values.confirmPassword}
                            onChange={props.handleChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
                            required=""
                          />
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <span className="text-sm link-error">
                              {props.errors.acceptTerms &&
                              props.touched.acceptTerms
                                ? props.errors.acceptTerms
                                : null}
                            </span>
                            <input
                              id="acceptTerms"
                              name="acceptTerms"
                              aria-describedby="terms"
                              type="checkbox"
                              value={props.values.acceptTerms}
                              onChange={props.handleChange}
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary testdark:bg-gray-700 testdark:border-gray-600 testdark:focus:ring-primary testdark:ring-offset-gray-800"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="terms"
                              className="font-light text-gray-500 testdark:text-gray-300"
                            >
                              I accept the{" "}
                              <Link
                                className="font-medium text-primary hover:underline testdark:text-primary"
                                to={"/"}
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
                            to={"/"}
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
                          <Link to={"/auth"} className="btn btn-primary">
                            Login
                          </Link>
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

export default EpassRegistration;
