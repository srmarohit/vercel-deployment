const express = require("express");
const router = express.Router();

const Order = require("../model/Order");

router.post("/createorder", async (req, res) => {
  // res.send(req.body);

  console.log(req.body);

  //   const order = await Order.create(req.body);

  //   if (!order) {
  //     return res.status(401).send("Something went wrong");
  //     console.log("error");
  //   }

  //   // res.send({order : order, success : "your order is successfully created"});
  //   res
  //     .status(201)
  //     .json({ order: order, success: "your order is successfully created" });
  //   console.log(order);

  // version 2

  const order = await Order.create({
    orderId: req.body.id,
    products: req.body.productsInfo,
    userId: req.body.user_id,
  });

  if (!order) {
    return res.status(401).send("Something went wrong");
    console.log("error");
  }

  // res.send({order : order, success : "your order is successfully created"});
  res
    .status(201)
    .json({ order: order, success: "your order is successfully created" });
  console.log(order);
});

router.get("/getorders", async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    return res.send("no orders found");
  }

  return res.status(200).json({ orders });
});

router.get("/getorder/:orderId", async (req, res) => {
  const orders = await Order.findOne({ orderId: req.params.orderId });
  if (!orders) {
    return res.send("no orders found");
  }

  return res.status(200).json({ orders });
});

router.post("/returnorder/:orderId", async (req, res) => {
  console.log(req.body);
  console.log(req.params);

  const order = await Order.findOne({
    orderId: req.params.orderId,
    productId: [{ productId: req.body.productId }],
  });

  if (!order) {
    return res
      .status(401)
      .json({ error: "your orderId or product does not match" });
  }

  res.send(order);
});

module.exports = router;
