import React, { useState, useEffect } from "react";
import "../styles/SubCategory.css";

const SubCategory = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      if (selectedCategory === "Pizzas") {
        try {
          const response = await fetch("http://localhost:5000/api/pizzas");
          const data = await response.json();
          setItems(data);
          console.log("Fetched pizzas:", data);
        } catch (error) {
          console.error("Error fetching pizzas:", error);
        }
      }
    };

    fetchItems();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="subcategory-container">
      <nav className="category-nav">
        <ul className="category-list">
          <li
            className="category-item"
            onClick={() => handleCategoryClick("Pizzas")}
          >
            Pizzas
          </li>
          <li
            className="category-item"
            onClick={() => handleCategoryClick("Grills")}
          >
            Grills
          </li>
          <li
            className="category-item"
            onClick={() => handleCategoryClick("Pastas")}
          >
            Pastas
          </li>
          <li
            className="category-item"
            onClick={() => handleCategoryClick("Sandwiches")}
          >
            Sandwiches
          </li>
          <li
            className="category-item"
            onClick={() => handleCategoryClick("Drinks")}
          >
            Drinks
          </li>
        </ul>
      </nav>
      {selectedCategory === "Pizzas" && items.length > 0 && (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              <img src={item.imageUrl} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="price">${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategory;
