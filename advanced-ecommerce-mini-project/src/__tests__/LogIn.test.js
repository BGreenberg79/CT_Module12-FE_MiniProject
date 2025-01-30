import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import UserLogin from '../components/UserLogin';
import axios from 'axios';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { useTranslation } from 'react-i18next';

jest.mock('axios');
jest.mock('react-router-dom', () =>({
    useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ 
        t: (key) => key,
        i18n: { 
            changeLanguage: jest.fn()
        },
    }),
}))

describe('UserLogin Component unit tests', () => {
    let mockNavigate;
    let mockChangeLanguage;

    beforeEach(() => {
        mockNavigate = jest.fn()
        jest.mock('react-router-dom', ()=> ({
            useNavigate: () => mockNavigate,
        }));
        mockChangeLanguage = require('react-i18next').useTranslation().i18n.changeLanguage;
    });
        render(
            <BrowserRouter>
                <UserLogin />
            </BrowserRouter>
        );

        const englishButton = screen.getByText('English');
        const mandarinButton = screen.getByText('普通话 中文');

        fireEvent.click(englishButton);
        expect(mockChangeLanguage).toHaveBeenCalledWith('en');

        fireEvent.click(mandarinButton);
        expect(mockChangeLanguage).toHaveBeenCalledWith('zh');
    });

    test('navigates to product-catalog page if user is authenticated', async () => {
        const mockResponse = { data: { token: 'fakeToken' } };

        axios.post.mockResolvedValue(mockResponse);

        render(
            <BrowserRouter>
                <UserLogin />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText('userLogin.emailFormGroup.label');
        const passwordInput = screen.getByLabelText('userLogin.passwordFormGroup.label');
        const submitButton = screen.getByRole('button', { name: 'userLogin.loginButton.buttonText'});

        fireEvent.change(emailInput, { target: { value: 'fakeEmail@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'fakePassword456' } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/product-catalog');
        });
    });
