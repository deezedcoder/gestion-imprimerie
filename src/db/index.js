import Dexie from 'dexie';

const db = new Dexie(process.env.DB_NAME);

db.version(1).stores({
  orders: 'id, date, customer, amount, status', // Primary key and indexed props
  items: '++id, orderId, reference, price, quantity',
});

export default db;

/* db schema
orderSchema {
  id(Key): Number,
  date: Date,
  customer: {
    id: String,
    name: String,
  },
  amount: Number,
  status: String,
};

itemsSchema {
  orderId: Number,
  reference: String,
  price: Number,
  quantity: Number,
  comment: String,
  served: [ServedSchema],
};

ServedSchema {
  quantity: Number,
  date: Date,
};
*/
