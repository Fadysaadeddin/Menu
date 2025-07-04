import React, { useEffect, useState, useCallback } from "react";

import PizzaBanner from "../components/PizzaBanner";
import CategoryList from "../components/CategoryList";

import "../styles/home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="home-container">
      <PizzaBanner onCategoryAdded={fetchCategories} />
      <CategoryList categories={categories} />

      <main className="main-content"></main>
    </div>
  );
};

export default Home;
