const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
require('dotenv').config();
const { connect } = require('./database');

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

  // Display menu bar only in development mode
  mainWindow.setMenuBarVisibility(isDev);

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  console.log(path.join(__dirname), '');
  mainWindow.loadURL(
    isDev
      ? process.env.WINDOW_LOAD_URL_DEV
      : `file://${path.join(__dirname, process.env.WINDOW_LOAD_URl_PROD)}`
  );

  mainWindow.on('closed', () => (mainWindow = null));
  if (isDev) mainWindow.webContents.openDevTools();
}

app.on('ready', () => {
  createWindow();
  connect('mongodb://localhost:27017/', 'gesimp');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
