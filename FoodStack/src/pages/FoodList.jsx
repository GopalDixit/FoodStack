import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import CartItem from '../components/CartItem';

const FoodList = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]); // State for cart

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFoods = async () => {
        const response = await fetch('https://foodstack-xp5k.onrender.com/api/food');
        const data = await response.json();
        setFoods(data);
      };
      fetchFoods();
    }
  }, [isAuthenticated]);

  // Function to add food to the cart
  const addToCart = (food) => {
    const existingItem = cart.find(item => item._id === food._id);
    if (!existingItem) {
      setCart((prevCart) => [...prevCart, { ...food, quantity: 1 }]); // Add item with quantity 1
    } else {
      setCart((prevCart) =>
        prevCart.map(item =>
          item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  // Function to remove food from the cart
  const removeFromCart = (food) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item._id === food._id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0); // Remove item if quantity is 0
      return updatedCart;
    });
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-6xl text-black" style={{ fontFamily: 'HarryPotter' }}>
          Please log in to view the food list.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Animated Heading with Lobster Font */}
      <h1 className="text-5xl font-bold text-center mt-8 mb-6" style={{ fontFamily: 'Lobster', animation: 'fadeIn 2s' }}>
        Food List
      </h1>

      {/* Food Cards with animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map(food => (
          <div
            key={food._id}
            className="border rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out animate__animated animate__fadeInUp"
          >
            <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{food.name}</h2>
              <p className="text-gray-500">Price: ${food.price.toFixed(2)}</p>
              <p className="text-gray-700">{food.description}</p>
              <button
                className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600 hover:shadow-lg transition-colors duration-200"
                onClick={() => addToCart(food)} // Add food to cart
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Render CartItem with cart, removeFromCart, and total */}
      {cart.length > 0 && (
        <CartItem cart={cart} removeFromCart={removeFromCart} total={calculateTotal()} />
        
      )}
    </div>
  );
};

export default FoodList;

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import CartItem from '../components/CartItem';

const FoodList = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFoods = async () => {
        const response = await fetch('https://foodstack-xp5k.onrender.com/api/food');
        const data = await response.json();
        setFoods(data);
      };
      fetchFoods();
    }
  }, [isAuthenticated]);

  // Function to add food to the cart
  const addToCart = (food) => {
    const existingItem = cart.find(item => item._id === food._id);
    if (!existingItem) {
      setCart((prevCart) => [...prevCart, { ...food, quantity: 1 }]);
    } else {
      setCart((prevCart) =>
        prevCart.map(item =>
          item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  // Function to remove food from the cart
  const removeFromCart = (food) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item._id === food._id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0);
      return updatedCart;
    });
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen relative">
        <img 
          src="https://c4.wallpaperflare.com/wallpaper/495/760/53/cuisine-food-india-indian-wallpaper-preview.jpg"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full z-0" // Lower z-index for background
        />
        <p className="text-6xl text-white z-10" style={{ fontFamily: 'HarryPotter' }}>
          Please log in to view the food list.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Animated Heading with Lobster Font */}
      <h1 className="text-5xl font-bold text-center mt-16 mb-6" style={{ fontFamily: 'Lobster', animation: 'fadeIn 2s',marginTop:75 }}>
        Food List
      </h1>

      {/* Food Cards with animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map(food => (
          <div
            key={food._id}
            className="border rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out animate__animated animate__fadeInUp"
          >
            <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{food.name}</h2>
              <p className="text-gray-500">Price: ${food.price.toFixed(2)}</p>
              <p className="text-gray-700">{food.description}</p>
              <button
                className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600 hover:shadow-lg transition-colors duration-200"
                onClick={() => addToCart(food)} // Add food to cart
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Render CartItem with cart, removeFromCart, and total */}
      {cart.length > 0 && (
        <CartItem cart={cart} removeFromCart={removeFromCart} total={calculateTotal()} />
      )}
    </div>
  );
};

export default FoodList;

