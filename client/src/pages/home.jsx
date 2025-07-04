import React, { useEffect, useState, useCallback } from "react";

import PizzaBanner from "../components/PizzaBanner";
import CategoryList from "../components/CategoryList";
import ItemCards from "../components/ItemCards";


import "../styles/home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  const fetchItems = useCallback(async (categoryId) => {
    if (!categoryId) {
      setItems([]);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/items?categoryId=${categoryId}`
      );
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (selectedCategory && selectedCategory._id) {
      fetchItems(selectedCategory._id);
    } else {
      setItems([]);
    }
  }, [selectedCategory, fetchItems]);

  return (
    <div className="home-container">
      <PizzaBanner onCategoryAdded={fetchCategories} />
      <CategoryList
        categories={categories}
        onCategorySelect={setSelectedCategory}
        selectedCategoryId={selectedCategory ? selectedCategory._id : null}
      />
    
      <main className="main-content">
        {selectedCategory && <ItemCards items={items} />}
      </main>
    </div>
  );
};

export default Home;
