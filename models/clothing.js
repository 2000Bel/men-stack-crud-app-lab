const mongoose = require('mongoose');

const clothingtSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
});

const clothing = mongoose.model('clothing', clothingtSchema);

module.exports = clothing;