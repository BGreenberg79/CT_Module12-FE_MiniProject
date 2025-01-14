import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateUser from './components/CreateUser' 

const App = () => {
  return (
    <Routes>
      <Route path="/create-user" element={<CreateUser />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/update-user/:id' element={<UpdateUser />} />
      <Route path='/users' element={<UserList />} />
    </Routes>
  )
}

export default App