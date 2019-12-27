const electron = require("electron");
const { ipcRenderer } = electron;

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();

  const { path } = document.getElementById("filePicker").files[0];

  ipcRenderer.send("video:submit", path);
});

ipcRenderer.on("video:duration", (event, duration) => {
  document.getElementById(
    "videoDuration"
  ).innerHTML = `Video is ${duration} seconds long.`;
});
