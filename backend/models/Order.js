const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  customText: { type: String, default: '' },
  customImage: { type: String, default: '' },
});

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: {
      type: [OrderItemSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'Order must contain at least one product',
      },
    },
    userDetails: {
      name: { type: String, required: [true, 'Name is required'], trim: true },
      phone: {
        type: String,
        required: [true, 'Phone is required'],
        match: [/^\d{10}$/, 'Phone must be 10 digits'],
      },
      address: { type: String, required: [true, 'Address is required'], trim: true },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price cannot be negative'],
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
