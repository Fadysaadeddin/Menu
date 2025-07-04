import React from "react";
import "../styles/categoryList.css";

const CategoryList = ({ categories }) => (
  <div className="category-list-horizontal">
    {categories.map((cat) => (
      <div key={cat._id} className="category-list-item">
        {cat.name}
      </div>
    ))}
  </div>
);

export default CategoryList;
