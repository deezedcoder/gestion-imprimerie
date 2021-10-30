export default class IpcService {
  constructor(channel, data) {
    this.channel = channel;
    this.request = {
      responseChannel: channel,
      data,
    };
  }

  send() {
    window.api.ipcRendererSend(this.channel, this.request);

    return new Promise((resolve, reject) => {
      window.api.ipcRendererOnce(
        this.request.responseChannel,
        (ipcMainResponse) => {
          if (ipcMainResponse.hasOwnProperty('error'))
            reject(ipcMainResponse.error);
          resolve(ipcMainResponse);
        }
      );
    });
  }
}
