const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = mongoose.Schema({
  id: String,
  name: String,
});

const ServedSchema = mongoose.Schema({
  quantity: Number,
  date: Date,
});

const ItemsSchema = mongoose.Schema({
  reference: String,
  price: Number,
  quantity: Number,
  comment: String,
  served: [ServedSchema],
});

exports.orderSchema = new Schema({
  id: Number,
  date: String,
  customer: CustomerSchema,
  amount: Number,
  items: [ItemsSchema],
  status: String,
});
