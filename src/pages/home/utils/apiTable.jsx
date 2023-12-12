export const columns = [
  {
    name: "Parameters",
    selector: (row) => row.key,
    // style: { backgroundColor: 'gray' },
  },
  {
    name: "Description",
    selector: (row) => row.des,
    wrap: true,
    grow: 10,
  },
  {
    name: "Required",
    selector: (row) => row.mandatory,
  },
];

export const data = [
  {
    key: "API key",
    des: " An API key is a unique identifier used to authenticate and authorize access to an application programming interface (API). Once you have successfully registered your bank account, an API key will be provided to you. You will be able to change the API key anytime",
    mandatory: "Mandatory",
  },
  {
    key: "Client ID",
    des: "A Client ID is a unique identifier assigned to a client application or device by a server. Once you have successfully registered your account, a Client Id will be provided to you.",
    mandatory: "Mandatory",
  },
  {
    key: "Secret key",
    des: "A secret key, also known as a client secret, is a confidential key used in secure communication between a client application and a server,. Once you have successfully filled KYC and authenticated your account, a Secret key will be provided to you.",
    mandatory: "Mandatory",
  },
  {
    key: "Amount",
    des: "Amount of money refers to the quantity or value of a monetary unit such as dollars, euros, or yen, which may be exchanged or used to purchase goods and services.This will be provided from a client application",
    mandatory: "Mandatory",
  },
  {
    key: "Currency",
    des: "USD or ETB are both valid options for currency.",
    mandatory: "Mandatory",
  },
  {
    key: "Order Id",
    des: "An Order ID is a unique identifier assigned to a specific order or transaction, which is used to track and manage the status of the order throughout the fulfillment process.",
    mandatory: "Mandatory",
  },
  {
    key: "Callback URL",
    des: "A callback URL is a web address that a server uses to send a response to a client application after completing a request, typically used in webhooks to facilitate communication between different systems.",
    mandatory: "Mandatory",
  },
  {
    key: "Device Id",
    des: "A device ID is a unique identifier assigned to a physical device, which is used to distinguish it from other devices and enable access to specific services or applications.",
    mandatory: "Optional",
  },
];
