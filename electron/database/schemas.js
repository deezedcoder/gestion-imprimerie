const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = mongoose.Schema({
  id: String,
  name: String,
});

const ServedSchema = mongoose.Schema({
  quantity: String,
  date: String,
});

const ItemsSchema = mongoose.Schema({
  reference: String,
  price: String,
  quantity: String,
  comment: String,
  served: [ServedSchema],
});

exports.orderSchema = new Schema({
  id: String,
  date: String,
  customer: CustomerSchema,
  amount: String,
  items: [ItemsSchema],
  status: String,
});
