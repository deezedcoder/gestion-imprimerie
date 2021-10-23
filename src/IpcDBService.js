export default class IpcDBService {
  constructor({ databaseName }) {
    this.dbName = databaseName;
  }

  connect() {
    window.api.electronIpcSend('connect-to-database', this.dbName);
  }

  save({ collection, data }) {
    window.api.electronIpcSend('save-order', { collection, data });
  }
}
