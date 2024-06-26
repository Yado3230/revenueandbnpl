import React from "react";

function Selectinput(props) {
  return (
    <>
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
      >
        {props.title} <span className="text-red-500">*</span>
      </label>
      <select
        id={props.id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
        value={props.value}
        onChange={props.handleChange}
        // onInput={props.selectName}
      >
        <option value="" selected disabled>
          Select
        </option>
        {props.arr?.map((arr) => (
          <option data-phone-number={arr.phone || ""} value={arr.value}>
            {arr.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default Selectinput;
