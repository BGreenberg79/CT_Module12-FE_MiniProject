import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import UserLogin from './components/UserLogin'
import UpdateUser from './components/UpdateUser'
import UserList from './components/UserList'
import ProductCatalog from './components/ProductCatalog' 
import { Provider } from 'react-redux'
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/create-user" element={<CreateUser />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/update-user/:id' element={<UpdateUser />} />
      <Route path='/users' element={<UserList />} />
      <Route path='/product-catalog' element={<ProductCatalog />} />
    </Routes>
    </Provider>

  )
}

export default App