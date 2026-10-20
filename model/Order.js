const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      required: true,
      type: "String",
      trim: true,
    },

    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        prodNm: {
          type: String,
        },
        price: {
          type: String,
        },
      },
    ],

    userId: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
