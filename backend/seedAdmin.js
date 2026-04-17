// backend/seedAdmin.js
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB().then(async () => {
    const exists = await User.findOne({ email: 'admin@thefolio.com' });
    if (exists) {
        console.log('Admin account already exists. Deleting and recreating to ensure password is hashed.');
        await User.findOneAndDelete({ email: 'admin@thefolio.com' });
    }
    const user = new User({
        name: 'TheFolioAdmin',
        email: 'admin@thefolio.com',
        password: 'Admin@1234',
        role: 'admin',
    });
    await user.save();
    console.log('Admin account created successfully!');
    console.log('Email: admin@thefolio.com');
    console.log('Password: Admin@1234');
    process.exit();
});