function ApiHero() {
  return (
    <div className="flex flex-col w-full mb-12">
      <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter md:text-5xl lg:text-6xl lg:max-w-7xl testdark:text-white">
        Get Started and <br className="hidden lg:block" />
        Process Payments!
      </h1>
      <h1 className="mt-12 text-lg font-light text-gray-900 testdark:text-gray-300">
        Welcome to the Souqpass API documentation! Our API enables you to
        integrate payment processing into your website or application, providing
        your customers with a secure and easy-to-use payment experience. With
        support for a variety of payment methods, currencies, and languages, our
        API offers customizable payment forms and flexible integration options.
        Our documentation provides detailed information on endpoints,
        parameters, and responses, along with code samples in multiple
        programming languages.
      </h1>
      <div className="mt-12 text-xl text-gray-800 testdark:text-gray-400">
        <h1>
          To assist you, here&apos;s an example code snippet you could send us.
        </h1>
      </div>
    </div>
  );
}

export default ApiHero;
