import { Link } from "react-router-dom";
import intoLast from "../../../../assets/images/introLast.png";

function IntoLast() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
        <div className="w-5/6 mb-10 lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={intoLast}
          />
        </div>
        <div className="flex flex-col items-center text-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left">
          <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl dark:text-gray-300">
            Try It Out!
          </h1>
          <p className="mb-8 leading-relaxed dark:text-gray-400">
            Ethiopian Pay is easy to use and has a user-friendly interface that
            makes it simple for anyone to use. We are dedicated to providing a
            safe and secure platform for all users around the world, so you can
            feel confident about using our service.
          </p>
          <div className="flex justify-center">
            <Link
              to={"/auth/registration"}
              className="inline-flex px-6 py-2 text-lg text-white border-0 rounded bg-primary focus:outline-none hover:bg-primary"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntoLast;
