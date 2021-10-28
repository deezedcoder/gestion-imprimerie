export default class IpcService {
  constructor(channel, params) {
    this.channel = channel;
    this.request = {
      responseChannel: this.channel + '-response',
      params,
    };
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
