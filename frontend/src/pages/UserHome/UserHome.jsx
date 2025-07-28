import React from "react";
import "./UserHome.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Card from "../../components/Card/Card.jsx";
import ExpenseBreakdown from "../../components/ExpenseBreakdown/ExpenseBreakdown.jsx";

const data = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Utilities", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Others", value: 100 },
];

const income = 3000;
const expenses = 1000;
const savings = 2000;
const budget = 80/100 * income;
const savingsPercentage = (savings/income*100).toFixed(1);

const UserHome = () => {
  return (
    <div className="user-home">
      <NavBar />
      <div className="user-homepage">
        <div className="header-container">
          <h1>Personal Budget</h1>
          <p>Track your income, expenses, and budget goals</p>
        </div>
        <div className="cards-container">
          <Card name="Total Income" amount={income}/>
          <Card name="Total Expenses" amount={expenses}/>
          <Card name="Available" amount={budget-expenses}/>
          <Card name="Total Budget" amount={budget}/>
        </div>
        <div className="graphs-container">
          <div className="expense-piechart-card">
            <ExpenseBreakdown data = {data}/>
          </div>
          <div className="expense-vs-budget-card">
            <p>bar graph</p>
          </div>
        </div>
        <div className="summary-container">
          <div className="savings-rate">
            <h3>Savings Rate</h3>
            <span className="percentage-value-on-bar">{savingsPercentage}%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${savingsPercentage}%` }}></div>
            </div>
            <p>You're saving {savingsPercentage}% of your income</p>
          </div>
          <div className="monthly-summary">
            <h3>Monthly Summary</h3>
            <div className="summary-item">
              <span className="summary-item-name">Total Income:</span>
              <span className="summary-item-amount">${income}</span>
            </div>
            <div className="summary-item">
              <span className="summary-item-name">Total Expenses:</span>
              <span className="summary-item-amount">${expenses}</span>
            </div>
            <hr className="divider"/>
            <div className="summary-item">
              <span className="summary-item-name">Total Savings:</span>
              <span className="summary-item-amount">${savings}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;