import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/users');
            console.log(response)
            setUsers(response.data);
            return response.data   
        }
        catch (error) {
            console.error(error)
        }}

    const deleteUserAPI = async (id) => {
        try {
            const response = await axios.delete(`https://fakestoreapi.com/users/${id}`);
            console.log(response)
            fetchUsers();
        }
        catch (error) {
            console.error(error)
        }}
    const handleDeleteUser = (id) => {
        deleteUserAPI(id);
    }

    const handleEditButton = (id) => {
        navigate(`/update-user/${id}`);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

  return (
    <Container>
        <h1>User List</h1>
        <ListGroup>
            {users.map((user) => (
                <ListGroup.Item variant='info' key={user.id}>
                    Name: {user.name.firstname} {user.name.lastname}<br />
                    Username: {user.username}<br />
                    Email: {user.email}<br />
                    Phone: {user.phone}<br />
                    <Button variant='danger' className='shadow-sm m-1 p-1' onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    <Button variant='warning' className='shadow-sm m-1 p-1' onClick={() => handleEditButton(user.id)}>Edit</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </Container>
  )
}

export default UserList;