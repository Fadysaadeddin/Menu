import React, { useState } from "react";
import PizzaForm from "./PizzaForm";
import "../styles/category.css";

const Category = () => {
  const [showPizzaForm, setShowPizzaForm] = useState(false);

  return (
    <>
      <nav className="category-nav">
        <ul className="category-list">
          <li className="category-item" onClick={() => setShowPizzaForm(true)}>
            Pizzas
          </li>
          <li className="category-item">Grills</li>
          <li className="category-item">Pastas</li>
          <li className="category-item">Sandwiches</li>
          <li className="category-item">Drinks</li>
        </ul>
      </nav>
      {showPizzaForm && <PizzaForm onClose={() => setShowPizzaForm(false)} />}
    </>
  );
};

export default Category;
