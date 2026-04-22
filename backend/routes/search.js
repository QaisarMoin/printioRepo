const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// @route   GET api/search
// @desc    Search for categories and products
router.get('/', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json({ categories: [], products: [] });
    }

    const regex = new RegExp(query, 'i');

    // Search categories
    const categories = await Category.find({
      name: regex
    }).limit(5);

    // Search products
    const products = await Product.find({
      $or: [
        { name: regex },
        { description: regex }
      ]
    }).limit(10);

    res.json({
      categories,
      products
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
