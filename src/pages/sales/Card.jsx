import React from "react";

function Card() {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow testdark:bg-gray-800 testdark:border-gray-700">
      <span>
        <img
          className="p-8 rounded-t-lg"
          src="https://imgs.search.brave.com/Suh9P965Xp5fRgpFBcMQTilz3nWUJij_YkeJawdC7tY/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5W/X2RUd01PRW9zZklQ/cGRwcDk2bHd3SGFI/YSZwaWQ9QXBp"
          alt="product"
        />
      </span>
      <div className="px-5 pb-5">
        <span>
          <h5 className="text-xl mb-2 font-semibold tracking-tight text-gray-900 testdark:text-white">
            Apple Watch Series 7 GPS
          </h5>
        </span>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 testdark:text-white">
            1999 Birr
          </span>
          <span className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-blue-600 testdark:hover:bg-blue-700 testdark:focus:ring-blue-800">
            Payment Options
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
