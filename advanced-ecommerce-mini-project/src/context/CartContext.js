import React, { createContext, useState, useContext } from 'react' 
import { use } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const  [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            return prevCart.map((item) => 
                item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
        } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }});
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct && existingProduct.quantity > 1) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item);}
            else {
                return prevCart.filter((item) => item.id !== product.id);
            }});
        };

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);