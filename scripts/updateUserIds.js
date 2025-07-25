const mongoose = require('mongoose');
require('dotenv').config(); // Loads from .env

const User = require('../models/userModel'); // Adjust path if needed

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  updateUserIds();
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Update IDs
async function updateUserIds() {
  try {
    const users = await User.find().sort('createdAt');

    for (let i = 0; i < users.length; i++) {
      users[i].id = i;
      await users[i].save();
      console.log(`Updated user ${users[i].email} with id ${i}`);
    }

    console.log('✅ All user IDs updated');
    process.exit(0);
  } catch (error) {
    console.error('Error updating user IDs:', error);
    process.exit(1);
  }
}
