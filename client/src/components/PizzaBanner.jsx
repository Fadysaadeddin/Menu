import React, { useState } from "react";
import pizzaImg from "../assets/pizza1.jpeg"; // Adjust path if needed
import "../styles/pizzaBanner.css";

const PizzaBanner = ({ onCategoryAdded }) => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [deleteCategoryName, setDeleteCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories for delete popup
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setCategories([]);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });
      if (response.ok) {
        alert("Category added!");
        setShowAddPopup(false);
        setCategoryName("");
        if (onCategoryAdded) onCategoryAdded();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to add category");
      }
    } catch (err) {
      alert("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    if (!deleteCategoryName) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${deleteCategoryName}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        alert("Category deleted!");
        setShowDeletePopup(false);
        setDeleteCategoryName("");
        if (onCategoryAdded) onCategoryAdded();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete category");
      }
    } catch (err) {
      alert("Error deleting category");
    } finally {
      setLoading(false);
    }
  };

  // Open delete popup and fetch categories
  const openDeletePopup = () => {
    fetchCategories();
    setShowDeletePopup(true);
  };

  return (
    <div className="pizza-banner">
      <img src={pizzaImg} alt="Pizza" className="pizza-banner-img" />
      <div className="pizza-banner-content">
        <h1 className="pizza-banner-title">
          Delicious pizzas, baked to perfection!
        </h1>
        <div className="banner-btn-group">
          <button
            className="add-category-btn"
            onClick={() => setShowAddPopup(true)}
          >
            Add Category
          </button>
          <button className="delete-category-btn" onClick={openDeletePopup}>
            Delete Category
          </button>
        </div>
      </div>
      {showAddPopup && (
        <div className="category-popup-overlay">
          <div className="category-popup">
            <h2>Add Category</h2>
            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="category-input"
              />
              <div className="popup-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Submit"}
                </button>
                <button type="button" onClick={() => setShowAddPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="category-popup-overlay">
          <div className="category-popup">
            <h2>Delete Category</h2>
            <form onSubmit={handleDeleteCategory}>
              <select
                className="category-input"
                value={deleteCategoryName}
                onChange={(e) => setDeleteCategoryName(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="popup-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Deleting..." : "Delete"}
                </button>
                <button type="button" onClick={() => setShowDeletePopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaBanner;
