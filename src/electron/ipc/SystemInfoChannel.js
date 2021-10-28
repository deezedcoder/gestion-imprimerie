const { execSync } = require('child_process');

class SystemInfoChannel {
  getName() {
    return 'system-info';
  }

  handle(event, request) {
    event.sender.send(request.responseChannel, execSync('uname -a').toString());
  }
}

module.exports = SystemInfoChannel;
