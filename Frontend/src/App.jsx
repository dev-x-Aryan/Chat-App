import {Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/signup'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AuthContext } from './contexts/authContext'

const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={user? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={user ? <Navigate to={"/"} /> : <Signup />}/>
        <Route path="/login" element={user? <Navigate to={"/"} /> : <Login />}/>
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
