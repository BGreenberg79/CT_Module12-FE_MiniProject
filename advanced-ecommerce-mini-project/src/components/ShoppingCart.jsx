import React from 'react'
import { Container, ListGroup, Card, Button } from 'react-bootstrap'
import { useCart } from '../context/CartContext'

const ShoppingCart = () => {

    const { cart, addToCart, removeFromCart, clearCart } = useCart();
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
                                <Button variant='success' onClick={()=>addToCart(product)}>Add Additional</Button>
                                <Button variant='danger' onClick={() => removeFromCart(product)}>Remove</Button>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>)))}
        </ListGroup>
        <Button variant='danger' onClick={clearCart}>Clear Cart</Button>
    </Container>
  )
}

export default ShoppingCart