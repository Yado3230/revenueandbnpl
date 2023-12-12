import { Link, useNavigate } from "react-router-dom";

function E404() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <section className="">
        <div className="max-w-screen-xl px-4 py-8 mx-auto mt-32 lg:py-16 lg:px-6">
          <div className="max-w-screen-sm mx-auto text-center">
            <h1 className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-primary dark:text-primary">
              404
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Something&apos;s missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can&apos;t find that page. You&apos;ll find lots to
              explore on the home page.{" "}
            </p>
            <Link
              // to={"/"}
              onClick={handleGoBack}
              className="inline-flex text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary my-4"
            >
              Go Back
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default E404;
