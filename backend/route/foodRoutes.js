const express = require('express');
const Food = require('../Models/Food');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/food - Add new food item
router.post('/', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }
  
    const { name, image, price, description } = req.body;
  
    try {
      const newFood = new Food({ name, image, price, description });
      await newFood.save();
      res.status(201).json(newFood);
    } catch (error) {
      res.status(500).json({ message: 'Error adding food item', error });
    }
  });

// GET /api/food - Get all food items
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items', error });
  }
});

// Update food item
router.put('/update', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied.' });
  }
  const { id, name, image, price, description } = req.body;

  try {
    const updatedFood = await Food.findByIdAndUpdate(id, { name, image, price, description }, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: 'Error updating food item', error });
  }
});

// Delete
router.delete('/:id',verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied.' });
  }
  const { id } = req.params;
  try {
      const foodItem = await Food.findByIdAndDelete(id);
      
      if (!foodItem) {
          return res.status(404).json({ message: 'Food item not found' });
      }
      res.status(200).json({ message: 'Food item deleted successfully' });
      navigate('/');
  } catch (error) {
      console.error('Error deleting food item:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
