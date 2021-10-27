export default class IpcDBService {
  constructor({ databaseName }) {
    this.dbName = databaseName;
    /*window.api.electronIpcOn('connected', (event, ...args) => {
      console.log(event);
    });*/
  }

  /*async connect() {
    let promise = new Promise((resolve, reject) => {
      window.api.electronIpcOn('connect-to-database', (success, err) => {
        if (success) resolve();
        else reject(err);
      });
    });

    window.api.electronIpcSend('connect-to-database', this.dbName);

    return await promise; // wait until the promise resolves
  }*/

  async connect() {
    return await window.api.electronIpcInvoke('connectTo', this.dbName);
  }

  save({ collection, order }) {
    window.api.electronIpcSend('save-order', { collection, order });
  }

  exists({ collection, orderId }) {
    return window.api.electronIpcSendSync('is-order-available', {
      collection,
      orderId,
    });
  }
}
