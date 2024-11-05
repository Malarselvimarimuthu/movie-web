import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUserCircle } from 'react-icons/fa'; // Importing icons
import { useUser } from '../../context/UserContext';
import './style.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, userId, logout } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsOpen(false); // Close menu when user logs in
    }
  }, [isLoggedIn]);

  return (
    <div className="fixed w-full top-0 bg-black z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="logo text-5xl font-bold text-white">
            MoVIENesT
          </Link>
          <Link to="/movies" className="text-white text-4xl hover:text-red-600 ml-auto pr-8">
            Movies
          </Link>
          <div className="hidden md:flex items-center space-x-10">
            {isLoggedIn ? (
              <>
                <Link to="/favourites">
                  <button className="text-white text-4xl hover:text-red-600">Favorites</button>
                </Link>
                <Link to={`/userprofile/${userId}`}>
                  <button className="text-white text-4xl hover:text-red-600">
                    <FaUserCircle />
                  </button>
                </Link>
                <button onClick={logout} className="text-white text-4xl hover:text-red-600">Logout</button>
              </>
            ) : (
              <Link to="/login">
                <button className="text-white text-4xl hover:text-red-600">Login</button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white text-4xl">
              <FaBars />
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
          {isLoggedIn ? (
            <>
              <Link to="/favourites" onClick={toggleMenu}>
                <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Favorites</button>
              </Link>
              <Link to={`/userprofile/${userId}`} onClick={toggleMenu}>
                <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">
                  <FaUserCircle />
                </button>
              </Link>
              <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={toggleMenu}>
              <button className="block w-full text-left text-2xl py-2 px-4 hover:bg-red-600">Login</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
