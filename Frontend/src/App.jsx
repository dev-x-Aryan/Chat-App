import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/signup'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup /> }/>
        <Route path="/login" element={<Login /> }/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
