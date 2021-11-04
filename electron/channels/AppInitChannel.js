const { CHANNELS } = require('../../src/shared/constants/channels');
const { orderSchema } = require('../database/schemas');

// * Connection status mapped to db icon intent
const DBSTATUS = {
  CONNECTING: 'warning',
  CONNECTED: 'success',
  DISCONNECTED: 'primary',
  CONNECT_ERR: 'danger',
};

const readyStates = {
  0: DBSTATUS.DISCONNECTED,
  1: DBSTATUS.CONNECTED,
  2: DBSTATUS.CONNECTING,
  3: DBSTATUS.DISCONNECTED, // disconnecting: send same status as disconnected
  4: DBSTATUS.CONNECT_ERR, // invalid credentials: send as error
};

const events = [
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
    this.appState = {};
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
        events.forEach((event) => {
          db.connection.on(event.name, (err) => {
            win.webContents.send(CHANNELS.DB_CONNECT_STATUS, event.response);
          });
        });

        const appState = {
          dbInitialStatus: readyStates[this.dbDriver.connection.readyState],
        };

        return appState;
      })
      .then(async (appState) => {
        // * Get data from database
        const Order = db.model('Commandes', orderSchema);
        const orders = await Order.find({});
        console.log(orders);
        const initState = { appState, orders };
        return initState;
      })
      .then((initState) => {
        // * send initial state and data
        event.sender.send(request.responseChannel, initState);
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
