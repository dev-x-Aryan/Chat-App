import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/signup'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup /> }/>
      </Routes>
    </div>
  )
}

export default App
