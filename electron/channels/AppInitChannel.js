const { CHANNELS } = require('../../src/shared/constants/channels');
const { orderSchema } = require('../database/schemas');
const parseOrders = require('../helpers/parseOrders');
const {
  DBSTATUS_INTENT,
} = require('../../src/shared/constants/dbstatusIntents');

const readyStates = {
  0: DBSTATUS_INTENT.DISCONNECTED,
  1: DBSTATUS_INTENT.CONNECTED,
  2: DBSTATUS_INTENT.CONNECTING,
  3: DBSTATUS_INTENT.DISCONNECTED, // disconnecting: send same status as disconnected
  4: DBSTATUS_INTENT.CONNECT_ERR, // invalid credentials: send as error
};

const connectionEvents = [
  { name: 'error', response: DBSTATUS_INTENT.CONNECT_ERR },
  { name: 'connecting', response: DBSTATUS_INTENT.CONNECTING },
  { name: 'connected', response: DBSTATUS_INTENT.CONNECTED },
  { name: 'disconnected', response: DBSTATUS_INTENT.DISCONNECTED },
  { name: 'reconnectFailed', response: DBSTATUS_INTENT.CONNECT_ERR },
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
            win.webContents.send(
              CHANNELS.DB_CONNECT_STATUS,
              connectionEvent.response
            );
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
