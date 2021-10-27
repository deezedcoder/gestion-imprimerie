// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// whitelist channels
const validChannels = [
  'connectTo',
  'connection-test',
  'connection',
  'connect',
  'connected',
  'connection-error',
  'order-saved',
  'save-error',
  'res:is-order-available',
];

process.once('loaded', () => {
  // Expose database API to the main window.
  // They'll be accessible at "window.electron".
  contextBridge.exposeInMainWorld('api', {
    electronIpcInvoke: (channel, data) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.invoke(channel, data);
      }
    },

    electronIpcSendSync: (channel, data) => {
      if (validChannels.includes(channel)) {
        const response = ipcRenderer.sendSync(channel, data);

        return response;
      }
    },

    electronIpcSend: (channel, data) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },

    electronIpcOn: (channel, func) => {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  });
});
