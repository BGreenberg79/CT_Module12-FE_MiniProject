import React from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import CreateUser from '../components/CreateUser';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';


jest.mock('axios')
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: {
            changeLanguage: jest.fn()
        }
    })
}))

describe('Testing CreateUser component to mock API calls', () => {
    test('should create a new user and post to FakesStoreAPI', async () => {
        const mockResponse = { data: {
            id: 1,
            email: 'test@testing.com', 
            username: 'testUser',
            password: 'password456',
            name: {
                firstname: 'Jane',
                lastname: 'Doe'
            },
            address: {
                city: 'Orlando',
                street: 'Orange Avenue',
                number: 2,
                zipcode: '32800',
                geolocation: {
                    lat: '44',
                    long: '50'
                }
            },
            phone: '123-456-7890'
        }};
        axios.post.mockResolvedValue(mockResponse);

        render(
            <BrowserRouter>
                <CreateUser />
            </BrowserRouter>
        );
        
        fireEvent.change(screen.getByLabelText(/Email:/i), { 
            target: { value: 'test@testing.com'}});

        fireEvent.change(screen.getByLabelText(/Username:/i), { 
            target: { value: 'testUser'}});

        fireEvent.change(screen.getByLabelText(/Password:/i), { 
            target: { value: 'password456'}});

        fireEvent.change(screen.getByLabelText(/First Name:/i), { 
            target: { value: 'Jane'}});

        fireEvent.change(screen.getByLabelText(/Last Name:/i), {
            target: { value: 'Doe'}});

        fireEvent.change(screen.getByLabelText(/City:/i), {
            target: { value: 'Orlando'}});
        
        fireEvent.change(screen.getByLabelText(/Street:/i), {
            target: { value: 'Orange Avenue'}});

        fireEvent.change(screen.getByLabelText(/Number:/i), {
            target: { value: '2'}});

        fireEvent.change(screen.getByLabelText(/Zip Code:/i), {
            target: { value: '32800'}});

        fireEvent.change(screen.getByLabelText(/Latitude:/i), {
            target: { value: '44'}});

        fireEvent.change(screen.getByLabelText(/Longitude:/i), {
            target: { value: '50'}});

        fireEvent.change(screen.getByLabelText(/Phone Number:/i), {
            target: { value: '123-456-7890'}});

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Create User/}));
        });

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('https://fakestoreapi.com/users', {
                email: 'test@testing.com',
                username: 'testUser',
                password: 'password456',
                name: {
                    firstname: 'Jane',
                    lastname: 'Doe'
                },
                address: {
                    city: 'Orlando',
                    street: 'Orange Avenue',
                    number: 2,
                    zipcode: '32800',
                    geolocation: {
                        lat: '44',
                        long: '50'
                    }
                },
                phone: '123-456-7890'
            })
        });
    });
});