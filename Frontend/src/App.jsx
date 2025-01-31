import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/signup'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup /> }/>
        <Route path="/login" element={<Login /> }/>
      </Routes>
    </div>
  )
}

export default App
