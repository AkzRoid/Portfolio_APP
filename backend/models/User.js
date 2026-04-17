// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['member', 'admin', 'guest'], default: 'member' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: '' }, // stores filename e.g. 'abc123.jpg'
  resetPasswordToken: { type: String, default: null },
  resetPasswordCode: { type: String, default: null }, // URL-safe code
  resetPasswordExpires: { type: Date, default: null }
}, { timestamps: true });

// Pre-save hook: hash password before storing
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Instance method: compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);