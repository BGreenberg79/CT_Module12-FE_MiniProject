import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';


const CreateUser = () => {

    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        name: {
            firstname: '',
            lastname: ''
        },
        address: {
            city: '',
            street: '',
            number: 0,
            zipcode: '',
            geolocation: {
                lat: '',
                long: ''
            }
        },
        phone: '',
    });

    const addUserAPI = async (user) => {
        const response = await axios.post('https://fakestoreapi.com/users',
            {
                email: user.email,
                username: user.username,
                password: user.password,
                name: {
                    firstname: user.name.firstname,
                    lastname: user.name.lastname
                },
                address: {
                    city: user.address.city,
                    street: user.address.street,
                    number: user.address.number,
                    zipcode: user.address.zipcode,
                    geolocation: {
                        lat: user.address.geolocation.lat,
                        long: user.address.geolocation.long
                    }
                },
                phone: user.phone
            });
        return response.data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addUserAPI(user);
    }


    return (
        <Container>
            <h1>New User</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mx-1 my-2" controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Email'
                        onChange={event =>
                            setUser({ ...user, email: event.target.value })
                        }
                        value={user.email}
                    />
                </Form.Group>
                <Form.Group className="mx-1 my-2" controlId='username'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Username'
                        onChange={event =>
                            setUser({ ...user, username: event.target.value })
                        }
                        value={user.username}
                    />
                </Form.Group>
                <Form.Group className="mx-1 my-2" controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Password'
                        onChange={event =>
                            setUser({ ...user, password: event.target.value })
                        }
                        value={user.password}
                    />
                </Form.Group>
                <Form.Group className="mx-1 my-2" controlId='firstName'>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your First Name'
                        onChange={event =>
                            setUser({ ...user, firstname: event.target.value })
                        }
                        value={user.name.firstname}
                    />
                </Form.Group>
                <Form.Group className="mx-1 my-2" controlId='lastName'>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Last Name'
                        onChange={event =>
                            setUser({ ...user, lastname: event.target.value })
                        }
                        value={user.name.lastname}
                    />
                </Form.Group>
                <Container className='border border-info rounded p-1 m-1'>
                    <h2 className='mt-2 font-weight-bold'>Address</h2>
                    <Form.Group className="mx-1 my-2" controlId='city'>
                        <Form.Label>City:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your City'
                            onChange={event =>
                                setUser({ ...user, city: event.target.value })
                            }
                            value={user.address.city}
                        />
                    </Form.Group>
                    <Form.Group className="mx-1 my-2" controlId='street'>
                        <Form.Label>Street:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your Street Address'
                            onChange={event =>
                                setUser({ ...user, street: event.target.value })
                            }
                            value={user.address.street}
                        />
                    </Form.Group>
                    <Form.Group className="mx-1 my-2" controlId='number'>
                        <Form.Label>Number:</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Your Building Number'
                            onChange={event =>
                                setUser({ ...user, number: event.target.value })
                            }
                            value={user.address.number}
                        />
                    </Form.Group>
                    <Form.Group className="mx-1 my-2" controlId='zipCode'>
                        <Form.Label>Zip Code:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your Zip Code'
                            onChange={event =>
                                setUser({ ...user, zipcode: event.target.value })
                            }
                            value={user.address.zipcode}
                        />
                    </Form.Group>
                    <Form.Group className="mx-1 my-2" controlId='lat'>
                        <Form.Label>Latitude:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your Latitude'
                            onChange={event =>
                                setUser({ ...user, lat: event.target.value })
                            }
                            value={user.address.geolocation.lat}
                        />
                    </Form.Group>
                    <Form.Group className="mx-1 my-2" controlId='long'>
                        <Form.Label>Longitude:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your Longitude'
                            onChange={event =>
                                setUser({ ...user, long: event.target.value })
                            }
                            value={user.address.geolocation.long}
                        />
                    </Form.Group>
                </Container>
                <Form.Group className="mx-1 my-2" controlId='phone'>
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Phone Number'
                        onChange={event =>
                            setUser({ ...user, phone: event.target.value })
                        }
                        value={user.phone}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Create User
                </Button>
            </Form>
        </Container>
    )
}

export default CreateUser;