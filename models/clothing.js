const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
});

const Clothing = mongoose.model('Clothing', clothingtSchema);
const Clothing = require('./models/clothing.js');
module.exports = clothing;