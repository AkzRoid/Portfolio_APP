// backend/routes/auth.routes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload');
const { sendPasswordResetEmail } = require('../utils/sendEmail');

const router = express.Router();

// Helper function — generates a JWT token that expires in 7 days
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });


// ── POST /api/auth/register ───────────────────────────────────
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── POST /api/auth/login ──────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({
        message: 'Your account is deactivated. Please contact the admin.'
      });
    }

    const match = await user.matchPassword(password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── GET /api/auth/me ──────────────────────────────────────────
// Returns the currently logged-in user's data (requires token)
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});


// ── PUT /api/auth/profile ─────────────────────────────────────
// Update name, bio, or upload a new profile picture
router.put('/profile', protect, upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (req.body.name) user.name = req.body.name;
    if (req.body.bio) user.bio = req.body.bio;
    if (req.file) user.profilePic = req.file.filename;

    await user.save();

    const updated = await User.findById(user._id).select('-password');
    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── PUT /api/auth/change-password ────────────────────────────
router.put('/change-password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const match = await user.matchPassword(currentPassword);

    if (!match) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword; // pre-save hook will hash this
    await user.save();

    res.json({ message: 'Password updated successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── POST /api/auth/forgot-password ───────────────────────────
// Request a password reset for registered users
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with that email' });
    }

    // Generate reset token (expires in 5 minutes)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    
    // Generate URL-safe code (simpler for URL passing)
    const resetCode = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    // Send password reset email with the code
    const emailResult = await sendPasswordResetEmail(email, resetCode, user.name);

    if (!emailResult.success) {
      return res.status(500).json({ 
        message: 'Account found, but failed to send reset email. Please try again.' 
      });
    }

    res.json({
      message: 'Password reset link sent to your email. Check your inbox and follow the link to reset your password.'
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── GET /api/auth/verify-reset/:resetCode ──────────────────────
// Verify a reset code before allowing password reset
router.get('/verify-reset/:resetCode', async (req, res) => {
  try {
    const { resetCode } = req.params;
    const user = await User.findOne({ resetPasswordCode: resetCode });

    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired reset link' });
    }

    if (!user.resetPasswordExpires || new Date() > user.resetPasswordExpires) {
      user.resetPasswordCode = null;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      return res.status(400).json({ message: 'Reset link has expired. Please request a new one.' });
    }

    res.json({ valid: true, expiresAt: user.resetPasswordExpires });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── POST /api/auth/reset-password ────────────────────────────
// Reset password using the reset code
router.post('/reset-password', async (req, res) => {
  const { resetCode, newPassword } = req.body;

  try {
    // Validate code exists
    if (!resetCode) {
      console.error('❌ No reset code provided');
      return res.status(400).json({ message: 'Reset code is required' });
    }

    console.log(`🔍 Looking for user with reset code: ${resetCode.substring(0, 20)}...`);

    // Find user by reset code
    const user = await User.findOne({ resetPasswordCode: resetCode });

    if (!user) {
      console.error('❌ No user found with this reset code');
      return res.status(404).json({ message: 'Invalid reset code' });
    }

    // Check if code hasn't expired
    if (new Date() > user.resetPasswordExpires) {
      console.error('❌ Reset code expired. Expiry:', user.resetPasswordExpires);
      user.resetPasswordCode = null;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      return res.status(400).json({ message: 'Reset link has expired. Please request a new one.' });
    }

    console.log(`✅ Reset code verified for user: ${user._id}`);

    // Set new password
    user.password = newPassword; // pre-save hook will hash this
    user.resetPasswordToken = null;
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();

    console.log(`✅ Password reset successfully for user: ${user._id}`);
    res.json({ message: 'Password reset successfully' });

  } catch (err) {
    console.error('❌ Reset password error:', err.message);
    res.status(400).json({ message: err.message });
  }
});


// ── POST /api/auth/test-email ─────────────────────────────────
// Test endpoint to verify email configuration
router.post('/test-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Please provide an email address' });
  }

  try {
    const testCode = 'test-code-12345';
    const result = await sendPasswordResetEmail(email, testCode, 'Test User');
    
    if (result.success) {
      res.json({ 
        success: true,
        message: `✅ Test email sent successfully to ${email}. Check your inbox!` 
      });
    } else {
      res.status(500).json({ 
        success: false,
        message: `❌ Failed to send test email: ${result.message}` 
      });
    }
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: `❌ Error: ${err.message}` 
    });
  }
});

module.exports = router;