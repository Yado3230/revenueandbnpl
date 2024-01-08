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
  getYearlyRevenueandProfit,
} from "../../store/actions/reportActions";

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
  } = reportData;

  const userData = useSelector((state) => state.userProfile);
  const { userID } = userData;

  useEffect(() => {
    dispatch(getDashboardCardDetail(fromDate, toDate, userID));
    dispatch(getYearlyRevenueandProfit(year, userID));
    dispatch(getCurrentAndPreviousMonthReport(userID));
    dispatch(getAllSoldItems(userID));
  }, [filtered, userID]);

  // Dummy data for demonstration purposes
  const itemsWithCategory = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      brand: "Dell",
      price: 1200,
      quantity: 30,
    },
    {
      id: 2,
      name: "T-shirt",
      category: "Clothing",
      brand: "Nike",
      price: 25,
      quantity: 150,
    },
    {
      id: 3,
      name: "Book",
      category: "Books",
      author: "J.K. Rowling",
      price: 15,
      quantity: 100,
    },
    {
      id: 4,
      name: "Smartphone",
      category: "Electronics",
      brand: "Samsung",
      price: 800,
      quantity: 50,
    },
    {
      id: 5,
      name: "Sneakers",
      category: "Clothing",
      brand: "Adidas",
      price: 70,
      quantity: 80,
    },
    {
      id: 6,
      name: "Headphones",
      category: "Electronics",
      brand: "Sony",
      price: 150,
      quantity: 20,
    },
  ];

  const stockReportThisMonth = [
    { id: 1, name: "Laptop", stock: 30 },
    { id: 2, name: "T-shirt", stock: 150 },
    { id: 3, name: "Book", stock: 100 },
    { id: 4, name: "Smartphone", stock: 50 },
    { id: 5, name: "Sneakers", stock: 80 },
    { id: 6, name: "Headphones", stock: 20 },
    { id: 6, name: "Airpod", stock: 80 },
    { id: 6, name: "Headphones", stock: 20 },
  ];

  const revenueTrends = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 6000 },
    { month: "Mar", revenue: 7500 },
    { month: "Apr", revenue: 6800 },
    { month: "May", revenue: 8000 },
    { month: "Jun", revenue: 9000 },
    { month: "Jul", revenue: 10000 },
    { month: "Aug", revenue: 8000 },
    { month: "Sep", revenue: 9000 },
    { month: "Oct", revenue: 7000 },
    { month: "Nov", revenue: 6000 },
    { month: "Dec", revenue: 11000 },
  ];

  const revenueDetails = [
    { id: 1, name: "Laptop", revenue: 3000 },
    { id: 2, name: "T-shirt", revenue: 3750 },
    { id: 3, name: "Book", revenue: 1500 },
    { id: 4, name: "Smartphone", revenue: 4000 },
    { id: 5, name: "Sneakers", revenue: 5600 },
    { id: 6, name: "Headphones", revenue: 2000 },
  ];

  const costExpenseRevenueReport = {
    totalCost: 12000,
    totalExpense: 3000,
    totalRevenue: 15000,
  };

  const availableItemsReport = [
    { id: 1, name: "Laptop", available: true },
    { id: 2, name: "T-shirt", available: false },
    { id: 3, name: "Book", available: true },
    { id: 4, name: "Smartphone", available: false },
    { id: 5, name: "Sneakers", available: true },
    { id: 6, name: "Headphones", available: false },
  ];

  const renderChart = () => {
    switch (activeTab) {
      case "analysis":
        return (
          <ReportAnalysis
            yearlyRevenueandprofit={yearlyRevenueandprofit}
            dashboardCardReport={dashboardCardReport}
            previousAndCurrentMonth={previousAndCurrentMonth}
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
      case "revenueDetails":
        data = revenueDetails;
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
          <Tab
            label="Revenue Details"
            onClick={() => setActiveTab("revenueDetails")}
            isActive={activeTab === "revenueDetails"}
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
