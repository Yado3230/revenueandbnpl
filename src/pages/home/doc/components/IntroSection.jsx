import intro1 from "../../../../assets/images/intro1.png"
import intro2 from "../../../../assets/images/intro2.png"

function IntroSection() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            We didn&apos;t reinvent the wheel
          </h2>
          <p className="mb-4">
            we just took all of the best parts of other payment gateways and
            made them better. We&apos;re constantly improving our platform so
            that it works better for you and your customers, while also
            providing a great user experience.
          </p>
          <p>
            We&apos;re here to help you make your business more successful by
            helping you take payments from anywhere in the Country.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full border rounded-lg"
            src={intro1}
            alt="office content 1"
          />
          <img
            className="w-full mt-4 border rounded-lg lg:mt-10"
            src={intro2}
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
