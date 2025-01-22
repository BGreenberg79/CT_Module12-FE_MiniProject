import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Container, ListGroup, Dropdown, Card, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';



const ProductCatalog = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  // allows me to filter by category once selected in the bootstrap dropdown menu
  const [sorting, setSorting] = useState('asc')
  // Fake Store API defaults to ascending sorting
  const [searchBar, setSearchBar] = useState('');
  // state for search by product name
  const [priceMaxOrMin, setPriceMaxOrMin] = useState('max');
  const [priceSearchBar, setPriceSearchBar] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleCategorySelect = useCallback((category) =>{
    setSelectedCategory(category);
  }, []);

  const handleSorting = useCallback((order) => {
    setSorting(order);
  }, []);
  
  const handleSearch = useCallback((event) => {
    setSearchBar(event.target.value);
  }, []);

  const handlePriceMaxMin = useCallback((event) => {
    setPriceMaxOrMin(event.target.value);
  }, []);

  const handlePriceSearch = useCallback((event) => {
    setPriceSearchBar(event.target.value);
  }, []);

  // Added useCallback to memoize the functions for each event listener to minimize rerendering



  const filteredProducts = useMemo(products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(searchBar.toLowerCase());
    const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
    let priceMatch = true
    if (priceSearchBar) {
      if (priceMaxOrMin === 'max') {
        priceMatch = product.price <= priceSearchBar;}
      else {
        priceMatch = product.price >= priceSearchBar;}}
    return titleMatch && categoryMatch && priceMatch;
  }), [products, searchBar, priceSearchBar, priceMaxOrMin, selectedCategory]);

  // Added useMemo to memoize the filteredProducts array to minimize rerendering

  return (
    <Container>
      <header>
      <h1>Product Catalog</h1>
      </header>

      {/* Dropdown to set sorting by price */}
      <section>
      <Dropdown>
        <Dropdown.Toggle 
        variant="success" 
        id="dropdownPriceSort"
        aria-label='sort by price'
        >
          Sort By Price
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item 
          onClick={() => handleSorting('asc')}
          aria-label='sort ascending'
          >Ascending</Dropdown.Item>
          <Dropdown.Item 
          onClick={() => handleSorting('desc')}
          aria-label='sort descending'
          >Descending</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Dropdown list to select and filter by category*/}
      <Dropdown>
        <Dropdown.Toggle 
        variant="success" 
        id="dropdownSelectCategory"
        aria-label='select product category'
        >
          Select Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item 
            key={category} 
            onClick={() => handleCategorySelect(category)}
            aria-label={`filter by ${category} category`}>{category}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Form>
        <Form.Group className="my-2" controlId="searchByItem">
          <Form.Label>Search By Item</Form.Label>
          <Form.Control
          type="text" 
          placeholder="Search by item name" 
          value={searchBar} 
          onChange={handleSearch}
          aria-label='search by item name'
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Price Search</Form.Label>
          <Form.Control
          type="number" 
          placeholder="Enter price" 
          value={priceSearchBar} 
          onChange={handlePriceSearch}     
          aria-label='search by item price'
          />

        <Dropdown>
          <Dropdown.Toggle 
          variant="success" 
          id="dropdownPriceFilter"
          aria-label='filter by price maximum or minimum'
          >
            {priceMaxOrMin === 'max' ? 'Maximum Price' : 'Minimum Price'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item 
            onClick={() => handlePriceMaxMin('max')}
            aria-label='filter by maximum price'>Maximum Price</Dropdown.Item>
            <Dropdown.Item 
            onClick={() => handlePriceMaxMin('min')}
            aria-label='filter by minimum price'>Minimum Price</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Form.Group>
      </Form>
      </section>
      {/* Map through products */}
      <section>
      <ListGroup>
        {filteredProducts.map((product) => (
          <Card variant='info' key={product.id}>
            <Card.Img 
            variant="top" 
            src={product.image}
            alt={`image of ${product.title}`}
            aria-label={`image of ${product.title}`}/>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                Category: {product.category}<br />
                Price: ${product.price}<br />
                Description: {product.description}
                <Button 
                variant='success' 
                onClick={() => dispatch(addToCart(product))}
                aria-label={`Add ${product.title} to cart`}>Add To Cart</Button>
                {/* disptch addToCart reducer on click of add to cart button */}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
      </section>
    </Container>
  )
}

export default ProductCatalog