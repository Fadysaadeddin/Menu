import React from "react";
import logo from "../assets/logo.png"; // Adjust the path according to your logo location
import "../styles/homeHeader.css"; // Adjust the path according to your CSS file location

const HomeHeader = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="Restaurant Logo" className="logo" />
            <h1 className="restaurant-name">Italian Taste </h1>
          
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
