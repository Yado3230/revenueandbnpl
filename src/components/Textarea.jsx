import React from "react";

function Textarea(props) {
  return (
    <>
      <label
        htmlFor={props.label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title}
      </label>
      <textarea
        id={props.label}
        onChange={props.handleChange}
        rows="8"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
        placeholder="Your description here"
      ></textarea>
    </>
  );
}

export default Textarea;
