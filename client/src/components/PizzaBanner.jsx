import React, { useState } from "react";
import pizzaImg from "../assets/pizza1.jpeg"; // Adjust path if needed
import "../styles/pizzaBanner.css";

const PizzaBanner = ({ onCategoryAdded }) => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [deleteCategoryName, setDeleteCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // Add item state
  const [itemData, setItemData] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  // Fetch categories for delete/add item popup
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

  // Open delete/add item popup and fetch categories
  const openDeletePopup = () => {
    fetchCategories();
    setShowDeletePopup(true);
  };
  const openAddItemPopup = () => {
    fetchCategories();
    setShowAddItemPopup(true);
  };

  // Add item handler
  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      if (response.ok) {
        alert("Item added!");
        setShowAddItemPopup(false);
        setItemData({
          categoryId: "",
          name: "",
          description: "",
          price: "",
          imageUrl: "",
        });
        if (onCategoryAdded) onCategoryAdded();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to add item");
      }
    } catch (err) {
      alert("Error adding item");
    } finally {
      setLoading(false);
    }
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
          <button className="add-item-btn" onClick={openAddItemPopup}>
            Add Item
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
      {showAddItemPopup && (
        <div className="category-popup-overlay">
          <div className="category-popup">
            <h2>Add Item to Category</h2>
            <form onSubmit={handleAddItem}>
              <select
                className="category-input"
                value={itemData.categoryId}
                onChange={(e) =>
                  setItemData({ ...itemData, categoryId: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Item Name"
                value={itemData.name}
                onChange={(e) =>
                  setItemData({ ...itemData, name: e.target.value })
                }
                required
                className="category-input"
              />
              <textarea
                placeholder="Description"
                value={itemData.description}
                onChange={(e) =>
                  setItemData({ ...itemData, description: e.target.value })
                }
                required
                className="category-input"
              />
              <input
                type="number"
                placeholder="Price"
                value={itemData.price}
                onChange={(e) =>
                  setItemData({ ...itemData, price: e.target.value })
                }
                required
                className="category-input"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={itemData.imageUrl}
                onChange={(e) =>
                  setItemData({ ...itemData, imageUrl: e.target.value })
                }
                required
                className="category-input"
              />
              <div className="popup-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Item"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddItemPopup(false)}
                >
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
