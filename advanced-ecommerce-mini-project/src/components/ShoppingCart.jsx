import React, { useEffect } from 'react'
import { Container, ListGroup, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, clearCart } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const ShoppingCart = () => {

    const { cart } = useSelector((state) => state.cart) 
    // useSelector allows us to access the cart state from the store
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check for login and user data
    useEffect(() => {
        const loginToken = sessionStorage.getItem('authenticationToken');
        const storedUserData = sessionStorage.getItem('userData');

        if (!loginToken || !storedUserData) {
            navigate('/login');
        }
    }, [navigate]);

    const handleTotal = () => {
        return cart.reduce((total, product) => total + (product.price * product.quantity), 0)
    }

    const handleCheckout = () => {
        dispatch(clearCart())
        navigate('/product-catalog')
    }

  return (
    <Container>
        <h1>Shopping Cart</h1>
        <ListGroup>
            {cart.length === 0 ? (
                <h2>Your cart is empty</h2>
            ) : (
                cart.map((product) => (
                    <ListGroup.Item key={product.id}>
                        <Card>
                            <Card.Img variant='top' src={product.image}/>
                            <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>
                                Price: ${product.price}<br />
                                Description: {product.description}
                                Quantity: {product.quantity}<br />
                                <Button variant='success' onClick={()=>dispatch(addToCart(product))}>Add Additional</Button>
                                {/* dispatches addToCart reducer from cartSlice */}
                                <Button variant='danger' onClick={() => dispatch(removeFromCart(product))}>Remove</Button>
                                {/* dispatches removeFromCart reducer from cartSlice */}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>)))}
        </ListGroup>
        <h3>Total: {handleTotal()}</h3>
        <Button variant='danger' onClick={() => dispatch(clearCart())}>Clear Cart</Button>
        <Button variant='success' onClick= {handleCheckout}>Checkout</Button>
        
    </Container>
  )
}

export default ShoppingCart