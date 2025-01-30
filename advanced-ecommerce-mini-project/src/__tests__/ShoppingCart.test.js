import React from 'react';
import { render, screen, fireEvent, waitFor, act, configure} from '@testing-library/react';
import { Provider } from 'react-redux';
import ShoppingCart from '../components/ShoppingCart';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import  configureStore  from '@reduxjs/toolkit';
import { addToCart, removeFromCart, clearCart } from '../redux/cartSlice';

jest.mock('axios');

const mockCartItem = {
    id: 1,
    title: 'testItem',
    price: 100,
    category: 'testCategory',
    description: 'testDescription',
    image: 'testImage',
    quantity: 1
}

describe('ShoppingCart Component integration tests', () => {
    beforeEach(() => {
        store.dispatch(clearCart());
    });

    test('render empty shopping cart message when empty', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/Your shopping cart is empty./i)).toBeInTheDocument();
    });

    test('adds items when add button is clicked', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );
        const addButton = screen.getByText(/Add to Cart/i);

        fireEvent.click(addButton);



        store.dispatch(addToCart(mockCartItem));

        await waitFor(() => {
            expect(screen.getByText(/testItem/i)).toBeInTheDocument();
            expect(screen.getByText(/\$100/i)).toBeInTheDocument();
        });
    });

    test('removes items when remove button is clicked', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        store.dispatch(addToCart(mockCartItem));

        const removeButton = screen.getByText(/remove/i);
        fireEvent.click(removeButton);

        await waitFor(() => {
            expect(screen.queryByText(/testItem/i)).toBeNull();
        });
    });

    test('clears cart when clear button is clicked', async () => {
        store.dispatch(addToCart(mockCartItem));

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        const clearButton = screen.getByText(/clear/i);
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(screen.getByText(/Your shopping cart is empty./i)).toBeInTheDocument();
        }
        );
    });

    test('checks out successfully and clears cart', async () => {
        store.dispatch(addToCart(mockCartItem));

        axios.post.mockResolvedValueOnce({ data: { success: true } });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText(/Checkout/i));

        await waitFor(() => {
            expect(screen.getByText(/Checkout complete/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
    });
});