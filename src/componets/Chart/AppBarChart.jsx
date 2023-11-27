import React from "react";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function AppBarChart({ data }) {
  return (
    <>
      <BarChart
        width={550}
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
          dataKey="expenses"
          fill="#2eb398"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="revenue"
          fill="#33b1e0"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </>
  );
}

export default AppBarChart;
