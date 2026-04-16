require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const seed = async () => {
  await connectDB();
  const exists = await User.findOne({ email: 'admin@erp.com' });
  if (!exists) {
    await User.create({ name: 'Admin', email: 'admin@erp.com', password: 'Admin@123', role: 'admin' });
    console.log('Admin user created');
  } else {
    console.log('Admin already exists');
  }
  process.exit();
};

seed();
