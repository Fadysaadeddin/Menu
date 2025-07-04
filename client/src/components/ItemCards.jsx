import React from "react";
import "../styles/itemCards.css";

const ItemCards = ({ items }) => (
  <div className="item-cards-container">
    {items.map((item) => (
      <div key={item._id} className="item-card">
        <img src={item.imageUrl} alt={item.name} className="item-card-img" />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p className="item-card-price">${item.price}</p>
      </div>
    ))}
  </div>
);

export default ItemCards;
