import React from "react";
import "../styles/categoryList.css";

const CategoryList = ({ categories, onCategorySelect, selectedCategoryId }) => (
  <div className="category-list-horizontal">
    {categories.map((cat) => (
      <div
        key={cat._id}
        className={`category-list-item${
          selectedCategoryId === cat._id ? " selected" : ""
        }`}
        onClick={() => onCategorySelect(cat)}
        tabIndex={0}
        role="button"
      >
        {cat.name}
      </div>
    ))}
  </div>
);

export default CategoryList;
