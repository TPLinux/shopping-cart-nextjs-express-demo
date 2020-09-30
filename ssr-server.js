const express = require("express");
const next = require("next");
require("./config/db");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api/products", require("./routes/products"));
server.use("/api/orders", require("./routes/orders"));

app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    // listen
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Listening on localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
