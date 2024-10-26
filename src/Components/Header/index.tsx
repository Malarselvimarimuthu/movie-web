import React, { useState } from 'react';
import './style.css'; // For custom fonts and additional styles

const Navbar: React.FC = () => {
  const [search, setSearch] = useState('');

  const handleClear = () => {
    setSearch('');
  };

  return (
    <div className="fixed w-full top-0 bg-black z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-start">
            <div className="logo text-5xl font-bold">MoVIENesT</div>
          </div>
          <div className="flex items-center space-x-10">
            <button className="text-white text-4xl hover:text-red-600 hidden md:block">Home</button>
            <button className="text-white text-4xl hover:text-red-600 hidden md:block">Favorites</button>
            <div className="relative hidden md:block">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-black border border-white rounded-full pl-4 pr-16 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-600 w-64" // Adjusted size
                placeholder="Search..."
              />
              <button onClick={handleClear} className="absolute right-0 top-0 mt-2 mr-3 text-white hover:text-red-600">
                Clear
              </button>
            </div>
            <div className="relative hidden md:block">
              <button className="text-white text-4xl hover:text-red-600">Dropdown</button>
              <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  Profile
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  My Account
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  Logout
                </button>
              </div>
            </div>
            <button className="text-white text-4xl hover:text-red-600 hidden md:block">Login</button>
          </div>
          <div className="md:hidden">
            <button className="text-white text-4xl hover:text-red-600">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
