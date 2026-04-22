const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, admin } = require('../middleware/authMiddleware');

// POST /api/orders — create a new order (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const { products, userDetails, totalPrice } = req.body;

    // Basic validation
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: 'No products in order' });
    }
    if (!userDetails || !userDetails.name || !userDetails.phone || !userDetails.address) {
      return res.status(400).json({ success: false, message: 'User details are incomplete' });
    }
    if (!/^\d{10}$/.test(userDetails.phone)) {
      return res.status(400).json({ success: false, message: 'Phone must be 10 digits' });
    }
    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid total price' });
    }

    const order = new Order({ 
      products, 
      userDetails, 
      totalPrice,
      userId: req.user.id 
    });
    const savedOrder = await order.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders — fetch all orders (Admin Only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/:id — fetch single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
