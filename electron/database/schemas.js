const mongoose = require('mongoose');
const { Schema } = mongoose;

exports.orderSchema = new Schema({
  id: String,
  date: String,
  customer: {
    id: String,
    name: String,
  },
  amount: String,
  items: [
    {
      reference: String,
      price: String,
      quantity: String,
      comment: String,
      served: [{ quantity: String, date: String }],
    },
  ],
  status: String,
});
