// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

process.once('loaded', () => {
  // Expose database API to the main window.
  // They'll be accessible at "window.electron".
  contextBridge.exposeInMainWorld('api', {
    electronIpcInvoke: (channel, data) => {
      ipcRenderer.invoke(channel, data);
    },

    electronIpcSendSync: (channel, data) => {
      ipcRenderer.sendSync(channel, data);
    },

    electronIpcSend: (channel, data) => {
      ipcRenderer.send(channel, data);
    },

    electronIpcOn: (channel, func) => {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
  });
});
