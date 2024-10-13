import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../components/AuthContext';
import CartItem from '../components/CartItem';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const FoodList = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const cartRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFoods = async () => {
        const response = await fetch('http://localhost:5000/api/food');
        const data = await response.json();
        setFoods(data);
      };
      fetchFoods();
    }
  }, [isAuthenticated]);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/food/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
            });

            if (response.ok) {
                alert('Food item deleted successfully!');
                setFoods((prevFoods) => prevFoods.filter(food => food._id !== id));
                navigate('/')
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting food:', error);
            alert('An error occurred while deleting. Please try again.');
        }
    }
};

  const removeFromCart = (food) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item._id === food._id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0);
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice === '' || food.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || food.price <= parseFloat(maxPrice);
    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen relative w-full h-full">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/495/760/53/cuisine-food-india-indian-wallpaper-preview.jpg"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full z-0"
        />
        <p className="text-6xl text-white mb-4 z-10" style={{ fontFamily: 'HarryPotter' }}>
          Please log in to view the food list.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full dark:bg-gray-700 p-4 px-8">
      <Navbar
        scrollToCart={() => cartRef.current?.scrollIntoView({ behavior: 'auto' })}
        cartItemCount={getTotalItemsInCart()}
      />

      <h1 className="text-5xl text-center mt-16 mb-6 dark:text-white" style={{ fontFamily: 'Lobster', animation: 'fadeIn 2s', marginTop: 75 }}>
        Food List
      </h1>

      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <input
          type="text"
          placeholder="Search for food..."
          className="border p-2 rounded mb-4 sm:mb-0 sm:mr-4 dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex">
          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 rounded mr-4 dark:bg-gray-800 dark:text-white"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 rounded dark:bg-gray-800 dark:text-white"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoods.length > 0 ? (
          filteredFoods.map(food => (
            <div
              key={food._id}
              className="border rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out dark:bg-gray-800 dark:text-white"
            >
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{food.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">Price: ₹{food.price.toFixed(2)}</p>
                <p className="text-gray-700 dark:text-gray-300">{food.description}</p>
                <button
                  className="bg-blue-500 text-white mt-2 px-2 py-2 mr-2 rounded hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => addToCart(food)}
                >
                  Add to Cart
                </button>
                {userRole === 'admin' && (
                  <button
                    className="bg-green-500 text-white mt-2 px-2 py-2 mr-2 rounded hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600"
                    onClick={() => navigate('/update', { state: { id: food._id, name: food.name, image: food.image, price: food.price, description: food.description } })}>
                    Update
                  </button>
                )}
                {userRole === 'admin' && (
                  <button
                    className="bg-red-500 text-white mt-2 px-2 py-2 rounded hover:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600"
                    onClick={() => handleDelete(food._id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full dark:text-white">No food items match your criteria.</p>
        )}
      </div>

      {cart.length > 0 && (
        <div ref={cartRef}>
          <CartItem cart={cart} removeFromCart={removeFromCart} total={calculateTotal()} />
        </div>
      )}
    </div>
  );
};

export default FoodList;
