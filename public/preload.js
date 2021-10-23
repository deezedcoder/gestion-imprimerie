// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// whitelist channels
const validToMain = ['connect-to-database', 'save-order'];
const validToRender = ['connection-error'];

process.once('loaded', () => {
  // Expose database API to the main window.
  // They'll be accessible at "window.electron".
  contextBridge.exposeInMainWorld('api', {
    electronIpcSend: (channel, data) => {
      if (validToMain.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      if (validToRender.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  });
});
