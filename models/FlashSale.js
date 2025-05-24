const mongoose = require('mongoose');

const flashSaleSchema = new mongoose.Schema({
  store: String,
  seller: String,
  productId: String,
  discount: Number, // e.g. 20 (%)
  startTime: Date,
  endTime: Date,
  isActive: { type: Boolean, default: false },
});

module.exports = mongoose.model('FlashSale', flashSaleSchema);
