import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, userRole } = useContext(AuthContext);

  return (
    <nav className="bg-orange-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold font-extralight ">Food <span className="bg-green-400 p-2 text-white rounded-xl hover:font-bold">Stack</span></Link>
        <div>
          {isAuthenticated ? (
            <>
              {userRole === 'admin' && <Link to="/add-food" className="mr-4">Add Food</Link>}
              <Link to="/" className="mr-4">Home</Link>
              {/* <Link to="/cartitem" className="mr-4">Cart</Link> */}

              <button onClick={logout} className="bg-green-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup" className="bg-green-500 px-4 py-2 rounded-lg">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
