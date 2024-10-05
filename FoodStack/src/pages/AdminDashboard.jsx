import React, { useState } from 'react';
import { addFood } from '../services/api';

const AdminDashboard = () => {
  const [food, setFood] = useState({ name: '', image: '', price: '', category: '', description: '' });

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFood(food).then(() => {
      alert('Food added successfully');
      setFood({ name: '', image: '', price: '', category: '', description: '' });
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Food</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={food.name} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input name="image" placeholder="Image URL" value={food.image} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input name="price" placeholder="Price" value={food.price} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input name="category" placeholder="Category" value={food.category} onChange={handleChange} className="border p-2 mb-2 w-full" />
        <textarea name="description" placeholder="Description" value={food.description} onChange={handleChange} className="border p-2 mb-2 w-full"></textarea>
        <button className="bg-blue-500 text-white px-4 py-2">Add Food</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
