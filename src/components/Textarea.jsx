import React from "react";

function Textarea(props) {
  return (
    <>
      <label
        htmlFor={props.label}
        className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
      >
        {props.title}
      </label>
      <textarea
        id={props.label}
        onChange={props.handleChange}
        rows="8"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
        placeholder="Your description here"
      ></textarea>
    </>
  );
}

export default Textarea;
