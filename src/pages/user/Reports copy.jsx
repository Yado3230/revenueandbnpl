// InventoryReport.js

import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("itemsWithCategory");

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
        <h2 className="text-xl font-semibold mb-4">
          Cost, Expense & Revenue Report
        </h2>
        <select className="select select-info select-sm">
          <option disabled selected>
            Filter
          </option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-gray-700">Total Cost of Goods:</p>
          <p className="text-2xl font-bold text-gray-800">
            ${costExpenseRevenueReport.totalCost}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Total Revenue:</p>
          <p className="text-2xl font-bold text-green-600">
            ${costExpenseRevenueReport.totalRevenue}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Total Expense:</p>
          <p className="text-2xl font-bold text-red-600">
            ${costExpenseRevenueReport.totalExpense}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4">
        <h1 className="mb-4">{renderCostExpenseRevenueReport()}</h1>

        <div className="flex space-x-2 mb-4">
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

        <div className="bg-white p-6 rounded-lg shadow">
          {renderChart()}
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;
