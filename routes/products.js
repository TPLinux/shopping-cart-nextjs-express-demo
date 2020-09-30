const router = require("express").Router();
const Product = require("../models/product");

router.get("/", (_, res) => {
  Product.find({})
    .then((products) => {
      res.json({ products });
    })
    .catch((e) => {
      console.log(e);
      res.json({ products: [] });
    });
});

module.exports = router;
