import React from "react";

const Getstarted = () => {
  return (
    <div className="border-l">
      <div className="px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold">
          Signing Up for a New Account
        </h1>

        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Step 1: Registration</h2>
          <ol className="pl-6 list-decimal">
            <li>
              Access the Registration Form by visiting our website or
              application.
            </li>
            <li>
              Fill in your email or phone number along with a secure password in
              the registration form.
            </li>
            <li>Submit the completed form to proceed.</li>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            Step 2: Account Activation
          </h2>
          <ol className="pl-6 list-decimal">
            <li>
              Check your email or phone for an activation link sent from our
              platform.
            </li>
            <li>
              Click on the activation link provided within the email or SMS.
            </li>
            <li>
              Follow the instructions to activate your account and confirm your
              registration.
            </li>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            Step 3: KYC (Know Your Customer) Form
          </h2>
          <ol className="pl-6 list-decimal">
            <li>Log in to your newly activated account on our platform.</li>
            <li>
              Access the KYC form or section within your account settings.
            </li>
            <li>
              Complete the KYC form by providing necessary identification
              documents and personal details.
            </li>
            <li>Submit the KYC details for verification.</li>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            Step 4: KYC Approval and Access
          </h2>
          <ol className="pl-6 list-decimal">
            <li>
              Await review and approval of your submitted KYC details by our
              team.
            </li>
            <li>
              Upon successful verification, you will receive confirmation of
              your KYC approval.
            </li>
            <li>
              Access all platform features and functionalities upon KYC
              approval.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Getstarted;
