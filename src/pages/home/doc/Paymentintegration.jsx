import React from "react";
import Code, { PaymentCode } from "../../../components/Code";
import ApiHero from "./components/ApiHero";
import ApiTable from "./components/ApiTable";

const Paymentintegration = () => {
  const response = `{
    "link": "http://souqpass.coopbankoromiasc.com/gateway/VTJGc2RHVmtYMStBR0hkOGlaNGZJb2pLZSt3YklEa0xKYmkvQ0tRNzVuMD0="
}`;
  const codeData = [
    {
      title: "Coopass",
      language: "json",
      code: `Endpoint: http://souqpass.coopbankoromiasc.com/api/initiatePayment
      {
        "clientId":"2ead5285-24e0-4a48-a2fe-f51433ca5bd8",
        "secrateKey":"d9c86fea-9fc1-4821-85e9-b716a860d393",
        "apiKey":"c84779a2-18b5-4d77-8fa0-fbc02da173ad",
        "callBackUrl":"http://localhost:5001/api/callBack",
        "returnUrl":"http://localhost:3000",
        "orderId":"1f3g67p8",
        "currency":"ETB",
        "phoneNumber":"900771378",
        "amount":"2"
    }`,
    },
    {
      title: "Chapa",
      language: "json",
      code: `Endpoint: http://souqpass.coopbankoromiasc.com/api/chapainitiate
      {
        "clientId": "ee4423a1-3955-49a8-8aeb-5c34ea744988",
        "secrateKey": "ee4423a1-3955-49a8-8aeb-5c34ea744988",
        "apiKey": "e903bb10-cbe3-4285-a30e-2ebb948e5f55",
        "callBackUrl": "http://souqpass.coopbankoromiasc.com/dashboard/products",
        "returnUrl": "http://localhost:3000",
        "authToken":"CHASECK_TEST-MozGIHYgzprWQQMVMbtg3zbr2XiyMwky",
        "email": "coop.ihub@gmail.com",
        "first_name": "John",
        "last_name": "Doe",
        "tx_ref": "heloofogoooo",
        "title": "49tyukjil4po",
        "description": "49tyujkjli4po",
        "currency": "ETB",
        "amount": "2"
      }`,
    },
    {
      title: "Stripe",
      language: "json",
      code: `Endpoint: http://souqpass.coopbankoromiasc.com/api/initiateStripePayment
      {
        "clientId": "ee4423a1-3955-49a8-8aeb-5c34ea744988",
        "secrateKey": "ee4423a1-3955-49a8-8aeb-5c34ea744988",
        "apiKey": "e903bb10-cbe3-4285-a30e-2ebb948e5f55",
        "callBackUrl": "http://souqpass.coopbankoromiasc.com/dashboard/products",
        "returnUrl":"http://localhost:3000",
        "orderId":"49tKFggKu9khg5KHu4",
        "currency":"USD",
        "phoneNumber":"917275901",
        "amount":"2"
      }`,
    },
    {
      title: "Paypal",
      language: "json",
      code: `Endpoint: http://souqpass.coopbankoromiasc.com/api/initiatePaypalPayment
      {
        "apiKey":"32e6b0f5-b556-4f6f-b7c6-0b99e1ca66c8",
        "clientId":"c82f15e4-157d-48a5-bd0a-7141f786b34c",
        "secrateKey":"bb244d6e-b5d9-45ae-a008-65d13fe6525d",
        "returnUrl":"http://localhost:3000",
        "orderId":"gk49tysghdhffGghd",
        "currency":"USD",
        "phoneNumber":"917275901",
        "paymentService":"paypal",
        "amount":"2"
      }`,
    },
    {
      title: "Ebirr",
      language: "json",
      code: `Endpoint: http://souqpass.coopbankoromiasc.com/api/EbirrPayment
      {
        "clientId": "07a23d02-956c-44ef-86ef-088d7f1e38d6",
        "secrateKey": "17a23d02-956c-44ef-86ef-088d7f1e38d7",
        "apiKey": "2e293211-63d4-4638-a8f3-a8ccde8601ac",
        "accountNo": "251921191399",
        "amount": "100",
        "tipAmount":"10",
        "sales_id":"1",
        "requestId": "RjEV1zQ056A4oe7g",
        "referenceId": "motumatesfrt125fr",
        "invoiceId": "IjEV1zQ0l1TbA4soe7g" 
      }`,
    },
  ];
  return (
    <div className="overflow-auto md:border-l">
      <section>
        <div className="mt-4 md:mx-auto md:px-4 md:max-w-7xl">
          <ApiHero />
          <div className="text-left md:m-4">
            <ApiTable />
            <div className="mt-4 text-lg text-center md:mt-12 dark:text-gray-300">
              <h1>Initiate Payment Integration</h1>
              <p className="mt-4 text-base dark:text-gray-400">
                This section provides code snippets for initiating various
                payment methods. Use these code examples to integrate payment
                functionalities into your application.
              </p>
            </div>
            <div className="mt-4 overflow-auto md:mt-8">
              <PaymentCode codeData={codeData} />
            </div>
            <div className="mt-4 text-lg text-center md:mt-12 dark:text-gray-300">
              <h1>Response</h1>
              <p className="mt-4 text-base dark:text-gray-400">
                Users will be directed to a new webpage for interaction and
                confirmation of their payment.
              </p>
            </div>
            <div className="mt-4 overflow-auto md:mt-8">
              <Code
                codeString={response}
                language={"json"}
                title="Example response"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Paymentintegration;
