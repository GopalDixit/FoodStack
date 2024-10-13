import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

const UpdateFood = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { id, name, image, price, description } = location.state;
    const [food, setFood] = useState({
        id:id,
        name: name || '',
        image: image || '',
        price: price || '',
        description: description || '',
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFood({ ...food, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`http://localhost:5000/api/food/update`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(food),
            });

            if (response.ok) {
                setSuccess('Food item updated successfully!');
                navigate('/')
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.message}`);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 mt-16">
            <h2 className="text-2xl font-bold mb-4">Updat Food Item</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Food Name"
                    value={food.name}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <img src={food.image}></img>
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={food.image}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={food.price}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={food.description}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Food Item'}
                </button>
            </form>
        </div>
    );
};

export default UpdateFood;

