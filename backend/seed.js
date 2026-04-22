const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/printing-platform';

const products = [
  // Business Cards
  {
    name: 'Standard Business Cards',
    category: 'Business Cards',
    price: 299,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80',
    customizable: true,
    description: 'Premium matte finish business cards. 350 GSM, UV coated.',
    minQuantity: 100,
  },
  {
    name: 'Premium Glossy Business Cards',
    category: 'Business Cards',
    price: 499,
    image: 'https://images.unsplash.com/photo-1572666341285-c8cb9790d4f0?w=400&q=80',
    customizable: true,
    description: 'High-gloss laminated business cards for a premium look.',
    minQuantity: 100,
  },

  // Brochures
  {
    name: 'Tri-Fold Brochure',
    category: 'Brochures',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80',
    customizable: true,
    description: 'A4 tri-fold brochures, full color printing on both sides.',
    minQuantity: 50,
  },
  {
    name: 'Z-Fold Brochure',
    category: 'Brochures',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&q=80',
    customizable: true,
    description: 'Elegant Z-fold brochures for events and promotions.',
    minQuantity: 50,
  },

  // Banners
  {
    name: 'Vinyl Banner 3x6 ft',
    category: 'Banners',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1608500218905-e1461ea7e1de?w=400&q=80',
    customizable: true,
    description: 'Durable outdoor vinyl banners with grommets.',
    minQuantity: 1,
  },
  {
    name: 'Retractable Roll-Up Banner',
    category: 'Banners',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    customizable: true,
    description: 'Portable retractable banner stand for exhibitions.',
    minQuantity: 1,
  },

  // Flyers
  {
    name: 'A5 Flyer',
    category: 'Flyers',
    price: 799,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&q=80',
    customizable: true,
    description: 'Single-sided A5 flyers, 130 GSM gloss paper.',
    minQuantity: 100,
  },
  {
    name: 'A4 Double-Sided Flyer',
    category: 'Flyers',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80',
    customizable: true,
    description: 'Double-sided A4 flyers for maximum information.',
    minQuantity: 100,
  },

  // Posters
  {
    name: 'A3 Poster',
    category: 'Posters',
    price: 999,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&q=80',
    customizable: true,
    description: 'Vibrant A3 posters on 200 GSM satin paper.',
    minQuantity: 10,
  },
  {
    name: 'A2 Large Format Poster',
    category: 'Posters',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=400&q=80',
    customizable: true,
    description: 'Large A2 posters, perfect for retail and events.',
    minQuantity: 10,
  },

  // Stickers
  {
    name: 'Custom Die-Cut Stickers',
    category: 'Stickers',
    price: 649,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    customizable: true,
    description: 'Waterproof vinyl stickers cut to any shape.',
    minQuantity: 50,
  },
  {
    name: 'Rectangle Label Stickers',
    category: 'Stickers',
    price: 449,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80',
    customizable: true,
    description: 'Self-adhesive rectangle labels for products and packaging.',
    minQuantity: 100,
  },

  // Notebooks
  {
    name: 'Custom Hardcover Notebook',
    category: 'Notebooks',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80',
    customizable: true,
    description: 'A5 hardcover notebooks with custom cover print. 200 pages.',
    minQuantity: 10,
  },
  {
    name: 'Spiral Bound Notepad',
    category: 'Notebooks',
    price: 899,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    customizable: true,
    description: 'Spiral-bound A5 notepads with 100 ruled pages.',
    minQuantity: 25,
  },

  // T-Shirts
  {
    name: 'Custom Printed T-Shirt',
    category: 'T-Shirts',
    price: 599,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    customizable: true,
    description: '100% cotton round-neck T-shirts with full-color print.',
    minQuantity: 10,
  },
  {
    name: 'Polo T-Shirt with Logo',
    category: 'T-Shirts',
    price: 999,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80',
    customizable: true,
    description: 'Corporate polo T-shirts with embroidered or printed logo.',
    minQuantity: 10,
  },

  // Calendars
  {
    name: 'Wall Calendar 2025',
    category: 'Calendars',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80',
    customizable: true,
    description: '12-month wall calendar with custom photos for each month.',
    minQuantity: 5,
  },
  {
    name: 'Desktop Calendar',
    category: 'Calendars',
    price: 799,
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=400&q=80',
    customizable: true,
    description: 'Triangular desktop calendar with 12 custom pages.',
    minQuantity: 5,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products across 8 categories`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
