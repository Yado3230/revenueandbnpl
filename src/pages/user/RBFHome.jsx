import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import RBFStats from "./RBFStat";
import RNFChart from "./RNFChart";
import {
  getDashboardCardDetail,
  getYearlyRevenueandProfit,
} from "../../store/actions/reportActions";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function RBFHome() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userProfile);
  const { kyc, userID } = userData;

  useEffect(() => {
    dispatch(getDashboardCardDetail("", "", userID));
    dispatch(getYearlyRevenueandProfit(2023, userID));
  }, []);

  const reportData = useSelector((state) => state.reportInfo);
  const { dashboardCardReport, yearlyRevenueandprofit } = reportData;

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
    <>
      <div className="">
        {!kyc && <Banner />}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-2xl text-gray-600">Dashboard</div>
          <button className="btn btn-outline btn-info mb-2">
            Request For Loan
          </button>
        </div>
        <RBFStats items={dashboardCardReport} />
        <div className="grid gap-2 mt-2 md:grid-cols-12 justify-self-auto">
          <div className="col-span-6 p-2 rounded shadow bg-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-cyan-500 pb-2">
                Expense Vs Profit
              </h3>
              {/* <select className="select select-sm max-w-xs">
                <option disabled selected>
                  Filter
                </option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select> */}
            </div>
            {/* <RNFChart data={yearlyRevenueAndProfitData} /> */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={yearlyRevenueAndProfitData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="expense"
                  fill="#26ABE2"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="earning"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="col-span-3 p-2 rounded shadow bg-white">
            <h2 className=" font-semibold pb-2 flex items-center justify-center">
              Profitability
            </h2>
            <div className="flex items-center justify-center my-2">
              {/* <select className="select select-sm max-w-xs">
                <option disabled selected>
                  Time
                </option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select> */}
            </div>
            <div className="flex items-center justify-between border-b">
              <span className="text-gray-500">Metric</span>
              <span className="text-gray-500">amount</span>
            </div>
            <div className="flex items-center py-2 justify-between border-b mx-1">
              <span className="text-gray-600">Cost of goods and services</span>
              <span className="font-semibold">
                {dashboardCardReport?.totalBuyPrice || 0}
              </span>
            </div>
            <div className="flex items-center py-2 justify-between border-b mx-1">
              <span className="text-gray-600">Expense</span>
              <span className="font-semibold">
                {dashboardCardReport?.totalExpense || 0}
              </span>
            </div>
            <div className="flex items-center py-2 justify-between border-b mx-1">
              <span className="text-gray-600">Revenue</span>
              <span className="font-semibold">
                {dashboardCardReport?.totalrevenue || 0}
              </span>
            </div>
            <div className="flex items-center py-2 justify-between border-b mx-1">
              <span className="text-cyan-600 font-bold text-xl">Profit</span>
              <span className="text-cyan-600 font-bold text-xl">
                {dashboardCardReport?.totalProfit || 0}
              </span>
            </div>
          </div>
          <div className="col-span-3 p-2 rounded shadow bg-white">
            <h2 className=" font-semibold pb-2 flex items-center justify-center">
              Top Sailing Items/Services
            </h2>
            <div className="flex items-center justify-between border-b">
              <span className="text-gray-500">Item</span>
              <span className="text-gray-500">Total amount</span>
            </div>
            {/* <div className="flex flex-col">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default RBFHome;
