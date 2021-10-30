require('dotenv').config();

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const { DBSTATUS } = require('../src/shared/constants/dbstatus');
const mongoose = require('mongoose');
const SystemInfoChannel = require('./channels/SystemInfoChannel');
const DbConnectChannel = require('./channels/DbConnectChannel');

let mainWindow;

// Create the native browser window.
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1020,
    height: 720,
    webPreferences: {
      // Set the path of an additional "preload" script that can be used to
      // communicate between node-land and browser-land.
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  mainWindow.loadURL(
    isDev
      ? process.env.WINDOW_LOAD_URL_DEV
      : `file://${path.join(__dirname, process.env.WINDOW_LOAD_URl_PROD)}`
  );

  mainWindow.on('closed', () => (mainWindow = null));

  // hide menu bar
  mainWindow.setMenuBarVisibility(false);

  // * Development options
  if (isDev) {
    mainWindow.webContents.openDevTools();
    mainWindow.autoHideMenuBar = true;
    // prints the operations mongoose sends to MongoDB to the console
    mongoose.set('debug', true);
  }
}

function addIpcListeners(channels) {
  channels.forEach((channel) =>
    ipcMain.on(channel.getName(), (event, request) =>
      channel.handle(event, request)
    )
  );
}

app.on('ready', () => {
  createWindow();
  addIpcListeners([new SystemInfoChannel(), new DbConnectChannel(mongoose)]);

  // TODO Refactor code
  mainWindow.webContents.on('dom-ready', () => {
    mongoose.connection.on('error', (err) => {
      mainWindow.webContents.send('connection-status', DBSTATUS.CONNECT_ERR);
    });

    mongoose.connection.on('connecting', () => {
      console.log('main: connecting');
      mainWindow.webContents.send('connection-status', DBSTATUS.CONNECTING);
    });

    mongoose.connection.on('connected', () => {
      console.log('main: connected');
      mainWindow.webContents.send('connection-status', DBSTATUS.CONNECTED);
    });

    mongoose.connection.on('disconnected', () => {
      mainWindow.webContents.send('connection-status', DBSTATUS.DISCONNECTED);
    });

    mongoose.connection.on('reconnectFailed', () => {
      mainWindow.webContents.send('connection-status', DBSTATUS.CONNECT_ERR);
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  mongoose.connection.close();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
