const mongoose = require("mongoose");
const Product = require("../models/product");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/gebhaly", {
    dbName: "gebhaly",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

// create demo products
let demoProducts = [
  {
    name: "AppleProduct",
    category: "tech",
    price: 1000,
    availableQuantities: 5,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSg3U993sxRGt2d6_juqnuYIGSB2FOCH-afjw&usqp=CAU",
  },
  {
    name: "LenovoProduct",
    category: "tech",
    price: 800,
    availableQuantities: 12,
    imgUrl:
      "https://www.lenovo.com/medias/lenovo-yoga-c940-14-front.png?context=bWFzdGVyfHJvb3R8NzU1NjR8aW1hZ2UvcG5nfGhkNC9oYTEvMTA1OTA5NTE0NzMxODIucG5nfGU2ODVkYzUyY2NlZjEzMmE4Mzk1Y2M4MjcwZTFjZDY4NmNkYTM3MzdhODE0YjIyZjE5OGE2YzM2NzM3ZmM5NTE",
  },
  {
    name: "T-shirt",
    category: "fashion",
    price: 100,
    availableQuantities: 40,
    imgUrl:
      "https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg",
  },
  {
    name: "CarProduct",
    category: "cars",
    price: 120000,
    availableQuantities: 2,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQyaJYapb3cOl4wL-uzJxAzbxN4S3QabAyM-g&usqp=CAU",
  },
];

demoProducts.forEach((p) => {
  Product.findOneAndUpdate(
    { name: p.name },
    p,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    },
    (d) => console.log(`${p.name} added. ${d}`)
  );
});
