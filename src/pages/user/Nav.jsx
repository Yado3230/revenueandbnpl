import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useEffect } from "react";
import { useState } from "react";
import { getEkyInfo, setlogOut } from "../../store/actions/userProfileAction";
import KYCService from "../../services/kyc.service";
import jwtDecode from "jwt-decode";
import {
  getLoanRequests,
  getRepaymentSchedule,
} from "../../store/actions/capacityAction";

function Nav() {
  // const [currentUser, setCurrentUser] = useState({});
  const userData = useSelector((state) => state.userProfile);
  const { username, token } = userData;

  const [firstChar, setFirstChar] = useState("");

  const user_token = jwtDecode(token);
  const service_name = user_token?.service_name;

  const logOut = () => {
    setlogOut();
  };

  const handleToggleEdit = async () => {
    dispatch(KYCService.ToggleRbf());
  };
  const { userID } = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userID) {
      dispatch(getEkyInfo(userID));
    }
  }, [userID, dispatch]);

  useEffect(() => {
    dispatch(getLoanRequests(userID));
  }, [userID]);

  const capacityData = useSelector((state) => state.capacityInfo);
  const { merchantLoan, repaymentSchedule } = capacityData;

  useEffect(() => {
    if (merchantLoan[0]?.id) {
      dispatch(getRepaymentSchedule(merchantLoan[0]?.id));
    }
  }, [merchantLoan[0]?.id]);

  const { kyc } = userData;
  useEffect(() => {
    kyc &&
      setFirstChar(
        kyc.first_name?.charAt(0)?.toUpperCase() +
          kyc.last_name?.charAt(0)?.toUpperCase()
      );
  }, [kyc]);

  return (
    <>
      <div className="shadow-md navbar bg-base-100 dark:bg-gray-900 dark:text-white">
        <div className="flex-1">
          <label htmlFor="my-drawer-2" className="ml-4 drawer-button">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </label>
        </div>
        {Array.isArray(repaymentSchedule) && repaymentSchedule?.length > 0 && (
          <div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="-mt-2 border shadow card card-compact dropdown-content w-72 bg-base-100"
              >
                <div className="card-body">
                  <span className="text-cyan-500 font-semibold text-base">
                    Your Loan Request is Disbursed 🎉
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {service_name?.includes("BNPL") && (
          <div className="form-control mx-3">
            <label className="cursor-pointer label border rounded-xl">
              <span className="label-text mx-2 font-bold">BNPL</span>
              <input
                type="checkbox"
                disabled
                className="toggle toggle-accent"
                checked={kyc?.rbf}
                onClick={() => handleToggleEdit()}
              />
              <span className="label-text mx-2 font-bold">RBF</span>
            </label>
          </div>
        )}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="avatar placeholder  cursor-pointer">
              <div className="bg-cyan-500 text-white text-xl rounded-full w-11">
                <span>{firstChar ? firstChar : "M"}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 dark:text-black"
            >
              <span className="pt-2 pl-2">
                username: {username ? username : ""}
                {/* client id: {Cookies.get("token")} */}
              </span>

              <div className="divider"></div>
              <li>
                <Link
                  to={"/users/profile"}
                  // onClick={() => window.location.reload()}
                  className="justify-between"
                >
                  Profile{" "}
                </Link>
              </li>
              <li>
                <Link
                  to={"/users/setting"}
                  // onClick={() => window.location.reload()}
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link to={"/"} onClick={() => logOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
