import React, { useEffect, useState } from 'react'
import { Container, ListGroup, Card, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, clearCart } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ShoppingCart = () => {

    const { cart } = useSelector((state) => state.cart)
    // useSelector allows us to access the cart state from the store
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showCheckoutNotfication, setShowCheckoutNotification] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [products, setProducts] = useState({});

    const fetchProductsForPrice = async (productId) => {
        if (!products[productId]) { //prevent fetching the same product multiple times
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
            const productData = response.data;
            setProducts((prevProducts) => ({
                ...prevProducts,
                [productId]: productData,
            }));
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
    };


    // Fetch order history from FakeStoreAPI
    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/carts');

                // Fetch products for each order
                const allProductIds = new Set();
                response.data.forEach(order => {
                    order.products.forEach(item => {
                        allProductIds.add(item.productId); // Collect productIds
                    });
                });

                // Fetch details for all unique productIds
                await Promise.all(Array.from(allProductIds).map(productId => fetchProductsForPrice(productId)));

                const responseWithPrice = response.data.map((order) => {
                    const priceCalculation = calculateTotalPrice(order.products);
                    return {
                        ...order,
                        totalPrice: priceCalculation,
                    };
                })
                setOrderHistory(responseWithPrice);

            } catch (error) {
                console.error(error);
            }
        };
        fetchOrderHistory();
    }, []);

    const calculateTotalPrice = (orderProducts) => {
        return orderProducts.reduce((total, item) => {
            const product = products[item.productId];
            if (!product) {
                return total; //Skips product if fetch call hasn't been completed yet or fails
            }
            return total + (product.price * item.quantity);
        }, 0);
    };

    // Check for login and user data
    useEffect(() => {
        const loginToken = sessionStorage.getItem('authenticationToken');
        const storedUserData = sessionStorage.getItem('userData');

        if (!loginToken || !storedUserData) {
            navigate('/login');
        }
    }, [navigate]);

    const handlePriceTotal = () => {
        return cart.reduce((total, product) => total + (product.price * product.quantity), 0)
    }

    const handleTotalItems = () => {
        return cart.reduce((total, product) => total + product.quantity, 0)
    }

    const handleCheckout = async () => {
        // Fetch data from sessionStorage
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        const userId = storedUserData ? storedUserData.id : null;
        const date = new Date().toISOString().split('T')[0]; // Gets current date in YYYY-MM-DD format

        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        // Prepare the order data
        const orderData = {
            userId,
            date,
            // Map cart data from store to match FakeStoreAPI's order format
            products: cart.map(product => ({
                productId: product.id,
                quantity: product.quantity,
            })),
        };

        try {
            // uses Axios to post order Data to FakeStoreAPI
            const response = await axios.post('https://fakestoreapi.com/carts', orderData);
            console.log('Order created:', response.data);

            // After successful order creation, clear the cart and show checkout notification
            dispatch(clearCart());
            setShowCheckoutNotification(true);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const handleCloseNotification = () => {
        setShowCheckoutNotification(false);
    }

    // handles choosing an order as the selected order from the order history section
    const handleShowOrderDetails = (orderId) => {
        const order = orderHistory.find(o => o.id === orderId);
        setSelectedOrder(order);
    };

    const handleCloseOrderDetails = () => {
        setSelectedOrder(null);
    };

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
                                <Card.Img variant='top' src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                        Price: ${product.price}<br />
                                        Description: {product.description}
                                        Quantity: {product.quantity}<br />
                                        <Button variant='success' onClick={() => dispatch(addToCart(product))}>Add Additional</Button>
                                        {/* dispatches addToCart reducer from cartSlice */}
                                        <Button variant='danger' onClick={() => dispatch(removeFromCart(product))}>Remove</Button>
                                        {/* dispatches removeFromCart reducer from cartSlice */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>)))}
            </ListGroup>
            <p>Total Number of Items in Cart: {handleTotalItems()}</p>
            <p>Total Price: {handlePriceTotal()}</p>
            <Button variant='danger' onClick={() => dispatch(clearCart())}>Clear Cart</Button>
            <Button variant='success' onClick={handleCheckout}>Checkout</Button>
            <Modal show={showCheckoutNotfication} onHide={handleCloseNotification}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout Completed</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have successfully checked out!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNotification}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <h2>Order History</h2>
            <ListGroup>
                {orderHistory.map((order) => (
                    <ListGroup.Item 
                    key={order.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Order ID: {order.id}</Card.Title>
                                    <Card.Text>
                                        Date Created: {new Date(order.date).toLocaleDateString()}<br />
                                        {/* Uses local date string to support internationalization instead of raw date */}
                                        Total Price: ${order.totalPrice}<br />
                                        <Button variant='success' onClick={() => handleShowOrderDetails(order.id)}>Show Product Details</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {/* Modal to show details of a selected order */}
            <Modal show={selectedOrder !== null} onHide={handleCloseOrderDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Order ID: {selectedOrder.id} <br />
                    Date: {new Date(selectedOrder.date).toLocaleDateString()} <br />
                    Total Price: ${selectedOrder.totalPrice} <br />
                    Products in this Order:
                            <ListGroup>
                                {selectedOrder.products.map((product) => (
                                    <ListGroup.Item key={product.productId}>
                                        Product ID: {product.productId} <br />
                                        Quantity: {product.quantity} <br />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOrderDetails}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </Container>
    )
}

export default ShoppingCart;