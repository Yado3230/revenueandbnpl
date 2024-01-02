import React from "react";

const Aboutus = () => {
  return (
    <div className="border-l">
      <div className="px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold">About Souqpass</h1>

        <p className="mb-6 text-lg text-gray-700">
          Souqpass is a financial platform powered by Cooperative Bank of
          Oromia, dedicated to providing innovative financial solutions tailored
          to meet the evolving needs of businesses and individuals.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Our Services</h2>

        <div className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">Payment Gateway</h3>
          <p className="text-lg text-gray-700">
            Souqpass offers a robust and secure payment gateway solution to
            facilitate seamless transactions for businesses of all sizes. Our
            gateway ensures safe and efficient payment processing, enabling
            businesses to expand their customer reach and enhance user
            experience.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">Buy Now Pay Later</h3>
          <p className="text-lg text-gray-700">
            With Souqpass's Buy Now Pay Later (BNPL) service, customers of
            registered businesses can make purchases immediately and pay later
            in convenient installments. This service empowers customers by
            providing flexible payment options, boosting sales for businesses.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">
            Revenue-Based Financing
          </h3>
          <p className="text-lg text-gray-700">
            Souqpass offers Revenue-Based Financing (RBF) designed to support
            businesses' growth aspirations. RBF aligns with your business's
            revenue stream, providing flexible funding solutions that adapt to
            your income flow. This financing option helps businesses achieve
            sustainable growth without fixed repayment schedules.
          </p>
        </div>

        <p className="text-lg text-gray-700">
          At Souqpass, we are committed to empowering businesses and individuals
          with cutting-edge financial services. Partner with us to unlock new
          opportunities and accelerate your financial journey.
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
