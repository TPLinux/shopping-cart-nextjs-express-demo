const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  date: Date,
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      count: Number,
      priceAtOrderTime: Number,
    },
  ],
  total: Number,
});

module.exports = mongoose.model("Order", OrderSchema);
