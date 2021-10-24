const { ipcMain } = require('electron');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
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

ipcMain.on('connect-to-database', (event, databaseName) => {
  mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
      event.returnValue = true;
    })
    .catch((err) => {
      event.returnValue = err;
    });
});

ipcMain.on('save-order', (event, { collection, data }) => {
  const Orders = mongoose.model(collection, orderSchema);
  const order = new Orders(data);
  order
    .save()
    .then(() => {
      event.reply('order-saved');
    })
    .catch((err) => {
      event.reply('save-error', err);
    });
});

ipcMain.on('is-order-available', (event, { collection, orderId }) => {
  const Orders = mongoose.model(collection, orderSchema);

  Orders.exists({ id: orderId }).then((result) => (event.returnValue = result));
});
