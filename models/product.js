const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  imgUrl: String,
  category: String,
  price: Number,
  availableQuantities: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
