import React from "react";

const Banner = () => {
  return (
    <>
      <div className="bg-primary rounded-lg">
        <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center flex-1 w-0">
              <span className="flex p-2 rounded-lg bg-primary">
                <svg
                  class="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="inline">
                  Please Update your information to start receiving service.
                </span>
              </p>
            </div>
            <span className="text-white font-bold">Profile Completed</span>
            <div
              className="radial-progress text-white mx-2"
              style={{
                "--value": "2",
                "--size": "3rem",
                "--thickness": "5px",
              }}
            >
              2%
            </div>
            <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="users/profile"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary bg-white border border-transparent rounded-md shadow-sm hover:bg-indigo-50"
              >
                Go to Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
