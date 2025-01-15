import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateUser from './components/CreateUser' 
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
    <Routes>
      <Route path="/create-user" element={<CreateUser />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/update-user/:id' element={<UpdateUser />} />
      <Route path='/users' element={<UserList />} />
      <Route path='/product-catalog' element={<ProductCatalog />} />
    </Routes>
    </CartProvider>

  )
}

export default App