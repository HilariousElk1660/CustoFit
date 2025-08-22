import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('cartItems');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = (product, quantity = 1) => {
        setCartItems((items) => {
            const exists = items.find((i) => i.id === product.id);
            if (exists) {
                return items.map((i) =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...items, { ...product, quantity }];
        });
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((items) =>
            items
                .map((i) => (i.id === id ? { ...i, quantity } : i))
                .filter((i) => i.quantity > 0)
        );
    };

    const removeItem = (id) => {
        setCartItems((items) => items.filter((i) => i.id !== id));
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider
            value={{ cartItems, addItem, updateQuantity, removeItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
