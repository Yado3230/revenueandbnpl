import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentServices from "../services/payment.service";
import CheckoutForm from "./CheckoutForm";
import ".././App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51Mq9jkKHQk7p3QY3E7S0EskKLCoY25LLAmVS06lNZczXGhN3N28ooMw1p6vvp2MHvh78rJLpouURHz3JriwU2PB100q1JSuUDM"
);
export default function Stripe(props) {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");
  const stripePayment = () => {
    PaymentServices.StripePayment(
      JSON.stringify({ id: "xl-tshirt", paymentId: props.paymentId })
    )
      .then((res) => {
        if (res.status == 200) {
          setClientSecret(res.data.clientSecret);
        } else if (res.status == 409) {
          setMessage("Already Payed");
        } else {
          setMessage("Network Error");
        }
      })
      .catch((err) => {
        setMessage("Already Payed");
      });
  };
  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("http://localhost:4242/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);
  useEffect(() => {
    stripePayment();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            paymentId={props.paymentId}
            returnUrl={props.returnUrl}
            clientSecret={clientSecret}
          />
        </Elements>
      ) : (
        message
      )}
    </div>
  );
}

// const URL = `http://localhost:3000/gateway/?clientId=2fec3ae8-b7d8-4c44-8a43-7e37617741a5&secretKey=ccf2313b-8d29-42fb-9fb6-d9cf65c3e4e4&key=11cf1af5-b33a-42e7-85e8-d39e6d4c9a8e&callBackUrl=http://192.168.231.76:3000/&currency=USD&orderId=id123456&amount=59.99`;
