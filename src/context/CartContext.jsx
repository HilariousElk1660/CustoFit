import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiFetch } from '../lib/api.js';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    apiFetch('/cart').then((data) => setCartItems(data.items || data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (cartItems.length) apiFetch('/cart', { method: 'PUT', body: JSON.stringify({ items: cartItems }) }).catch(() => {});
  }, [cartItems]);

  const addItem = (product, quantity = 1) => setCartItems((items) => {
    const exists = items.find((i) => i.id === product.id);
    return exists ? items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i) : [...items, { ...product, quantity }];
  });
  const updateQuantity = (id, quantity) => setCartItems((items) => items.map((i) => i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i).filter((i) => i.quantity > 0));
  const removeItem = (id) => setCartItems((items) => items.filter((i) => i.id !== id));
  const clearCart = () => { setCartItems([]); apiFetch('/cart', { method: 'PUT', body: JSON.stringify({ items: [] }) }).catch(() => {}); };

  return <CartContext.Provider value={{ cartItems, addItem, updateQuantity, removeItem, clearCart }}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
