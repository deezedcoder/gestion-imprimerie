// TODO implement this channel
const { CHANNELS } = require('../../src/shared/constants/channels');
const { DBSTATUS } = require('../../src/shared/constants/dbstatus');

const states = {
  0: DBSTATUS.DISCONNECTED,
  1: DBSTATUS.CONNECTED,
  2: DBSTATUS.CONNECTING,
  3: DBSTATUS.DISCONNECTED, // disconnecting: send same status as disconnected
  4: DBSTATUS.CONNECT_ERR, // invalid credentials: send as error
};

class AppInitChannel {
  constructor(dbDriver, mainWindow) {
    this.dbDriver = dbDriver;
    this.mainWindow = mainWindow;
  }

  getName() {
    return CHANNELS.APP_INIT;
  }

  handle(event, request) {
    const db = this.dbDriver;
    const win = this.mainWindow;

    db.connect(process.env.DB_HOST, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 5000, // Delete for production
    })
      .then(() => {
        db.connection.on('error', (err) => {
          win.webContents.send(
            CHANNELS.DB_CONNECT_STATUS,
            DBSTATUS.CONNECT_ERR
          );
        });

        db.connection.on('connecting', () => {
          win.webContents.send(CHANNELS.DB_CONNECT_STATUS, DBSTATUS.CONNECTING);
        });

        db.connection.on('connected', () => {
          win.webContents.send(CHANNELS.DB_CONNECT_STATUS, DBSTATUS.CONNECTED);
        });

        db.connection.on('disconnected', () => {
          win.webContents.send(
            CHANNELS.DB_CONNECT_STATUS,
            DBSTATUS.DISCONNECTED
          );
        });

        db.connection.on('reconnectFailed', () => {
          win.webContents.send(
            CHANNELS.DB_CONNECT_STATUS,
            DBSTATUS.CONNECT_ERR
          );
        });

        // ? Success
        const appState = {
          dbStatus: states[this.dbDriver.connection.readyState],
        };

        event.sender.send(request.responseChannel, { appState });
      })
      .catch((err) => {
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
