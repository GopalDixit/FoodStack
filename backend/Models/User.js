const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }, // 'admin' or 'user'
});

const User = mongoose.model('User', userSchema);
module.exports = User;
