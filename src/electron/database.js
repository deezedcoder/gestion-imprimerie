const { ipcMain } = require('electron');
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports.connect = (dbHost, dbName) => {
  mongoose.connect(dbHost + dbName);
};

/*const orderSchema = new Schema({
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

ipcMain.handle('connectTo', async (event, databaseName) => {
  const result = await mongoose.connect(
    `mongodb://localhost:27017/${databaseName}`
  );
  return result.connections;
});

/*ipcMain.on('connect-to-database', (event, databaseName) => {
  mongoose
    .connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
      event.reply('connect-to-database', true);
    })
    .catch((err) => {
      event.reply('connect-to-database', false, err);
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

*/
