import React, { useMemo } from "react";
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
import SoldItem from "./SoltItem";

const COLORS1 = ["#F082DD", "#e0e0e0"];
const COLORS = ["#00bcd4", "#e0e0e0"];

const ReportAnalysis = React.memo(
  ({
    dashboardCardReport,
    yearlyRevenueandprofit,
    previousAndCurrentMonth,
    soldItems,
  }) => {
    const items = useMemo(
      () => ({
        revenue: 500,
        totalBuy: 10000,
        totalexpence: 2582,
      }),
      []
    );

    const revenue = useMemo(
      () => [
        {
          name: "Revenue",
          value: previousAndCurrentMonth?.revenue?.[0]?.total,
        },
        {
          name: "Remaining",
          value: previousAndCurrentMonth?.revenue?.[1]?.total,
        },
      ],
      [previousAndCurrentMonth?.revenue]
    );

    const expense = useMemo(
      () => [
        {
          name: "Expense",
          value: previousAndCurrentMonth?.expenses?.[0]?.total_expense,
        },
        {
          name: "Remaining",
          value: previousAndCurrentMonth?.expenses?.[1]?.total_expense,
        },
      ],
      [previousAndCurrentMonth?.expenses]
    );

    const profit = useMemo(
      () => [
        {
          name: "Profit",
          value: previousAndCurrentMonth?.profit?.[0]?.total_profit,
        },
        {
          name: "Remaining",
          value: previousAndCurrentMonth?.profit?.[1]?.total_profit,
        },
      ],
      [previousAndCurrentMonth?.profit]
    );

    const data1 = useMemo(
      () => previousAndCurrentMonth?.profit?.[0]?.total_profit,
      [previousAndCurrentMonth?.profit]
    );

    const yearlyRevenueandprofitnew = useMemo(() => {
      if (yearlyRevenueandprofit.monthly_revenue) {
        return yearlyRevenueandprofit;
      } else {
        return {
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
      }
    }, [yearlyRevenueandprofit]);
    // Extract year and month from the backend response
    const yearMonth = yearlyRevenueandprofitnew?.monthly_revenue[0]?.year_month;
    const [year, month] = yearMonth ? yearMonth.split("-") : [null, null];

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

    return (
      <React.Fragment>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:col-span-3 h-full">
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <h2 className="card-title">Statistics</h2>
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
                          {dashboardCardReport?.totalProfit || 0}
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
                          {dashboardCardReport?.totalrevenue || 0}
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
                          {dashboardCardReport?.totalExpense || 0}
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
                        <div className="stat-title">
                          Cost of Goods & Services
                        </div>
                        <div className="stat-value text-accent">
                          {dashboardCardReport?.totalBuyPrice || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 h-full md:grid-cols-3 gap-4 mt-5">
            <div className="h-full">
              <div className="grid grid-cols-2 gap-2">
                <div className="card bg-base-100 col-span-2 md:col-span-1 shadow-sm border">
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
                        {(
                          (previousAndCurrentMonth?.expense?.[0]
                            ?.total_expense -
                            previousAndCurrentMonth?.expense?.[1]
                              ?.total_expense) /
                          previousAndCurrentMonth?.expense?.[1]?.total_expense
                        ).toFixed(2) * 100 || 100}{" "}
                        % Expenses more than last month
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card bg-base-100 col-span-2 md:col-span-1 shadow-sm border">
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
                          {previousAndCurrentMonth?.profit?.[0]?.total_profit ||
                            0}
                        </span>
                        <span>
                          {(
                            (previousAndCurrentMonth?.profit?.[0]
                              ?.total_profit -
                              previousAndCurrentMonth?.profit?.[1]
                                ?.total_profit) /
                            previousAndCurrentMonth?.profit?.[1]?.total_profit
                          ).toFixed(2) * 100 || 100}{" "}
                          %
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="card bg-base-100 shadow-sm border">
                    <div className="card-body">
                      <div className="grid grid-cols-2">
                        <div className="flex flex-col">
                          <h2 className="card-title">Generated Revenue</h2>
                          <p>Monthly Report</p>
                          <span>
                            {
                              previousAndCurrentMonth?.expenses?.[0]
                                ?.total_expense
                            }
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
            <div className="col-span-2 h-full">
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
            <div className="col-span-3 md:col-span-2">
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <h2 className="card-title">Popular Products</h2>
                  <p>Top sold Products</p>
                  <div>
                    <div className="flex flex-col">
                      <SoldItem items={soldItems} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <h2 className="card-title">Profitability</h2>
                  <p>Top sold Products</p>
                  <div className="col-span-3 p-2 rounded bg-white">
                    <div className="col-span-3 p-2 rounded bg-white">
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
                          {dashboardCardReport?.totalBuyPrice}
                        </span>
                      </div>
                      <div className="flex items-center py-2 justify-between border-b mx-1">
                        <span className="text-gray-600">Expense</span>
                        <span className="font-semibold">
                          {dashboardCardReport?.totalexpence}
                        </span>
                      </div>
                      <div className="flex items-center py-2 justify-between border-b mx-1">
                        <span className="text-gray-600">Revenue</span>
                        <span className="font-semibold">
                          {dashboardCardReport?.totalrevenue}
                        </span>
                      </div>
                      <div className="flex items-center py-2 justify-between border-b mx-1">
                        <span className="text-cyan-600 font-bold text-xl">
                          Profit
                        </span>
                        <span className="text-cyan-600 font-bold text-xl">
                          {dashboardCardReport?.totalProfit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);
export default ReportAnalysis;
