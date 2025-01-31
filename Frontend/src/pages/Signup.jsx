import { useState } from 'react'
import {Link} from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const [error,setError] = useState("")

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      setError("Passwords do not match");
      return;
    }
    setError("");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="absolute top-10 left-40 w-64 h-64 bg-violet-600  mix-blend-screen filter blur-[70px] opacity-50 animate-floating"></div>
      <div className="absolute bottom-50 right-16 w-64 h-64 bg-blue-400  mix-blend-screen filter blur-[70px] opacity-50 animate-floating"></div>
      <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-indigo-800 mix-blend-screen filter blur-[70px] opacity-50 animate-floatingReverse"></div>

      <div className="absolute top-50 left-1/3  w-24 h-24 bg-white/10 backdrop-blur-md rounded-lg animate-tileFloating"></div>
      <div className="absolute top-[50px] right-1/3 z-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-lg animate-tileFloatingReverse"></div>
      <div className="absolute top-5 left-1/3 w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg animate-tileFloating"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 backdrop-blur-md rounded-lg animate-tileFloatingReverse"></div>

      <div className=" bg-white/10 backdrop-blur-2xl shadow-xl  rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-blue-400">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-1.5">
          <div>
            <label className="block text-base font-medium text-white"> Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              required
              onChange={handleChange}
              className="w-full p-2 rounded-full bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white"> Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              required
              onChange={handleChange}
              className="w-full p-2 rounded-full bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white"> Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              required
              onChange={handleChange}
              className="w-full p-2 rounded-full bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-white"> Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder=" Re-enter password"
              value={formData.confirmPassword}
              required
              onChange={handleChange}
              className="w-full p-2 rounded-full bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
          </div>
          <button type="submit" className="w-full text-center font-bold text-md text-white bg-blue-500 rounded-full p-2 mt-2 justify-center hover:bg-blue-600">Submit</button>
        </form>
        <p className="mt-1 text-center text-white ">Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link></p>
      </div>
    </div>
  )
}

export default Signup
