import { Link } from "react-router-dom";
import landingRevolution from "../../../../assets/images/landingRevolution.svg";
import landingRevolutionDark from "../../../../assets/images/landingRevolutionDark.svg";

function Section() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="items-center max-w-screen-xl gap-8 px-4 py-8 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img
          className="w-full dark:hidden"
          src={landingRevolution}
          alt="dashboard image2"
        />
        <img
          className="hidden w-full dark:block"
          src={landingRevolutionDark}
          alt="dashboard image3"
        />
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Revolution Starts here.
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            The emergence of globalization has brought about significant changes
            in the business landscape. In order to thrive in this environment,
            fast and easy Internet access has become a fundamental requirement
            for almost all sectors of the economy. As a result, e-Business has
            become a reality and businesses that operate online must recognize
            that the ability to accept payments online can be a determining
            factor for their success. In today&apos;s digital world, the
            capacity to process payments electronically can make or break the
            growth and profitability of your business.
          </p>
          <Link
            to={"/auth/registration"}
            className="inline-flex items-center text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary"
          >
            Get started
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

export default Section;
