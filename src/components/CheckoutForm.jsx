import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PaymentServices from "../services/payment.service";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    // const paymentVerification = async ()=>{
    //   await PaymentServices.verifyStripePayment({paymentId:props.paymentId, data:paymentIntent}).then((res)=>{
    //     localStorage.setItem("Response", res)
    //   })
    // }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        localStorage.setItem("Intent", JSON.parse(paymentIntent));
        switch (paymentIntent.status) {
          case "succeeded":
            localStorage.setItem("transaction", JSON.stringify(paymentIntent));

            setMessage("Payment succeeded!");
            break;
          case "processing":
            localStorage.setItem("processing", "processing");
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            localStorage.setItem("notsuccess", "failure");
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            localStorage.setItem("responseData", JSON.stringify(paymentIntent));
            setMessage("Something went wrong.");
            break;
        }
      })
      .then(({ paymentIntent }) => {
        if (paymentIntent.status == "succeeded") {
        }
      });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: "http://localhost:3000/",
        // return_url: props.returnUrl,
      },
      redirect: "if_required",
    });
    if (paymentIntent.status == "succeeded") {
      fetch("https://souqpass.coopbankoromiasc.com/api/verify-stripe-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: paymentIntent.id,
          paymentId: props.paymentId,
          paymentIntent: paymentIntent,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.replace(data.returnUrl);
        })
        .catch((error) => console.error(error));
    }
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error === "card_error" || error === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("Succeed.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="stripeCheckout">
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
