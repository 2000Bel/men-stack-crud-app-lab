const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
});

const clothing = mongoose.model('clothing', clothingSchema);
//const clothing = require('./models/clothing.js');
module.exports = clothing;