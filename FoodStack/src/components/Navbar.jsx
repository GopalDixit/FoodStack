// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// const Navbar = () => {
//   const { isAuthenticated, logout, userRole } = useContext(AuthContext);
  
//   return (
//     <nav className={`text-white py-4 fixed top-0 left-0 w-full z-10 ${isAuthenticated ? 'bg-orange-800' : 'bg-transparent'}`}>
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-lg font-bold font-extralight">Food <span className="bg-green-400 p-2 text-white rounded-xl hover:font-bold">Stack</span></Link>
//         <div>
//           {isAuthenticated ? (
//             <>
//               {userRole === 'admin' && <Link to="/add-food" className="mr-4">Add Food</Link>}
//               <Link to="/" className="mr-4">Home</Link>
//               <button onClick={logout} className="bg-green-500 px-4 py-2 rounded">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link 
//                 to="/login" 
//                 className="mr-4 text-lg font-serif" 
//                 style={{zIndex:12}}
//                 onClick={() => console.log("Navigating to Login")}
//               >
//                 Login
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="bg-green-500 px-4 py-2 rounded-lg" 
//                 style={{zIndex:12}}
//                 onClick={() => console.log("Navigating to Signup")}
//               >
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; 

const Navbar = () => {
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
              <button onClick={logout} className="bg-green-500 px-4 py-2 rounded">Logout</button>

              <button
                onClick={toggleDarkMode}
                className=" text-black dark:text-white px-4 py-2 rounded mr-4"
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6 text-yellow-500" /> 
                ) : (
                  <MoonIcon className="h-6 w-6 text-white" /> 
                )}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-lg font-serif">Login</Link>
              <Link to="/signup" className="bg-green-500 px-4 py-2 rounded-lg">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
