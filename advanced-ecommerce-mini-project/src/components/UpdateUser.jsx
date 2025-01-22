import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const UpdateUser = () => {
    const { id } = useParams()
    const [user, setUser] = useState({
        id: id,
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
    })

    const fetchSingleUser = async () => {
        try {
            const response = await axios.get(`'https://fakestoreapi.com/users/${id}'`)
            if (response && response.data) {
                return response.data
            }
            console.warn('No data found for User Id')
            return null
        } catch (err) {
            console.error(err)
            return null;
        }
    }

    const loadUser = async () => {
        const data = await fetchSingleUser();
        if (!data || data.length === 0) {
            return
        }

        // data = data[0]

        if (data) {
            setUser({
                email: data.email,
                username: data.username,
                password: data.password,
                firstname: data.name.firstname,
                lastname: data.name.lastname,
                city: data.address.city,
                street: data.address.street,
                number: data.address.number,
                zipcode: data.address.zipcode,
                lat: data.address.geolocation.lat,
                long: data.address.geolocation.long,
                phone: data.phone
            });
        } else {
            console.warn('No data found for user');
        }
    };
    useEffect(() => {
        loadUser()
    }, [id])

    const editUserAPI = async (updatedUser) => {
        try {
            const response = await axios.put(
                `https://fakestoreapi.com/users/${updatedUser.id}`,
                {
                    email: updatedUser.email,
                    username: updatedUser.username,
                    password: updatedUser.password,
                    name: {
                        firstname: updatedUser.firstname,
                        lastname: updatedUser.lastname
                    },
                    address: {
                        city: updatedUser.city,
                        street: updatedUser.street,
                        number: updatedUser.number,
                        zipcode: updatedUser.zipcode,
                        geolocation: {
                            lat: updatedUser.lat,
                            long: updatedUser.long
                        }
                    },
                    phone: updatedUser.phone
                },
            );
            alert('User Updated Successfully')
        } catch (err) {
            console.error('Error updating user: ', err);
            alert('Failed to update user')

        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        editUserAPI(user);
    }

    return (
        <Container>
            <header>
            <h1>Update User</h1>
            </header>
            <section>
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
                        required
                        aria-label='email address'
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
                        required
                        aria-label='username'
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
                        required
                        aria-label='password'
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
                        required
                        aria-label='first name'
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
                        required
                        aria-label='last name'
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
                            required
                            aria-label='city'
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
                            required
                            aria-label='street name'
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
                            required
                            aria-label='building number'
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
                            required
                            aria-label='zip code'
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
                            required
                            aria-label='latitude'
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
                            required
                            aria-label='longitude'
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
                        required
                        aria-label='phone number'
                    />
                </Form.Group>
                <Button 
                variant="success" 
                type="submit"
                aria-label='update user'>
                    Edit User Account
                </Button>
            </Form>
            </section>
        </Container>
    )
}

export default UpdateUser;