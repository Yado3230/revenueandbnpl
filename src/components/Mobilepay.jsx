import React from "react";
import { Link } from "react-router-dom";

const Mobilepay = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <div className="w-full col-span-3">
          <input
            type="text"
            name="mobile"
            id="mobile"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0987654321"
            required=""
          />
        </div>
        <div className="w-full">
          <h1 className="mt-2 text-lg font-bold text-center">$100</h1>
        </div>
      </div>

      <Link
        to="/otp"
        type="submit"
        // onClick={props.handleSubmit}
        className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
      >
        Pay now
      </Link>
    </>
  );
};

export default Mobilepay;
