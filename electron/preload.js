// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
process.once('loaded', () => {
  // * ipcRenderer senders: send, invoke, sendSync, postMessage, sendTo, sendToHost
  // * Senders ex: ipcRenderer.invoke(channel, data);
  // * ipcRenderer listeners : on, once, removeListener, removeAllListeners
  // * listeners ex: ipcRenderer.on(channel, (event, ...args) => func(...args));

  const { contextBridge, ipcRenderer } = require('electron');
  // Expose database API to the main window.
  // They'll be accessible at "window.api".
  contextBridge.exposeInMainWorld('api', {
    ipcRendererSend: (channel, request) => {
      ipcRenderer.send(channel, request);
    },

    ipcRendererOnce: (channel, callBack) => {
      ipcRenderer.once(channel, (event, ...args) => callBack(...args));
    },

    ipcRendererOn: (channel, callBack) => {
      ipcRenderer.on(channel, (event, ...args) => callBack(...args));
    },
    ipcRendererRemoveListener: (channel, callBack) => {
      ipcRenderer.removeListener(channel, (event, ...args) =>
        callBack(...args)
      );
    },
  });
});
