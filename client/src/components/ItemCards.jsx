import React, { useState } from "react";
import "../styles/itemCards.css";

const ItemCards = ({ items, onAddToBasket }) => {
  const [basket, setBasket] = useState({});

  const handleAdd = (item) => {
    const newBasket = { ...basket };
    newBasket[item._id] = (newBasket[item._id] || 0) + 1;
    setBasket(newBasket);
    if (onAddToBasket) onAddToBasket(item, newBasket[item._id]);
  };

  return (
    <div className="item-cards-container">
      {items.map((item) => (
        <div key={item._id} className="item-card">
          <span
            className="item-card-plus"
            onClick={() => handleAdd(item)}
            title="Add to basket"
          >
            +
            {basket[item._id] && (
              <span className="item-card-badge">{basket[item._id]}</span>
            )}
          </span>
          <img src={item.imageUrl} alt={item.name} className="item-card-img" />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p className="item-card-price">${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemCards;
