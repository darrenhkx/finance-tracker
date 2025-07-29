import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MonthlyExpensesBar = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300}}>
      <h3 style={{ textAlign: "left", marginBottom: "10%" }}>Monthly Budget vs Expenses</h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="rgba(106, 212, 96, 1)" name="Budget" />
          <Bar dataKey="expenses" fill="rgba(199, 99, 82, 1)" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesBar;
