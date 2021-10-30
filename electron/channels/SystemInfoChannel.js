const { execSync } = require('child_process');
const { CHANNELS } = require('../../src/shared/constants/channels');

class SystemInfoChannel {
  getName() {
    return CHANNELS.SYSTEM_INFO;
  }

  handle(event, request) {
    event.sender.send(request.responseChannel, execSync('uname -a').toString());
  }
}

module.exports = SystemInfoChannel;
