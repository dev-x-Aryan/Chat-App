import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUser, faPowerOff, faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 bg-[#475053] shadow-lg px-4 sm:px-6 lg:px-8 h-8">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
            ChitChat
        </Link>
        <ul className="hidden md:flex space-x-6 text-white">
            <li><Link to="/settings"><FontAwesomeIcon icon={faGear} /></Link></li>
            <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link></li>
            <li><Link to="/logout"><FontAwesomeIcon icon={faPowerOff} /></Link></li>
        </ul>
        <button
          className="md:hidden text-white p-2 focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen? faTimes : faBars} />
        </button>
      </div>
      <div>
        {menuOpen && (
        <div className="md:hidden absolute top-16 right-4 w-48 bg-[#475053] p-2 bg-opacity-95 flex flex-col justify-center items-center space-y-6 z-50">
          <Link to="/settings" className="text-white text-xl">
            <FontAwesomeIcon icon={faGear} size="lg" /> Settings
          </Link>
          <Link to="/profile" className="text-white text-xl">
            <FontAwesomeIcon icon={faUser} size="lg" /> Profile
          </Link>
          <Link to="/logout" className="text-white text-xl">
            <FontAwesomeIcon icon={faPowerOff} size="lg" /> Logout
          </Link>
        </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
