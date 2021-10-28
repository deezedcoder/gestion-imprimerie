const { execSync } = require('child_process');

class SystemInfoChannel {
  getName() {
    return 'system-info';
  }

  handle(event, request) {
    /*if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}-response`;
    }*/
    event.sender.send(request.responseChannel, {
      kernel: execSync('uname -a').toString(),
    });
  }
}

module.exports = SystemInfoChannel;
