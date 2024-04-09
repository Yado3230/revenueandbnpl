import React from "react";
import { Link } from "react-router-dom";
const month = [];
for (let i = 1; i < 13; i++) {
  month.push({ label: i, value: i });
}
const year = [];
const thisyear = new Date().getFullYear();
const endyear = thisyear + 5;
for (let i = thisyear; i < endyear; i++) {
  year.push({ label: i, value: i });
}

const Cardpay = (props) => {
  return (
    <>
      <div>
        <input
          type="text"
          name="cardholder"
          id="cardNumber"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
          placeholder="Card Holder"
          required=""
        />
      </div>
      <div>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
          placeholder="0000 0000 0000 0000"
          className="bg-gray-50 border
            border-gray-300 text-gray-900 sm:text-sm rounded-lg
            focus:ring-primary focus:border-primary block w-full p-2.5
            testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400
            testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
          required=""
        />
      </div>
      <div className="flex flex-col my-3">
        <div className="mb-2">
          <label htmlFor="" className="text-gray-700">
            Expired
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <select
            name=""
            id=""
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
            x-model="expired.month"
          >
            {month.map((arr) => (
              <option value={arr.value}>{arr.label}</option>
            ))}
          </select>
          <select
            name=""
            id=""
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
            x-model="expired.year"
          >
            {year.map((arr) => (
              <option value={arr.value}>{arr.label}</option>
            ))}
          </select>
        </div>
      </div>
      <Link
        to="/otp"
        type="submit"
        // onClick={props.handleSubmit}
        className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
      >
        Pay now
      </Link>
    </>
  );
};

export default Cardpay;
