import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    profit: 4000,
    revenue: 8400,
    amt: 2400,
  },
  {
    name: "Feb",
    profit: 3000,
    revenue: 5398,
    amt: 2210,
  },
  {
    name: "Mar",
    profit: 2000,
    revenue: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    profit: 2780,
    revenue: 7908,
    amt: 2000,
  },
  {
    name: "May",
    profit: 1890,
    revenue: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    profit: 2390,
    revenue: 5800,
    amt: 2500,
  },
  {
    name: "Jul",
    profit: 3490,
    revenue: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    profit: 3490,
    revenue: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
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
            dataKey="revenue"
            fill="#26ABE2"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="profit"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
