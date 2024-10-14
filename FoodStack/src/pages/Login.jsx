import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Navigate after successful login
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
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
          Please log in to view the food list.
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
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
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded w-full">Login</button>
          <button
            onClick={() => navigate('/signup')} 
            className="text-white mt-4 w-full underline">
            Don't have an account? Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
