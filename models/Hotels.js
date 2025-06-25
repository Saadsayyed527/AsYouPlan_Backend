const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  rating: Number,
  amenities: [String]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;