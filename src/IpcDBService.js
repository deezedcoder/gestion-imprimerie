export default class IpcDBService {
  constructor({ databaseName }) {
    this.dbName = databaseName;
  }

  connect() {
    return window.api.electronIpcSendSync('connect-to-database', this.dbName);
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
