import React from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import { Provider } from 'react-redux';
import ShoppingCart from '../components/ShoppingCart';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { configureStore }  from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import { addToCart } from '../redux/cartSlice';

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
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                cart: cartReducer
            }
        });
    });

    test('render empty shopping cart message when empty', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/Your shopping cart is empty/i)).toBeInTheDocument();
    });

    test('adds items when add button is clicked', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        await act(async () => {
            store.dispatch(addToCart(mockCartItem));
        });

        await waitFor(() => {
            expect(screen.getByText(/testItem/i)).toBeInTheDocument();
            expect(screen.getByText(/\$100/i)).toBeInTheDocument();
        })
    });

    test('removes items when remove button is clicked', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        await act(async () => {
            store.dispatch(addToCart(mockCartItem))
    });


        const removeButton = screen.getByRole('button', {name: /remove/i});
        fireEvent.click(removeButton);

        await waitFor(() => {
            expect(screen.queryByText(/testItem/i)).toBeNull();
        });
    });

    test('clears cart when clear button is clicked', async () => {

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        await act(async () => {
            store.dispatch(addToCart(mockCartItem));
        });

        const clearButton = screen.getByRole('button', {name:/clear/i});
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(screen.getByText(/Your shopping cart is empty/i)).toBeInTheDocument();
        });
    });

    test('checks out successfully and clears cart', async () => {
        axios.post.mockResolvedValueOnce({ data: { success: true } });

        const {rerender} = render (
            <Provider store={store}>
                <BrowserRouter>
                    <ShoppingCart />
                </BrowserRouter>
            </Provider>
        );

        await act(async () => {
            store.dispatch(addToCart(mockCartItem));
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', {name: /checkout/i}));
        })

        await waitFor(() => {
            expect(screen.getByText(/Your shopping cart is empty/i)).toBeInTheDocument();
    });
});
});