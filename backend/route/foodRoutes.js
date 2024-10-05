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

module.exports = router;
