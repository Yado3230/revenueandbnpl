import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  Cell,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const COLORS1 = ["#F082DD", "#e0e0e0"];
const COLORS = ["#00bcd4", "#e0e0e0"];

const ReportAnalysis = ({
  dashboardCardReport,
  yearlyRevenueandprofit,
  previousAndCurrentMonth,
}) => {
  const items = {
    revenue: 500,
    totalBuy: 10000,
    totalexpence: 2582,
  };

  const revenue = [
    {
      name: "Revenue",
      value: previousAndCurrentMonth?.revenue?.[0]?.total,
    },
    {
      name: "Remaining",
      value: previousAndCurrentMonth?.revenue?.[1]?.total,
    },
  ];

  const expense = [
    {
      name: "Expense",
      value: previousAndCurrentMonth?.expenses?.[0]?.total_expense,
    },
    {
      name: "Remaining",
      value: previousAndCurrentMonth?.expenses?.[1]?.total_expense,
    },
  ];

  const profit = [
    {
      name: "Profit",
      value: previousAndCurrentMonth?.profit?.[0]?.total_profit,
    },
    {
      name: "Remaining",
      value: previousAndCurrentMonth?.profit?.[1]?.total_profit,
    },
  ];

  const data1 = previousAndCurrentMonth?.profit?.[0]?.total_profit;
  console.log("first", data1);

  const yearlyRevenueandprofitnew = yearlyRevenueandprofit.monthly_revenue
    ? yearlyRevenueandprofit
    : {
        monthly_revenue: [
          {
            year_month: "2023-12",
            total: "0",
          },
        ],
        monthly_profit: [
          {
            year_month: "2023-12",
            total_profit: "0",
          },
        ],
      };
  console.log(yearlyRevenueandprofitnew);
  // Extract year and month from the backend response
  const yearMonth = yearlyRevenueandprofitnew?.monthly_revenue[0]?.year_month;
  const [year, month] = yearMonth?.split("-");

  // Create an array to store monthly data
  const yearlyRevenueAndProfitData = [];

  // Function to pad single-digit months with a leading zero
  const padMonth = (m) => (m < 10 ? `0${m}` : `${m}`);

  // Function to convert month number to three-letter abbreviation
  const monthAbbreviation = (m) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[m - 1];
  };

  // Generate monthly data for the whole year
  for (let i = 1; i <= 12; i++) {
    const monthData = {
      month: monthAbbreviation(i),
      earning: 0,
      expense: 0,
    };

    // Check if the month matches the backend response month
    if (i == month) {
      monthData.earning = parseInt(
        yearlyRevenueandprofitnew?.monthly_revenue[0].total
      );
      monthData.expense =
        parseInt(yearlyRevenueandprofitnew?.monthly_profit[0].total_profit) *
        -1;
    }

    yearlyRevenueAndProfitData.push(monthData);
  }

  console.log("ds", yearlyRevenueAndProfitData);

  // Assuming you have the original data for each month
  // const yearlyRevenueAndProfitData = [
  //   { month: "Jan", earning: 5000, expense: -2000 },
  //   { month: "Feb", earning: 6000, expense: -2500 },
  //   { month: "Mar", earning: 7500, expense: -1800 },
  //   { month: "Apr", earning: 4500, expense: -2300 },
  //   { month: "May", earning: 5800, expense: -2100 },
  //   { month: "Jun", earning: 7000, expense: -2400 },
  //   { month: "Jul", earning: 9000, expense: -2700 },
  //   { month: "Aug", earning: 6200, expense: -1900 },
  //   { month: "Sep", earning: 7500, expense: -2000 },
  //   { month: "Oct", earning: 8000, expense: -2200 },
  //   { month: "Nov", earning: 6700, expense: -2500 },
  //   { month: "Dec", earning: 7200, expense: -1800 },
  // ];

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        <div>
          <div className="card bg-base-100 shadow-sm border h-full">
            <div className="card-body">
              <h2 className="card-title text-cyan-500 font-bold whitespace-nowrap">
                Congra Amir!
              </h2>
              <p>Best seller of the month</p>
              <p>$48.9k</p>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body">
              <h2 className="card-title">Statistics</h2>
              {/* <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <i>{"icon"}</i>
                  <div>
                    <h2>230k</h2>
                    <p>Profit</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i>{"icon"}</i>
                  <div>
                    <h2>8.549k</h2>
                    <p>Revenue</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i>{"icon"}</i>
                  <div>
                    <h2>1.423k</h2>
                    <p>Expense</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i>{"icon"}</i>
                  <div>
                    <h2>$9745</h2>
                    <p>Cost of Goods</p>
                  </div>
                </div>
              </div> */}
              <div className="dark:bg-gray-900">
                <div className="w-full stats dark:bg-gray-900 dark:text-white">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div className="stat-title">Net Profit</div>
                    <div className="stat-value text-primary">
                      {dashboardCardReport?.totalProfit?.toLocaleString()}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure text-secondary">
                      <svg
                        className="w-8 h-8 text-secondary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />{" "}
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value text-secondary">
                      {dashboardCardReport?.totalrevenue?.toLocaleString()}
                    </div>
                    {/* <div className="stat-desc">11% less than yesterday</div> */}
                  </div>

                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="stat-title">Expense</div>
                    <div className="stat-value text-primary">
                      {dashboardCardReport?.totalExpense?.toLocaleString()}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure text-accent">
                      <svg
                        className="w-6 h-6 text-accent"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />{" "}
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    <div className="stat-title">Cost of Goods $ Services</div>
                    <div className="stat-value text-accent">
                      {dashboardCardReport?.totalItemPrice?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div className="card bg-base-100 shadow-sm border">
              <div className="card-body">
                <h2 className="card-title">82.5k</h2>
                <p>Expenses</p>
                <div className="flex flex-col items-center -mt-12">
                  <ResponsiveContainer width="100%" height={100}>
                    <PieChart>
                      <Pie
                        data={expense}
                        cx="50%"
                        cy={100}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={30}
                        outerRadius={50}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {expense.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS1[index % COLORS1.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}k`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <span className="mt-2 text-gray-500">
                    {((previousAndCurrentMonth?.expense?.[0]?.total_expense -
                      previousAndCurrentMonth?.expense?.[1]?.total_expense) /
                      previousAndCurrentMonth?.expense?.[1]?.total_expense) *
                      100 || 100}{" "}
                    % Expenses more than last month
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="card bg-base-100 shadow-sm border">
              <div className="card-body">
                <h2 className="card-title">Profit</h2>
                <p>Last Month</p>
                <div className="flex flex-col">
                  <span>{"chart"}</span>
                  <span className="flex items-center justify-between">
                    <span>624k </span>
                    <span> +8.24%</span>
                  </span>
                </div>
              </div>
            </div> */}
            <div className="card bg-base-100 shadow-sm border">
              <div className="card-body">
                <h2 className="card-title">Profit</h2>
                <p>Last Month</p>
                <div className="flex flex-col">
                  <ResponsiveContainer width="100%" height={100}>
                    <PieChart>
                      <Pie
                        data={profit}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        fill="#00bcd4"
                        label
                      >
                        {profit.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <span className="flex items-center justify-between">
                    <span>
                      {previousAndCurrentMonth?.profit?.[0]?.total_profit}
                    </span>
                    <span>
                      {((previousAndCurrentMonth?.profit?.[0]?.total_profit -
                        previousAndCurrentMonth?.profit?.[1]?.total_profit) /
                        previousAndCurrentMonth?.profit?.[1]?.total_profit ||
                        1) * 100 || 100}
                      %
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="col-span-2">
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h2 className="card-title">Generated Revenue</h2>
                      <p>Monthly Report</p>
                      <span>4,350</span>
                      <span>15.8%</span>
                    </div>
                    <div>{"chart"}</div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-span-2">
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col">
                      <h2 className="card-title">Generated Revenue</h2>
                      <p>Monthly Report</p>
                      <span>
                        {previousAndCurrentMonth?.expenses?.[0]?.total_expense}
                      </span>
                      <span>
                        {" "}
                        {((previousAndCurrentMonth?.expenses?.[0]
                          ?.total_expense -
                          previousAndCurrentMonth?.expenses?.[1]
                            ?.total_expense) /
                          previousAndCurrentMonth?.expenses?.[1]
                            ?.total_expense || 1) * 100 || 100}{" "}
                        %
                      </span>
                    </div>
                    <div className="">
                      <ResponsiveContainer width="100%" height={100}>
                        <PieChart>
                          <Pie
                            dataKey="value"
                            data={revenue}
                            cx="50%"
                            cy="50%"
                            outerRadius={50}
                            fill="#00bcd4"
                            label
                          />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body">
              <h2 className="card-title">Revenue Report</h2>
              <p>Yearly revenue report</p>
              <div>
                <ResponsiveContainer width="100%" height={333}>
                  <BarChart data={yearlyRevenueAndProfitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="earning" fill="#00bcd4" name="Earning" />
                    <Bar dataKey="expense" fill="#F082DD" name="Expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="">
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body">
              <h2 className="card-title">Popular Products</h2>
              <p>Top sold Products</p>
              <div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between p-1 rounded w-full border-y pt-2 my-1">
                    <div className="flex items-center">
                      <div className="avatar mr-2">
                        <div className="w-7 h-7 rounded">
                          <img
                            src="https://pictures-ethiopia.jijistatic.com/504477_NjIwLTcyNi01ZjY2MWIwMjk2LTE.webp"
                            alt="galaxy"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col item-start justify-center">
                        <h3 className="font-semibold text-sm whitespace-nowrap">
                          Galaxy A32
                        </h3>
                        <div className="text-xs text-gray-500">
                          8 Items are sold
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">180000$</span>
                  </div>
                  <div className="flex items-center justify-between p-1 rounded w-full border-b my-1">
                    <div className="flex items-center">
                      <div className="avatar mr-2">
                        <div className="w-7 h-7 rounded">
                          <img
                            src="https://m.media-amazon.com/images/I/41sT-ej9Q-L.jpg"
                            alt="galaxy"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col item-start justify-center">
                        <h3 className="font-semibold text-sm whitespace-nowrap">
                          HP Laptop
                        </h3>
                        <div className="text-xs text-gray-500">
                          8 Items are sold
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">173000$</span>
                  </div>
                  <div className="flex items-center justify-between p-1 rounded w-full border-b my-1">
                    <div className="flex items-center">
                      <div className="avatar mr-2">
                        <div className="w-7 h-7 rounded">
                          <img
                            src="https://images.macrumors.com/t/Xli73M4hhPje3C5CeyhH1Z_c2Ro=/800x0/smart/article-new/2018/02/airpods-3.jpg?lossy"
                            alt="galaxy"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col item-start justify-center">
                        <h3 className="font-semibold text-sm whitespace-nowrap">
                          Airpod Pro 3
                        </h3>
                        <div className="text-xs text-gray-500">
                          12 Items are sold
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">102000$</span>
                  </div>
                  <div className="flex items-center justify-between p-1 rounded w-full border-b my-1">
                    <div className="flex items-center">
                      <div className="avatar mr-2">
                        <div className="w-7 h-7 rounded">
                          <img
                            src="https://shop.yourdoor.co.za/wp-content/uploads/2019/12/airphone-1.jpg"
                            alt="galaxy"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col item-start justify-center">
                        <h3 className="font-semibold text-sm whitespace-nowrap">
                          Headset
                        </h3>
                        <div className="text-xs text-gray-500">
                          4 Items are sold
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">100$</span>
                  </div>
                  <div className="flex items-center justify-between p-1 rounded w-full border-b my-1">
                    <div className="flex items-center">
                      <div className="avatar mr-2">
                        <div className="w-7 h-7 rounded">
                          <img
                            src="https://pictures-ethiopia.jijistatic.com/504477_NjIwLTcyNi01ZjY2MWIwMjk2LTE.webp"
                            alt="galaxy"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col item-start justify-center">
                        <h3 className="font-semibold text-sm whitespace-nowrap">
                          Galaxy A32
                        </h3>
                        <div className="text-xs text-gray-500">
                          10 Items are sold
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">100$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body">
              <h2 className="card-title">Profitability</h2>
              <p>Top sold Products</p>
              <div className="col-span-3 p-2 rounded shadow bg-white">
                {/* <h2 className=" font-semibold pb-2 flex items-center justify-center">
                  Profitability
                </h2> */}
                <div className="flex items-center justify-center my-2">
                  <select className="select select-sm max-w-xs">
                    <option disabled selected>
                      Time
                    </option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                <div className="flex items-center justify-between border-b">
                  <span className="text-gray-500">Metric</span>
                  <span className="text-gray-500">amount</span>
                </div>
                <div className="flex items-center py-2 justify-between border-b mx-1">
                  <span className="text-gray-600">
                    Cost of goods and services
                  </span>
                  <span className="font-semibold">
                    {items?.totalBuy?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center py-2 justify-between border-b mx-1">
                  <span className="text-gray-600">Expense</span>
                  <span className="font-semibold">
                    {(items?.totalexpence + items?.totalBuy).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center py-2 justify-between border-b mx-1">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-semibold">
                    {items?.revenue?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center py-2 justify-between border-b mx-1">
                  <span className="text-cyan-600 font-bold text-xl">
                    Profit
                  </span>
                  <span className="text-cyan-600 font-bold text-xl">
                    {(
                      items?.revenue -
                      (items?.totalexpence + items?.totalBuy)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysis;
