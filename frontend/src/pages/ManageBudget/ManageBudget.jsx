import React from "react";
import "./ManageBudget.css";
import NavBar from "../../components/NavBar/NavBar.jsx";

const income = 3000;
const expenses = 1000;
const savings = 2000;
const budget = 80/100 * income;
const savingsPercentage = (savings/income*100).toFixed(1);

const data = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Utilities", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Others", value: 100 },
];

const monthlyData = [
  { month: "Jun'25", budget: budget, expenses: 1250 },
  { month: "Jul'25", budget: budget, expenses: 1000 },
];

const ManageBudget = () => {
  return (
    <div className="manage-budget">
      <NavBar />
      <div className="manage-budget-page">
        
      </div>
    </div>
  );
};

export default ManageBudget;