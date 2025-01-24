import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserLogin = () => {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    });

    const { t } = useTranslation()

    const loginAPI = async (loginUser) => {
        // API Request authenticates user 
        const response = await axios.post('https://fakestoreapi.com/auth/login',
            {email: loginUser.email,
            password: loginUser.password})

            // returning the response.data will provide the token we needto save to session storage 
            return response.data;}

    const handleSubmit = async (e) => {
        e.preventDefault();

        const responseData = await loginAPI(loginUser);

        if (responseData && responseData.token) {
            sessionStorage.setItem('authenicationToken', responseData.token);
            sessionStorage.setItem('userData', JSON.stringify(responseData)); //stores all of user's data
            navigate('/product-catalog');
        }
    }

  return (
    <Container>
        <header>
            <h1>{t('userLogin.header')}</h1>
        </header>
        <section>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mx-1 my-2" controlId='emailLogin'>
                    <Form.Label>{t('userLogin.emailFormGroup.label')}</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder={t('userLogin.emailFormGroup.placeholder')}
                        onChange={event =>
                            setUser({...loginUser, email: event.target.value})
                        }
                        value={loginUser.email}
                        required
                        aria-label={t('userLogin.emailFormGroup.recordLabel')}
                    />
                </Form.Group>
                <Form.Group className="mx-1 my-2" controlId='passwordLogin'>
                    <Form.Label>{t('userLogin.passwordFormGroup.label')}</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder={t('userLogin.passwordFormGroup.placeholder')}
                        onChange={event =>
                            setUser({...loginUser, password: event.target.value})
                        }
                        value={loginUser.password}
                        required
                        aria-label={t('userLogin.passwordFormGroup.recordLabel')}
                    />
                </Form.Group>
                <Button 
                variant="success" 
                type="submit"
                aria-label={t('userLogin.loginButton.recordLabel')}>
                        {t('userLogin.loginButton.buttonText')}
                    </Button>
            </Form>
        </section>
    </Container>
      )
    }

export default UserLogin;