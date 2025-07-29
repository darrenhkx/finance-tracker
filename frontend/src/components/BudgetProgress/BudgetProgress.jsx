const BudgetProgress = ({ name, spent, budget }) => {
  const percentageUsed = Math.min(100, Math.round((spent / budget) * 100));
  const remaining = Math.max(0, budget - spent);

  return (
    <div className="budget-progress">
      {/* Top Row */}
      <div className="budget-progress-header">
        <span className="budget-category">{name}</span>
        <span className="budget-values">
          ${spent} / ${budget}
        </span>
      </div>

      {/* Middle Row */}
      <div className="budget-progress-bar">
        <div
          className="budget-progress-fill"
          style={{ width: `${percentageUsed}%` }}
        ></div>
      </div>

      {/* Bottom Row */}
      <div className="budget-progress-footer">
        <span>{percentageUsed}% used</span>
        <span>${remaining} remaining</span>
      </div>
    </div>
  );
};

export default BudgetProgress;