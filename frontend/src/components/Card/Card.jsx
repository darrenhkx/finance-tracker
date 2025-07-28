import React from "react";
import "./Card.css";

const Card = ({ name, amount }) => {
  return (
    <div className="card">
      <h3 className="card-title">{name}</h3>
      <p className="card-amount">${amount.toLocaleString()}</p>
    </div>
  );
};

export default Card;