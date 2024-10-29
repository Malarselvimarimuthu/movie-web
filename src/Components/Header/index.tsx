import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Importing the hamburger icon
import './style.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed w-full top-0 bg-black z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="logo text-5xl font-bold text-white">
            MoVIENesT
          </Link>
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/movies">
              <button className="text-white text-4xl hover:text-red-600">Movies</button>
            </Link>
            <Link to="/favourites">
              <button className="text-white text-4xl hover:text-red-600">Favorites</button>
            </Link>
            <Link to="/login">
              <button className="text-white text-4xl hover:text-red-600">Login</button>
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white text-4xl">
              <FaBars /> {/* Hamburger icon */}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white">
          <Link to="/movies" onClick={toggleMenu}>
            <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Movies</button>
          </Link>
          <Link to="/favorites" onClick={toggleMenu}>
            <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Favorites</button>
          </Link>
          <Link to="/login" onClick={toggleMenu}>
            <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
