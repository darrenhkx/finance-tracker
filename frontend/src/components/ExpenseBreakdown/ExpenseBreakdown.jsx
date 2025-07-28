import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

const ExpenseBreakdown = ({data}) => {
  return (
    <div style={{ width: "100%" }}>
      <h3>Expense Breakdown</h3>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <PieChart width={400} height={350}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;