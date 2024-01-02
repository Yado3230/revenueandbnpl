import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="mt-4 md:mt-20 md:flex md:flex-col md:fixed md:top-0 md:left-0">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="w-full p-4 menu bg-base-100 text-base-content dark:bg-gray-900 dark:text-white">
        <div className=""></div>
        <li className="mb-1">
          <Link to={"/documentation"}>Introduction</Link>
        </li>
        <li className="mb-1">
          <Link to={"/documentation/getstarted"}>Get Started</Link>
        </li>
        <li className="mb-1">
          <Link to={"/documentation/paymentintegration"}>
            Build Payment Integration
          </Link>
        </li>
        <li className="mb-1">
          <Link to={"/documentation/bnpl"}>Buy Now Pay Later</Link>
        </li>
        <li className="mb-1">
          <Link to={"/documentation/rbf"}>Revenu Based Financing</Link>
        </li>
        <li className="mb-1">
          <Link to={"/documentation/aboutus"}>About Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
