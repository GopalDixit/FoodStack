const express = require('express');
const Food = require('../Models/Food');
const jwt = require('jsonwebtoken');
const router = express.Router();

const jwtSecret = 'yourSecretKey';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

// Add food (Admin)
router.post('/add', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin access only' });

  const { name, image, price, category, description } = req.body;
  const newFood = new Food({ name, image, price, category, description });

  await newFood.save();
  res.json({ msg: 'Food added' });
});

// Get all food
router.get('/', async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

// Filter by category or price
router.get('/filter', async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };

  const foods = await Food.find(filter);
  res.json(foods);
});

router.post('/', async (req, res) => {
    const { name, image, price, description } = req.body;
  
    // Optional: Check if user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }
  
    try {
      const newFood = new Food({
        name,
        image,
        price,
        description,
      });
  
      await newFood.save();
      res.status(201).json(newFood);
    } catch (error) {
      res.status(500).json({ message: 'Error adding food item', error });
    }
  });
module.exports = router;
