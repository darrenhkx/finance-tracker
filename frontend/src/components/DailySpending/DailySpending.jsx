import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// input format: { date: "YYYY-MM-DD", amount: number }
// fills missing days up to today
const DailySpending = ({ data, year, month }) => {
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() + 1 === month;
  const lastDay = isCurrentMonth ? today.getDate() : new Date(year, month, 0).getDate();

  // sum amounts per day
  const totals = Array(lastDay).fill(0);
  data.forEach((item) => {
    const d = new Date(item.date);
    const day = d.getDate();
    if (day >= 1 && day <= lastDay) {
      totals[day - 1] += item.amount;
    }
  });

  // convert to array for chart
  const monthName = new Date(year, month - 1).toLocaleString("default", { month: "short" });
  const processedData = totals.map((amt, idx) => ({
    date: `${monthName} ${idx + 1}`,
    amount: amt,
  }));

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ marginBottom: 50 }}>Daily Spending</h3>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={processedData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickMargin={6} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#885250ff"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySpending;