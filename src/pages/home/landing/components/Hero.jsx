import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 pt-32 mx-auto text-center lg:px-12">
        {/* <div className="rounded-full w-36 h-36 bg-primary"></div> */}
        <Link
          className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">
            New
          </span>{" "}
          <span className="text-sm font-medium">
            Souqpass is here! See what&apos;s new
          </span>
          <svg
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>

        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto dark:text-white">
          {/* <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> */}

          <span className="relative"> Smarter Payments. Smarter Business</span>
        </h2>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          We&apos;re a payment gateway platform for online ecommerce sites, and
          we&apos;ve got the speed, security, and reliability you need to make
          sure your customers get what they want.
        </p>
        <div className="flex flex-col mb-8 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to={"/documentation"}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary dark:focus:ring-primary"
          >
            Learn more
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
