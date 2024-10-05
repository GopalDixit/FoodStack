const express = require('express');
const payment = require('./route/Payment')
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./route/userRoutes');
const foodRoutes = require('./route/foodRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/payment',payment)
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
