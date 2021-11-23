const { CHANNELS } = require('../../src/shared/constants/channels');

class AppInitChannel {
  constructor() {
    // TODO preferences will be loaded later using a config system or db
    this.params = {
      isSidebarOpened: false,
    };

    this.settings = {
      pdfFilePath: 'commande/bsm.pdf',
    };
  }

  getName() {
    return CHANNELS.APP_INIT;
  }

  handle(event, request) {
    // * send settings and initial state
    event.sender.send(request.responseChannel, {
      params: this.params,
      settings: this.settings,
    });
  }
}

module.exports = AppInitChannel;
