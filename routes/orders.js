const router = require("express").Router();
const Order = require("../models/order");

router.get("/", (_, res) => {
  Order.find({})
    .then((orders) => {
      res.json({ orders });
    })
    .catch((e) => {
      console.log(e);
      res.json({ orders: [] });
    });
});

router.post("/new", (req, res) => {
  let { products } = req.body;
  console.log(products);
  let total = products.reduce((t, p) => t + p.count * p.priceAtOrderTime, 0);
  Order({
    date: new Date(),
    products,
    total,
  })
    .save()
    .then(() => res.json({ status: true, code: "Order successfuly placed" }))
    .catch((e) => {
      console.log(e);
      return { status: false, code: "somthing went wrong 12410" };
    });
});

module.exports = router;
