import React from "react";

function Input(props) {
  return (
    <>
      <label
        htmlFor={props.label}
        className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
      >
        {props.title}{" "}
        {props.title === "Website URL" ? (
          ""
        ) : (
          <span className="text-red-500">*</span>
        )}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        // onChange={props.formikProps.handleChange}
        disabled={props.disabled}
        onChange={props.handleChange}
        onInput={props.fetchName}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
        placeholder={props.place}
        required={props.required}
      />
    </>
  );
}

export default Input;
