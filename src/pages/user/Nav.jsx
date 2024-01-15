import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useEffect } from "react";
import { useState } from "react";
import { getEkyInfo, setlogOut } from "../../store/actions/userProfileAction";
import KYCService from "../../services/kyc.service";
import jwtDecode from "jwt-decode";

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
