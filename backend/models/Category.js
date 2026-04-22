const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  icon: {
    type: String,
    default: '' // Optional emoji or icon string
  },
  image: {
    type: String,
    default: '' // URL for category thumbnail
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
