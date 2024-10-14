import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; 

const Navbar = ({ scrollToCart, cartItemCount }) => {  // Step 1: Accept cartItemCount as a prop
  const { isAuthenticated, logout, userRole } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`text-white py-4 fixed top-0 left-0 w-full z-10 ${isAuthenticated ? 'bg-orange-800' : 'bg-transparent'} dark:bg-red-900`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold font-extralight">Food <span className="bg-green-400 p-2 text-white rounded-xl hover:font-bold dark:bg-red-500">Stack</span></Link>

        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              {userRole === 'admin' && <Link to="/add-food" className="mr-4">Add Food</Link>}
              <button 
                onClick={scrollToCart} 
                className="bg-blue-500 px-4 py-2 rounded-xl relative mr-3"
              >
                Cart
                {cartItemCount > 0 && (  // Step 2: Show cart item count badge if greater than 0
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button onClick={logout} className="bg-green-500 px-4 py-2 rounded">Logout</button>
              <button onClick={toggleDarkMode} className="ml-4">
                {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
              </button>
            </>
          ) : (
            <div className='z-0'>
              <p className="text-lg font-serif italic text-gray-100">
                "Good food is the foundation of genuine happiness."
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
