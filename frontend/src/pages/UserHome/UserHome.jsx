import React, {useState, useEffect} from "react";
import "./UserHome.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Card from "../../components/Card/Card.jsx";
import ExpenseBreakdown from "../../components/ExpenseBreakdown/ExpenseBreakdown.jsx";
import DailySpending from "../../components/DailySpending/DailySpending.jsx";
import BudgetProgress from "../../components/BudgetProgress/BudgetProgress.jsx";

const UserHome = () => {
  const user_id = JSON.parse(localStorage.getItem("user"))?.user_id;
  const token = localStorage.getItem("token");
  const [income, setIncome] = useState(0);
  const [expensesByCat, setExpensesByCat] = useState([]);
  const [rawExpenses, setRawExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const today = new Date();
  //const month = today.getMonth()+1; its august now and my data is july so i use hardcoded month for now
  const month = 7;
  const year = today.getFullYear();
  const [savingsGoal, setSavingsGoal] = useState(0);
  const totalBudget = income - savingsGoal;
  const [budgets, setBudgets] = useState([]);
  const savings = income-totalExpenses;
  const savingsPercentage = (savings/income*100).toFixed(1);
  const options = ["Overview", "Transactions", "History"];

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/income/latest`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (!response.ok) throw new Error("Failed to fetch income");
        
        const data = await response.json();
        setIncome(data.latest_income);
      } catch (err) {
        console.error(err);
        setError("Failed to load income");
      } finally {
        setLoading(false);
      }
    };
    if (user_id && token) fetchIncome();
  }, [user_id, token]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/category`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (!response.ok) throw new Error("Failed to fetch categories");
        
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    if (user_id && token) fetchCategories();
  }, [user_id, token]);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!categories.length) return;
      try {
        const response = await fetch(`http://127.0.0.1:8000/expense/${year}/${month}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (!response.ok) throw new Error("Failed to fetch list of expenses");

        const response2 = await fetch(`http://127.0.0.1:8000/expense/${year}/${month}/total`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (!response2.ok) throw new Error("Failed to fetch total expense");

        const data = await response.json();
        const data2 = await response2.json();
        setTotalExpenses(data2.total);
        setRawExpenses(data);

        // Convert into name, value pairs to be used for charts
        const categoryTotals = {};
        data.forEach((expense) => {
          const category = categories.find((cat) => cat.id === expense.category_id)?.name || "Others";
          const amount = expense.amount;
          if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
          }
          categoryTotals[category] += amount;
        });

        const formattedData = Object.entries(categoryTotals).map(([name, value]) => ({
          name,
          value,
        }));
        
        setExpensesByCat(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };
    if (user_id && token) fetchExpenses();
  }, [categories, user_id, token]);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!categories.length) return;
      try {
        const response = await fetch(`http://127.0.0.1:8000/budget/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (!response.ok) throw new Error("Failed to fetch list of budgets");

        const data = await response.json();

        // Convert into (name, value) pairs
        const categoryTotals = {};
        data.forEach((budget) => {
          const category = categories.find((cat) => cat.id === budget.category_id)?.name || "Others";
          const amount = budget.amount;
          if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
          }
          categoryTotals[category] += amount;
        });

        const formattedData = Object.entries(categoryTotals).map(([name, value]) => ({
          name,
          value,
        }));
        
        setBudgets(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load budgets");
      } finally {
        setLoading(false);
      }
    };
    if (user_id && token) fetchBudgets();
  }, [categories, user_id, token]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/users/goals`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (!response.ok) throw new Error("Failed to fetch goal");
        
        const data = await response.json();
        setSavingsGoal(data.goal);
      } catch (err) {
        console.error(err);
        setError("Failed to load goal");
      } finally {
        setLoading(false);
      }
    };
    if (user_id && token) fetchGoals();
  }, [user_id, token]);

  const mergedBudgets = (() => {
      const matched = [];

      budgets.forEach(b => {
        const expense = expensesByCat.find(e => e.name === b.name);
        matched.push({
          name: b.name,
          budget: b.value,
          spent: expense ? expense.value : 0,
        });
      });

      return matched;
    })();

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
          <Card name="Total Expenses" amount={totalExpenses}/>
          <Card name="Available" amount={totalBudget-totalExpenses}/>
          <Card name="Total Budget" amount={totalBudget}/>
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
                <ExpenseBreakdown data={expensesByCat} />
              </div>
              <div className="daily-spending-card">
                <DailySpending data={rawExpenses} year = {year} month = {month} />
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
                  <span className="summary-item-amount">${totalExpenses}</span>
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