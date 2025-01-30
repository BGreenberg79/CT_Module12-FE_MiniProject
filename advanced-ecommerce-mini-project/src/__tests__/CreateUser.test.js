import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import CreateUser from '../components/CreateUser';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

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
        
        fireEvent.change(screen.getByLabelText('createUser.emailFormGroup.label'), { 
            target: { value: 'test@testing.com'}});

        fireEvent.change(screen.getByLabelText('createUser.usernameFormGroup.label'), { 
            target: { value: 'testUser'}});

        fireEvent.change(screen.getByLabelText('createUser.passwordFormGroup.label'), { 
            target: { value: 'password456'}});

        fireEvent.change(screen.getByLabelText('createUser.firstnameFormGroup.label'), { 
            target: { value: 'Jane'}});

        fireEvent.change(screen.getByLabelText('createUser.lastnameFormGroup.label'), {
            target: { value: 'Doe'}});

        fireEvent.change(screen.getByLabelText('createUser.cityFormGroup.label'), {
            target: { value: 'Orlando'}});
        
        fireEvent.change(screen.getByLabelText('createUser.streetFormGroup.label'), {
            target: { value: 'Orange Avenue'}});

        fireEvent.change(screen.getByLabelText('createUser.numberFormGroup.label'), {
            target: { value: '2'}});

        fireEvent.change(screen.getByLabelText('createUser.zipcodeFormGroup.label'), {
            target: { value: '32800'}});

        fireEvent.change(screen.getByLabelText('createUser.latFormGroup.label'), {
            target: { value: '44'}});

        fireEvent.change(screen.getByLabelText('createUser.longFormGroup.label'), {
            target: { value: '50'}});

        fireEvent.change(screen.getByLabelText('createUser.phoneFormGroup.label'), {
            target: { value: '123-456-7890'}});

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'createUser.submitButton.buttonText'}));
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
                phone: '123-456-7890'}
            )
        });
    });
});