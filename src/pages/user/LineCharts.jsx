import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineCahrts({
  ebirrTransactions,
  coopassTransaction,
  stripeTransaction,
  paypalTransactions,
  chappaTransactions,
}) {
  const getPreviousMonths = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date(dateString);
    const currentMonthIndex = currentDate.getMonth();
    const previousMonths = [];

    for (let i = 0; i <= 5; i++) {
      const previousMonthIndex = currentMonthIndex - i;

      if (previousMonthIndex >= 0) {
        previousMonths.unshift(months[previousMonthIndex]);
      } else {
        previousMonths.unshift(months[12 + previousMonthIndex]);
      }
    }

    return previousMonths;
  };
  const currentDate = new Date().toISOString().split("T")[0];
  const data = [
    {
      name: getPreviousMonths(currentDate)[0],
      PayPal: 4000,
      Coopass: 2400,
      Ebirr: 2900,
      Stripe: 0,
      Chappa: 0,
      amt: 2400,
    },
    {
      name: getPreviousMonths(currentDate)[1],
      PayPal: 3000,
      Coopass: 1398,
      Ebirr: 2198,
      Stripe: 1250,
      Chappa: 2300,
      amt: 2210,
    },
    {
      name: getPreviousMonths(currentDate)[2],
      PayPal: 2000,
      Coopass: 9800,
      Ebirr: 1800,
      Stripe: 1800,
      Chappa: 2100,
      amt: 2290,
    },
    {
      name: getPreviousMonths(currentDate)[3],
      PayPal: 2780,
      Coopass: 3908,
      Ebirr: 4908,
      Stripe: 2400,
      Chappa: 3200,
      amt: 2000,
    },
    {
      name: getPreviousMonths(currentDate)[4],
      PayPal: 1890,
      Coopass: 4800,
      Ebirr: 5300,
      Stripe: 3600,
      Chappa: 2100,
      amt: 2181,
    },
    {
      name: getPreviousMonths(currentDate)[5],
      PayPal: 2390,
      Coopass: 3800,
      Ebirr: 3100,
      Stripe: 2500,
      Chappa: 2600,
      amt: 2500,
    },
  ];

  const updatedData = data.map((item, index) => {
    const updatedItem = { ...item }; // Create a copy of the item

    // Update the properties with the fetched data
    updatedItem.Coopass = coopassTransaction?.filter(
      (item) =>
        new Date(0, new Date(item.updatedAt).getMonth()).toLocaleString("en", {
          month: "long",
        }) === updatedItem.name
    ).length;
    updatedItem.Chappa = chappaTransactions.filter(
      (item) => new Date(item?.updatedAt).getMonth() === updatedItem.name
    ).length;
    updatedItem.Stripe = stripeTransaction?.filter(
      (item) =>
        new Date(0, new Date(item.updatedAt).getMonth()).toLocaleString("en", {
          month: "long",
        }) === updatedItem.name
    ).length;
    updatedItem.PayPal = paypalTransactions?.filter(
      (item) =>
        new Date(0, new Date(item.updatedAt).getMonth()).toLocaleString("en", {
          month: "long",
        }) === updatedItem.name
    ).length;
    updatedItem.Ebirr = ebirrTransactions?.filter(
      (item) =>
        new Date(0, new Date(item.updatedAt).getMonth()).toLocaleString("en", {
          month: "long",
        }) === updatedItem.name
    ).length;

    return updatedItem;
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        data={updatedData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Coopass"
          stroke="#37CDBE"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="PayPal"
          stroke="#003087"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Ebirr"
          stroke="#06882E"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Stripe"
          stroke="#6772E5"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Chappa"
          stroke="#7DC242"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
