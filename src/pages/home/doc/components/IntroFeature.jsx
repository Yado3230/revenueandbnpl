import introDots from "../../../../assets/images/introDots.png";

export const IntroFeature = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="mx-auto sm:text-center lg:max-w-2xl">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto testdark:text-gray-300">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">The</span>
            </span>{" "}
            Souqpass is the most relaible, easy and fast payment gateway in
            Ethiopia.
          </h2>
          <p className="text-base text-gray-700 md:text-lg testdark:text-gray-400">
            Souqpass has a wide range of options for merchants to manage their
            transactions. It also provides a variety of Intros that make it easy
            for merchants to accept payments from customers around the world.
          </p>
        </div>
        <div className="mb-4 lg:mb-6">
          <img
            className="object-cover w-full h-56 rounded sm:h-64 md:h-80 lg:h-96"
            src={introDots}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
