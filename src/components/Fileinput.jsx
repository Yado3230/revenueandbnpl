import React, { useState } from "react";

function Fileinput(props) {
  const [image, setImage] = useState(null);
  const [fileName, setFilename] = useState("No File Selected");
  return (
    <>
      <label
        htmlFor={props.label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title} <span className="text-red-500">*</span>
      </label>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={props.label}
          className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <input
            type="file"
            id={props.label}
            hidden
            // onChange={props.handleChange}
            onChange={props.fileInputTOForm}
            onInput={({ target: { files } }) => {
              files[0] && setFilename(files[0].name);
              if (files) {
                setImage(URL.createObjectURL(files[0]));
              }
            }}
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {image ? (
              <>
                <img src={image} className="h-24" alt={fileName} />
              </>
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </>
            )}
          </div>
        </label>
      </div>
      <section>{fileName}</section>
    </>
  );
}

export default Fileinput;
