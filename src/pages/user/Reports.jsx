// InventoryReport.js

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ReportAnalysis from "./ReportsAnalysis";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSoldItems,
  getCurrentAndPreviousMonthReport,
  getDashboardCardDetail,
  getOnStockItems,
  getYearlyRevenueandProfit,
} from "../../store/actions/reportActions";
import { getInventoryDetail } from "../../store/actions/getInventoryAction";

const Tab = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`${
      isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
    } px-4 py-2 rounded-t-lg focus:outline-none`}
  >
    {label}
  </button>
);

const InventoryReport = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("analysis");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(currentDate);
  const [year, setYear] = useState(2024);
  const [filtered, setFiltered] = useState(true);

  const reportData = useSelector((state) => state.reportInfo);
  console.log(reportData);
  const {
    dashboardCardReport,
    yearlyRevenueandprofit,
    previousAndCurrentMonth,
    soldItems,
    onStockItems,
  } = reportData;

  const userData = useSelector((state) => state.userProfile);
  const { userID } = userData;

  useEffect(() => {
    dispatch(getDashboardCardDetail(fromDate, toDate, userID));
    dispatch(getYearlyRevenueandProfit(year, userID));
    dispatch(getCurrentAndPreviousMonthReport(userID));
    dispatch(getAllSoldItems(userID));
    dispatch(getOnStockItems(userID));
    dispatch(getInventoryDetail(userID));
  }, [filtered, userID]);

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { inventoryDetail } = inventoryInfo;

  inventoryDetail?.sort(function (a, b) {
    return b.totalQuantity - a.totalQuantity; // Descending order
  });

  var top10inventory = inventoryDetail.slice(0, 10);

  onStockItems?.sort(function (a, b) {
    return b.onstock - a.onstock; // Descending order
  });

  // Return only the top 5 items
  var top10onStockItems = onStockItems?.slice(0, 15);

  // Dummy data for demonstration purposes
  const itemsWithCategory = top10inventory.map((item) => ({
    id: item.item_id,
    name: item.item_name,
    category: item.item_category_id,
    brand: item.item_code,
    price: item.totalQuantity,
    quantity: item.totalQuantity,
  }));

  const stockReportThisMonth = top10onStockItems?.map((item) => ({
    id: item.item_id,
    name: item.item_name,
    stock: item.onstock,
  }));

  const revenueMap = {};

  yearlyRevenueandprofit?.monthly_revenue?.forEach((item) => {
    const [year, month] = item.year_month.split("-");
    const monthName = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
      month: "short",
    });

    revenueMap[monthName] = {
      month: monthName,
      revenue: parseInt(item.total),
    };
  });

  // Create an array with all months, setting revenue to 0 for missing months
  const revenueTrends = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(2000, index, 1);
    const monthName = date.toLocaleString("en-US", { month: "short" });

    return revenueMap[monthName] || { month: monthName, revenue: 0 };
  });

  console.log(revenueTrends);

  const renderChart = () => {
    switch (activeTab) {
      case "analysis":
        return (
          <ReportAnalysis
            yearlyRevenueandprofit={yearlyRevenueandprofit}
            dashboardCardReport={dashboardCardReport}
            previousAndCurrentMonth={previousAndCurrentMonth}
            soldItems={soldItems}
          />
        );
      case "itemsWithCategory":
        return (
          <BarChart
            width={1050}
            height={400}
            data={itemsWithCategory}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#DF8125" name="Quantity" />
            <Bar dataKey="price" fill="#26ABE2" name="Price" />
          </BarChart>
        );
      case "stockReportThisMonth":
        return (
          <BarChart
            width={1050}
            height={400}
            data={stockReportThisMonth}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#26ABE2" />
          </BarChart>
        );
      case "revenueTrends":
        if (revenueTrends.length === 0) {
          return <p>No revenue data available</p>;
        }
        return (
          <LineChart
            width={1050}
            height={400}
            data={revenueTrends}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
          </LineChart>
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    let data = [];
    switch (activeTab) {
      case "itemsWithCategory":
        data = itemsWithCategory;
        break;
      case "stockReportThisMonth":
        data = stockReportThisMonth;
        break;
      default:
        break;
    }

    if (data.length === 0) {
      return <p>No data available</p>;
    }

    return (
      <table className="mt-4 w-full">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="border p-2">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((value) => (
                <td key={value} className="border p-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderCostExpenseRevenueReport = () => (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2 mb-4">
          <Tab
            label="Analysis"
            onClick={() => setActiveTab("analysis")}
            isActive={activeTab === "analysis"}
          />
          <Tab
            label="Items"
            onClick={() => setActiveTab("itemsWithCategory")}
            isActive={activeTab === "itemsWithCategory"}
          />
          <Tab
            label="Stock Report"
            onClick={() => setActiveTab("stockReportThisMonth")}
            isActive={activeTab === "stockReportThisMonth"}
          />
          <Tab
            label="Revenue Trends"
            onClick={() => setActiveTab("revenueTrends")}
            isActive={activeTab === "revenueTrends"}
          />
        </div>
        <div className="flex space-x-2 items-center">
          <div>
            <div>
              <label htmlFor="from">From:</label>
              <input
                type="date"
                id="from"
                max={toDate}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="Type here"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="to">To:</label>
              <input
                type="date"
                id="to"
                value={toDate}
                min={fromDate}
                max={currentDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="Type here"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
          </div>
          <button
            onClick={() => setFiltered(!filtered)}
            className="self-end btn btn-outline btn-accent btn-sm"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4">
        <h1 className="mb-4">{renderCostExpenseRevenueReport()}</h1>

        <div className="">
          {renderChart()}
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;
