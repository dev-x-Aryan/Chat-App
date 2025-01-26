import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 bg-[#27296d] shadow-lg px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
            ChitChat
        </Link>
        <ul className="flex space-x-6 text-white">
            <li><Link to="/settings"><FontAwesomeIcon icon={faGear} /></Link></li>
            <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link></li>
            <li><Link to="/logout"><FontAwesomeIcon icon={faPowerOff} /></Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
