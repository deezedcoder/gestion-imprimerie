const { CHANNELS } = require('../../src/shared/constants/channels');

class DbConnectChannel {
  constructor(dbDriver) {
    this.dbDriver = dbDriver;
  }

  getName() {
    return CHANNELS.DB_CONNECT;
  }

  handle(event, request) {
    this.dbDriver
      .connect(process.env.DB_HOST, {
        dbName: process.env.DB_NAME,
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => {
        event.sender.send(request.responseChannel, {
          response: 'Init connection...',
        });
      })
      .catch((error) => {
        event.sender.send(request.responseChannel, { error });
      });
  }
}

module.exports = DbConnectChannel;
