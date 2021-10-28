export default class IpcService {
  constructor(channel, request) {
    this.channel = channel;
    this.request = request;
  }

  send() {
    window.api.electronIpcSend(this.channel, this.request);

    return new Promise((resolve) => {
      window.api.electronIpcOnce(this.request.responseChannel, (response) => {
        resolve(response);
      });
    });
  }
}
