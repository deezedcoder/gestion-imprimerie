require('dotenv').config();

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const mongoose = require('mongoose');
const AppInitChannel = require('./channels/AppInitChannel');
const DatabaseChannel = require('./channels/DatabaseChannel');

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
  // mainWindow.setMenuBarVisibility(false);

  if (isDev) {
    // * In Development MODE
    mainWindow.loadURL(process.env.DEV_WINDOW_LOAD_URL);
    // mainWindow.webContents.openDevTools();
    // mainWindow.autoHideMenuBar = true;
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

  [
    new AppInitChannel(mongoose, mainWindow),
    new DatabaseChannel(mongoose),
  ].forEach((channel) =>
    ipcMain.on(channel.getName(), (event, request) =>
      channel.handle(event, request)
    )
  );
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
