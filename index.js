const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/client/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    if (err) {
      return console.error("Some error occurred with ffmpeg");
    }
    const duration = metadata.format.duration;
    mainWindow.webContents.send("video:duration", duration);
  });
});
