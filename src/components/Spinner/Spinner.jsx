import React from "react";
import "./Spinner.css"; // Import CSS for styling

const Spinner = () => {
  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin-top: -25px; margin-bottom: -25px; background: none; display: block; shape-rendering: auto;" width="104px" height="104px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <path fill="none" stroke="#01afef" stroke-width="8" stroke-dasharray="220.66647827148438 35.92244995117187" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.48000000000000004);transform-origin:50px 50px">
      <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.0204081632653061s" keyTimes="0;1" values="0;256.58892822265625"></animate>
    </path>
    </svg>`;

  return (
    <div className="">
      <div dangerouslySetInnerHTML={{ __html: svgCode }} />
    </div>
  );
};

export default Spinner;
