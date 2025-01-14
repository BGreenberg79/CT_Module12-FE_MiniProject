import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const UserLogin = () => {
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    });
    const loginAPI = async (loginUser) => {
        const response = await axios.post('https://fakestoreapi.com/auth/login',
            {email: loginUser.email,
            password: loginUser.password})
            return response.data;}

    const handleSubmit = (e) => {
        e.preventDefault();
        loginAPI(loginUser);
    }

  return (
    <Container>
            <h1>Log In</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mx-1 my-2" controlId='emailLogin'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Email'
                        onChange={event =>
                            setUser({...loginUser, email: event.target.value})
                        }
                        value={loginUser.email}
                    />
                </Form.Group>
                <Form.Group className="mx-1 my-2" controlId='passwordLogin'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Password'
                        onChange={event =>
                            setUser({...loginUser, password: event.target.value})
                        }
                        value={loginUser.password}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                        Submit Log In
                    </Button>
            </Form>
        </Container>
      )
    }

export default UserLogin;