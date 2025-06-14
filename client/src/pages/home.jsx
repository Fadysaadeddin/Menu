import React from "react";
import HomeHeader from "../components/homeHeader";
import Category from "../components/Category";
import SubCategory from "../components/SubCategory";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <HomeHeader />
      <Category />
      <SubCategory />
      <main className="main-content"></main>
    </div>
  );
};

export default Home;
