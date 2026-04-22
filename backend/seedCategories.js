require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

const MONGO_URI = process.env.MONGODB_URI;

const initialCategories = [
  "Business Cards",
  "Brochures",
  "Banners",
  "Flyers",
  "Posters",
  "Stickers",
  "Notebooks",
  "T-Shirts",
  "qaisar"
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Category.deleteMany({});
    
    // Insert new
    const docs = initialCategories.map(name => ({ name }));
    await Category.insertMany(docs);

    console.log('Seed successful!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
