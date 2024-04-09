import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <section className="">
        <div className="max-w-screen-xl px-4 py-8 mx-auto mt-32 lg:py-16 lg:px-6">
          <div className="max-w-screen-sm mx-auto text-center">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight lg:text-7xl text-primary testdark:text-primary">
              Coming Soon
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl testdark:text-white">
              Something exciting is on its way!
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 testdark:text-gray-400">
              Stay tuned for updates and be ready for the big reveal.
            </p>
            <Link
              // to={"/"}
              onClick={handleGoBack}
              className="inline-flex text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:focus:ring-primary my-4"
            >
              Go Back
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
