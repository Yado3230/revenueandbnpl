import { useState } from "react";
import PropTypes from "prop-types";

export const Input = (props) => {
  return (
    <>
      <label
        htmlFor={props.id}
        className={`block mb-2 text-sm font-medium text-gray-900 testdark:text-white ${props.labelClass}`}
      >
        {props.title}
      </label>
      <span className="text-sm link-error"></span>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        onInput={props.fetchName}
        onBlur={props.onBlur}
        className={`w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary ${props.inputClass}`}
        placeholder={props.place}
        required={props.required}
        {...props}
      />
      {props.error && <span className="text-sm link-error">{props.error}</span>}
    </>
  );
};

export const Radio = (props) => {
  return (
    <div className="flex items-center h-5">
      {props.error && <span className="text-sm link-error">{props.error}</span>}
      <input
        id={props.name}
        name={props.name}
        aria-describedby="terms"
        type="checkbox"
        disabled={props.disabled}
        className={`checkbox checkbox-primary checkbox-xs ${props.inputClass}`}
      />
      <div className="ml-3 text-sm">
        <label
          htmlFor={props.name}
          className="text-gray-500 testdark:text-gray-300"
        >
          {props.title}
        </label>
      </div>
      {/* <Radio name={} className={}/> */}
    </div>
  );
};

export const TextArea = (props) => {
  return (
    <>
      <label
        htmlFor={props.name}
        className={`block mb-2 text-sm font-medium text-gray-900 testdark:text-white ${props.labelClass}`}
      >
        {props.title}
      </label>
      <textarea
        id={props.name}
        rows="6"
        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary focus:border-primary testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary ${props.inputClass}`}
        placeholder={props.place}
      ></textarea>
    </>
    //  <TextArea title={"Your message"} place={"Leave a comment..."} />
  );
};

export const Select = (props) => {
  return (
    <>
      <label
        htmlFor={props.id}
        className={`block mb-2 text-sm font-medium text-gray-900 testdark:text-white ${props.labelClass}`}
      >
        {props.title}
      </label>
      <select
        id={props.id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
        onChange={props.onChange}
        value={props.value}
      >
        <option value="" disabled>
          Select
        </option>
        {props.arr.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.error && <span className="text-sm link-error">{props.error}</span>}
    </>
  );
};

export const FileInput = (props) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
      // Pass the file object to the parent component's onChange function if provided
      if (props.onChange) {
        props.onChange(file);
      }
    }
  };

  return (
    <>
      <label
        htmlFor={props.label}
        className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
      >
        {props.title}
      </label>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={props.label}
          className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 testdark:hover:bg-gray-800 testdark:bg-gray-700 hover:bg-gray-100 testdark:border-gray-600 testdark:hover:border-gray-500"
        >
          <input
            type="file"
            id={props.label}
            hidden
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {image ? (
              <img src={image} className="h-24" alt={fileName} />
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 testdark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 testdark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </>
            )}
          </div>
        </label>
      </div>
      <section>{fileName}</section>
      {props.error && <span className="text-sm link-error">{props.error}</span>}
    </>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  fetchName: PropTypes.func,
  onBlur: PropTypes.func,
  inputClass: PropTypes.string,
  place: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  inputClass: PropTypes.string,
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  place: PropTypes.string,
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  arr: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
};
// export const Radio = (props) => {
//   return (
//     <div>Radio</div>
//   )
// }
