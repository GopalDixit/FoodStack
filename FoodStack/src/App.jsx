import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodList from './pages/FoodList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/AuthContext';
import AddFood from './components/AddFood';
import CartItem from './components/CartItem';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FoodList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/cartitem" element={<CartItem />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
