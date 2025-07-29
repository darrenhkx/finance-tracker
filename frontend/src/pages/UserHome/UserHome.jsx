import React, {useState} from "react";
import "./UserHome.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Card from "../../components/Card/Card.jsx";
import ExpenseBreakdown from "../../components/ExpenseBreakdown/ExpenseBreakdown.jsx";
import MonthlyExpensesBar from "../../components/MonthlyExpensesBar/MonthlyExpensesBar.jsx";
import BudgetProgress from "../../components/BudgetProgress/BudgetProgress.jsx";

const income = 3000;
const expenses = 1000;
const savings = 2000;
const budget = 80/100 * income;
const savingsPercentage = (savings/income*100).toFixed(1);
const options = ["Overview", "Transactions", "History"];

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

const budgets = [
  { name: "Food", budget: 500 },
  { name: "Transport", budget: 400 },
  { name: "Utilities", budget: 350 },
  { name: "Entertainment", budget: 200 },
  { name: "Others", budget: 950 },
];

const mergedBudgets = (() => {
    const matched = [];
    let othersSpent = 0;

    budgets.forEach(b => {
      const expense = data.find(e => e.name === b.name);
      matched.push({
        name: b.name,
        budget: b.budget,
        spent: expense ? expense.value : 0,
      });
    });

    return matched;
  })();

const UserHome = () => {
  const [selectedOption, setSelectedOption] = useState("Overview");

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
        <div className="view-selector-bar">
          {options.map((option) => (
            <div
              key={option}
              className={`view-option ${selectedOption === option ? "selected" : ""}`}
              onClick={() => setSelectedOption(option)}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
        {selectedOption === "Overview" && (
          <div className="overview-section">
            <div className="graphs-container">
              <div className="expense-piechart-card">
                <ExpenseBreakdown data={data} />
              </div>
              <div className="expense-vs-budget-card">
                <MonthlyExpensesBar data={monthlyData} />
              </div>
            </div>
            <div className="budget-progress-container">
              <h2 style={{ textAlign: "left" }}>Budget Progress</h2>
              {mergedBudgets.map((item, idx) => (
                <BudgetProgress
                  key={idx}
                  name={item.name}
                  spent={item.spent}
                  budget={item.budget}
                />
              ))}
            </div>
            <div className="summary-container">
              <div className="savings-rate">
                <h3>Savings Rate</h3>
                <span className="percentage-value-on-bar">
                  {savingsPercentage}%
                </span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${savingsPercentage}%` }}
                  ></div>
                </div>
                <p>You're saving {savingsPercentage}% of your income!</p>
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
                <hr className="divider" />
                <div className="summary-item">
                  <span className="summary-item-name">Total Savings:</span>
                  <span className="summary-item-amount">${savings}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedOption === "Transactions" && (
          <div className="transactions-section">
            Transactions content...
          </div>
        )}
        {selectedOption === "History" && (
          <div className="history-section">History content...</div>
        )}
      </div>
    </div>
  );
};

export default UserHome;