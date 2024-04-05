import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import RBFStats from "./RBFStat";
import {
  getAllSoldItems,
  getModifiedReports,
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
import SoldItem from "./SoltItem";
import { Link } from "react-router-dom";
import { getLoanRequests } from "../../store/actions/capacityAction";

function RBFHome() {
  const currentDate = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userProfile);
  const { kyc, userID } = userData;

  useEffect(() => {
    dispatch(getYearlyRevenueandProfit(2024, userID));
    dispatch(getAllSoldItems(userID));
    dispatch(getModifiedReports(userID, "", "", currentDate, true, true, true));
    dispatch(getLoanRequests(userID));
  }, [userID]);

  const capacityData = useSelector((state) => state.capacityInfo);
  const { merchantLoan } = capacityData;

  const reportData = useSelector((state) => state.reportInfo);
  const { yearlyRevenueandprofit, soldItems, modifiedReports } = reportData;

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
          {Array.isArray(merchantLoan) &&
          merchantLoan?.length > 0 &&
          merchantLoan.filter((item) => item.status === "PENDING").length &&
          merchantLoan.filter((item) => item.status === "APPROVED").length ? (
            ""
          ) : (
            <Link to="loanrequest">
              <button className="btn btn-outline btn-info mb-2">
                Request For Loan
              </button>
            </Link>
          )}
        </div>
        <RBFStats items={modifiedReports} />
        <div className="grid gap-2 mt-2 md:grid-cols-12 justify-self-auto">
          <div className="col-span-6 p-2 rounded shadow bg-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-cyan-500 pb-2">
                Expense Vs Profit
              </h3>
            </div>
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
          <div className="md:col-span-6">
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
        </div>
      </div>
    </>
  );
}

export default RBFHome;
