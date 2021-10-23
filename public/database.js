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
      event.reply('connected');
    })
    .catch((err) => {});
});

ipcMain.on('save-order', (event, { collection, data }) => {
  const Orders = mongoose.model(collection, orderSchema);
  const order = new Orders(data);
  order.save().then(() => {
    event.reply('order-saved');
  });
});
/*function connectToDatabase() {
  main()
    .then(() => {
      const Cat = mongoose.model('Cat', { name: String });

      const kitty = new Cat({ name: 'Madman' });
      kitty.save().then(() => console.log('meow'));
    })
    .catch((err) => console.log(err));
}


*/
