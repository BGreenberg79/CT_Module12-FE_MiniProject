import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Dropdown, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';



const ProductCatalog = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  // allows me to filter by category once selected in the bootstrap dropdown menu
  const [sorting, setSorting] = useState('asc')
  // Fake Store API defaults to ascending sorting
  const navigate = useNavigate();

  const {addToCart} = useCart();

  useEffect(() => {
    const loginToken = sessionStorage.getItem('authenticationToken');
    const storedUserData = sessionStorage.getItem('userData');

    if (!loginToken || !storedUserData) {
      navigate('/login');
    } else {
      fetchProducts();
      fetchCategories();
    }
  }, [navigate, sorting]);


  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products?sort=${sorting}`);
      setProducts(response.data);
      return response.data
    }
    catch (error) {
      console.error(error)
    }
  }
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(response.data);
      return response.data
    }
    catch (error) {
      console.error(error)
    }
  };

  const handleCategorySelect = (category) =>{
    setSelectedCategory(category);
  }

  const handleSorting = (order) => {
    setSorting(order)
  }


  const filteredProducts = selectedCategory ? products.filter((product) => product.category === selectedCategory) : products;

  return (
    <Container>
      <h1>Product Catalog</h1>

      {/* Dropdown to set sorting by price */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By Price
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSorting('asc')}>Ascending</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSorting('desc')}>Descending</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Dropdown list to select and filter by category*/}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item key={category} 
            onClick={() => handleCategorySelect(category)}>{category}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* Map through products */}
      <ListGroup>
        {filteredProducts.map((product) => (
          <Card variant='info' key={product.id}>
            <Card.Img variant="top" src={product.image}/>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                Category: {product.category}<br />
                Price: ${product.price}<br />
                Description: {product.description}
                <Button variant='success' onClick={() => addToCart(product)}>Add To Cart</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
    </Container>
  )
}

export default ProductCatalog