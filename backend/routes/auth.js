const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register a user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Dummy Credentials for MVP
  if ((email === 'admin@printhub.com' && password === 'admin123') || 
      (email === 'user@printhub.com' && password === 'user123')) {
    const role = email.includes('admin') ? 'admin' : 'user';
    const dummyId = email.includes('admin') ? '000000000000000000000001' : '000000000000000000000002';
    
    const payload = {
      user: {
        id: dummyId,
        role: role
      }
    };

    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: dummyId,
            name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
            email,
            role
          }
        });
      }
    );
  }

  try {
    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/me
// @desc    Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
});

module.exports = router;
