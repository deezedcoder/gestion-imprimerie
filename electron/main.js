require('dotenv').config();

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const { DBSTATUS } = require('../src/shared/constants/dbstatus');
const mongoose = require('mongoose');
const SystemInfoChannel = require('./channels/SystemInfoChannel');
const DbConnectChannel = require('./channels/DbConnectChannel');

let mainWindow;

function createWindow() {
  // Create the native browser window.
  mainWindow = new BrowserWindow({
    width: 1020,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // hide menu bar
  mainWindow.setMenuBarVisibility(false);

  if (isDev) {
    // * In Development MODE
    mainWindow.loadURL(process.env.DEV_WINDOW_LOAD_URL);
    mainWindow.webContents.openDevTools();
    mainWindow.autoHideMenuBar = true;
    // print the operations mongoose sends to MongoDB to the console
    mongoose.set('debug', true);
  } else {
    // * In Production Mode
    mainWindow.loadFile(
      path.join(__dirname, process.env.PROD_WINDOW_LOAD_FILE)
    );
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // TODO encapsulate code below

  function addIpcListeners(channels) {
    channels.forEach((channel) =>
      ipcMain.on(channel.getName(), (event, request) =>
        channel.handle(event, request)
      )
    );
  }

  addIpcListeners([new SystemInfoChannel(), new DbConnectChannel(mongoose)]);

  mainWindow.webContents.on('dom-ready', () => {
    mongoose.connection.on('error', (err) => {
      mainWindow.webContents.send('connection-status', DBSTATUS.CONNECT_ERR);
    });

    mongoose.connection.on('connecting', () => {
      mainWindow.webContents.send('connection-status', DBSTATUS.CONNECTING);
    });

    mongoose.connection.on('connected', () => {
      mainWindow.webContents.send('connection-status', DBSTATUS.CONNECTED);
    });

    mongoose.connection.on('disconnected', () => {
      mainWindow.webContents.send('connection-status', DBSTATUS.DISCONNECTED);
    });

    mongoose.connection.on('reconnectFailed', () => {
      mainWindow.webContents.send('connection-status', DBSTATUS.CONNECT_ERR);
    });
  });
  // TODO ---------------------------
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  mongoose.connection.close();
});
