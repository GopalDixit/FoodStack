import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (foodItem) => {
    setCart((prevCart) => [...prevCart, foodItem]);
  };

  const removeFromCart = (foodItem) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== foodItem._id));
  };

  const getCartItems = () => {
    return cart;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
