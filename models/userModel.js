const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // 👈 custom ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  country: String,
  createdAt: { type: Date, default: Date.now },
});

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Auto-increment ID
  const User = mongoose.model('User', userSchema);
  if (this.isNew) {
    const lastUser = await User.findOne().sort('-id').exec();
    this.id = lastUser ? lastUser.id + 1 : 0;
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare hashed passwords
userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
