import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Reports = () => {
  const revenueDetails = [
    { id: 1, name: "Laptop", revenue: 3000 },
    { id: 2, name: "T-shirt", revenue: 3750 },
    { id: 3, name: "Book", revenue: 1500 },
    { id: 4, name: "Smartphone", revenue: 4000 },
    { id: 5, name: "Sneakers", revenue: 5600 },
    { id: 6, name: "Headphones", revenue: 2000 },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-sm border">
          <div className="card-body">
            <div>
              <div className="">
                <h2 className="card-title">Earning Reports</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              </div>
              <div className="grid grid-cols-3 items-center">
                <div className="flex flex-col spave-y-4">
                  <span className="text-4xl font-bold">470%</span>
                  <span className="badge badge-accent badge-outline">
                    accent
                  </span>
                </div>
                <div className="col-span-2">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      width={1050}
                      height={400}
                      data={revenueDetails}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#26ABE2" name="Quantity" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div>
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <h2 className="card-title">Earning Reports</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm border">
          <div className="card-body">
            <div>
              <div className="">
                <h2 className="card-title">Earning Reports</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              </div>
              <div>
                <div className="badge badge-accent badge-outline">accent</div>
              </div>
            </div>
            <div>
              <div className="card bg-base-100 shadow-sm border">
                <div className="card-body">
                  <h2 className="card-title">Earning Reports</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
