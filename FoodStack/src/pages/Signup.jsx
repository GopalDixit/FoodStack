import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://foodstack-xp5k.onrender.com/api/users/signup', { name, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="h-screen w-full flex flex-col"> 
      <img 
        src="https://c4.wallpaperflare.com/wallpaper/495/760/53/cuisine-food-india-indian-wallpaper-preview.jpg"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full z-0" // Background image covering the full screen
      />
      <div className="flex flex-col justify-center items-center h-full relative z-10"> {/* Centered content */}
        <p className="text-6xl text-white mb-4" style={{ fontFamily: 'HarryPotter' }}>
          Create your account to view the food list.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 w-96"> {/* Set a width for the form */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

