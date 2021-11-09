const { CHANNELS } = require('../../src/shared/constants/channels');
const { orderSchema } = require('../database/schemas');
const parseOrders = require('../helpers/parseOrders');

// * Connection status mapped to db icon color (@mui)
const DBSTATUS = {
  CONNECTING: 'warning',
  CONNECTED: 'success',
  DISCONNECTED: 'primary', //'disabled',
  CONNECT_ERR: 'danger', // 'error',
};

const readyStates = {
  0: DBSTATUS.DISCONNECTED,
  1: DBSTATUS.CONNECTED,
  2: DBSTATUS.CONNECTING,
  3: DBSTATUS.DISCONNECTED, // disconnecting: send same status as disconnected
  4: DBSTATUS.CONNECT_ERR, // invalid credentials: send as error
};

const connectionEvents = [
  { name: 'error', response: DBSTATUS.CONNECT_ERR },
  { name: 'connecting', response: DBSTATUS.CONNECTING },
  { name: 'connected', response: DBSTATUS.CONNECTED },
  { name: 'disconnected', response: DBSTATUS.DISCONNECTED },
  { name: 'reconnectFailed', response: DBSTATUS.CONNECT_ERR },
];

class AppInitChannel {
  constructor(dbDriver, mainWindow) {
    this.dbDriver = dbDriver;
    this.mainWindow = mainWindow;
    this.appState = {
      pdfFilePath: 'commande/bsm.pdf', // TODO will be added as a config option later
    };
  }

  getName() {
    return CHANNELS.APP_INIT;
  }

  handle(event, request) {
    const db = this.dbDriver;
    const win = this.mainWindow;

    db.connect(process.env.DB_HOST, {
      // * Connect to database
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 5000, // Delete for production
    })
      .then(() => {
        // TODO handle connection error after initial connection
        // * Add connection status event listeners
        connectionEvents.forEach((connectionEvent) => {
          db.connection.on(connectionEvent.name, (err) => {
            win.webContents.send(CHANNELS.DB_CONNECT_STATUS, event.response);
          });
        });

        this.appState = {
          ...this.appState,
          dbInitialStatus: readyStates[this.dbDriver.connection.readyState],
        };
      })
      .then(async () => {
        // * Get data from database
        // TODO add try catch to handle database read errors
        const Order = db.model('Commandes', orderSchema);
        const orders = await Order.find({});
        return parseOrders(orders);
      })
      .then((orders) => {
        // * send initial state and data
        event.sender.send(request.responseChannel, {
          appState: this.appState,
          orders,
        });
      })
      .catch((err) => {
        // TODO : Handle connection errors
        // TODO : Handle database read errors
        event.sender.send(request.responseChannel, {
          error: {
            flag: true,
            icon: 'data-connection',
            title: 'Impossible de se connecter à la base de données',
            description: err.toString(),
          },
        });
      });
  }
}

module.exports = AppInitChannel;
