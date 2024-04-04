import React from "react";
import Footer from "../../components/Footer";

function TermsAndConditions() {
  return (
    <>
      <div className="text-center mx-80 mt-36 mb-12">
        {/* <div className="flex flex-col w-full mb-12 text-center"> */}
        <h1 className="max-w-5xl text-2xl m-8 font-bold leading-none tracking-tighter md:text-5xl lg:text-6xl lg:max-w-7xl testdark:text-white">
          Terms and Conditions
        </h1>
        <h1 className="text-2xl m-4 text-black">1. Introduction</h1>
        <p className="text-lg text-gray-500">
          Welcome to Souqpass, a payment gateway website that allows customers,
          merchants, and agents to send and receive payments securely and
          efficiently. By using our Services, you agree to these Terms and
          Conditions ("Terms"), which form a binding agreement between you and
          Souqpass. Please read these Terms carefully before using our Services.
        </p>
        <h1 className="text-2xl m-4 text-black">2. Definitions</h1>
        <p className="text-lg text-gray-500">
          "Customer" means any individual or entity that uses our Services to
          make a payment.
        </p>
        <p className="text-lg text-gray-500">
          "Merchant" means any individual or entity that uses our Services to
          receive payments and has registered for a merchant account with
          Souqpass.
        </p>
        <p className="text-lg text-gray-500">
          "Agent" means any individual or entity that uses our Services on
          behalf of another organization.
        </p>
        <p className="text-lg text-gray-500">
          "Services" means the payment gateway and related services provided by
          Souqpass.
        </p>
        <h1 className="text-2xl m-4 text-black">3. Use of the Services</h1>
        <h1 className="text-xl m-4 text-black">3.1 Customers</h1>

        <p className="text-lg text-gray-500">
          Customers can use our Services to make payments without the need for
          registration. By using our Services, you represent and warrant that
          you are authorized to use the payment method you have selected.
        </p>
        <h1 className="text-xl m-4 text-black">3.2 Merchants</h1>

        <p className="text-lg text-gray-500">
          Merchants must register for a merchant account with Souqpass before
          incorporating our payment gateway on their site. By registering for an
          account, you represent and warrant that you have the authority to
          enter into this agreement and to use our Services.
        </p>
        <h1 className="text-xl m-4 text-black">3.3 Agents</h1>

        <p className="text-lg text-gray-500">
          Agents can use our Services on behalf of other organizations. By using
          our Services, you represent and warrant that you are authorized to act
          on behalf of the organization you are representing.
        </p>
        <h1 className="text-2xl m-4 text-black">4. Payment Processing</h1>
        <h1 className="text-xl m-4 text-black">4.1 Payment Processing Fees</h1>

        <p className="text-lg text-gray-500">
          Souqpass charges a processing fee for each transaction made through
          our Services. The processing fee is deducted from the payment amount
          before it is sent to the recipient.
        </p>
        <h1 className="text-xl m-4 text-black">4.2 Payment Processing Time</h1>

        <p className="text-lg text-gray-500">
          Souqpass processes payments as quickly as possible, but we cannot
          guarantee instant processing. The time it takes to process a payment
          may vary depending on the payment method, the recipient's bank, and
          other factors beyond our control.
        </p>
        <h1 className="text-2xl m-4 text-black">5. Account Security</h1>
        <h1 className="text-xl m-4 text-black">5.1 Account Responsibility</h1>

        <p className="text-lg text-gray-500">
          You are responsible for maintaining the security of your Souqpass
          account, including your login credentials and any other sensitive
          information associated with your account.
        </p>
        <h1 className="text-xl m-4 text-black">5.2 Unauthorized Use</h1>

        <p className="text-lg text-gray-500">
          If you suspect that your account has been compromised or used without
          your authorization, you must notify us immediately by contacting our
          customer support team.
        </p>
        <h1 className="text-2xl m-4 text-black">6. Limitation of Liability</h1>
        <p className="text-lg text-gray-500">
          Souqpass and its officers, directors, employees, and agents will not
          be liable for any direct, indirect, incidental, special,
          consequential, or punitive damages arising out of or in any way
          related to the use of our Services, even if we have been advised of
          the possibility of such damages.
        </p>
        <h1 className="text-2xl m-4 text-black">
          7. Modifications to the Services or Terms
        </h1>
        <p className="text-lg text-gray-500">
          Souqpass reserves the right to modify or discontinue, temporarily or
          permanently, any part of our Services or these Terms at any time and
          for any reason, without notice or liability to you.
        </p>
        <h1 className="text-2xl m-4 text-black">
          8. Governing Law and Jurisdiction
        </h1>
        <p className="text-lg text-gray-500">
          These Terms and any dispute arising out of or in connection with these
          Terms or our Services shall be governed by and construed in accordance
          with the laws of [insert governing law], without giving effect to any
          choice or conflict of law provision or rule.
        </p>
        <h1 className="text-2xl m-4 text-black">9. Miscellaneous</h1>
        <h1 className="text-xl m-4 text-black">9.1 Entire Agreement</h1>

        <p className="text-lg text-gray-500">
          These Terms constitute the entire agreement between you and Souqpass
          regarding the use of our Services and supersede all prior or
          contemporaneous communications and proposals, whether oral or written,
          between you and Souqpass.
        </p>
        <h1 className="text-xl m-4 text-black">9.2 Severability</h1>

        <p className="text-lg text-gray-500">
          If any provision of these Terms is found to be invalid or
          unenforceable, the remaining provisions shall remain in full force and
          effect.
        </p>
        <h1 className="text-xl m-4 text-black">9.3 Waiver</h1>

        <p className="text-lg text-gray-500">
          The failure of Souqpass to enforce any right or provision of these
          Terms shall not constitute a waiver of such right or provision.
        </p>
        <p className="text-lg text-gray-500">Thank you for using Souqpass!</p>
      </div>
      <Footer />
    </>
  );
}

export default TermsAndConditions;
