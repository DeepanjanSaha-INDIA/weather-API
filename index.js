const electron = require('electron');
const path = require('path');
const url = require('url');

const {app,BrowserWindow} = electron;
let mainWindow;
app.on('ready',() => {
    mainWindow = new BrowserWindow({width: 1100, height: 800, webPreferences: {
        nodeIntegration: true
    }, icon:'main_icon.ico'});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'getLocation.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.setMenu(null);
    // mainWindow.loadFile('getLocation.html')

    mainWindow.on('closed', function () {
        mainWindow = null;
        app.quit();
    });
});
