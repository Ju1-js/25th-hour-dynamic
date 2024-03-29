const rainbowColors = [
  "#bc626b",
  "#cf876f",
  "#eacb8a",
  "#a3bd8d",
  "#88c0cf",
  "#b38ead",
];
const h1Element = document.querySelector("h1");
const h2Element = document.querySelector("h2");
const albumArtElement = document.getElementById("albumart");

const TAU = Math.PI * 2;

let canvas = document.getElementById("canvas");
let max_height, startPos, vizWidth, midY;

let numDots = 128;
let dotSize = 10;
let dotScale = 0.5;
let backgroundColor = "rgb(0,0,0)";
let foregroundColor = "rgb(255,255,255)";
let rainbow = false;

let ctx = canvas.getContext("2d");
let verticalScale = 8;
let sortSoundArray = null;

function calcDotSize() {
  dotSize = dotScale * (canvas.width / numDots);
}

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  max_height = window.innerHeight * 0.5;
  startPos = 0;
  vizWidth = window.innerWidth;
  midY = canvas.height - canvas.height * 0.5;
  calcDotSize();
}

window.onload = setCanvasSize;
window.onresize = setCanvasSize;

function concentratedSort(audioArray) {
  audioArray.sort().splice(0, audioArray.length * 0.75);
  audioArray.push(...[...audioArray].reverse());
  return audioArray;
}

function separatedSort(audioArray) {
  audioArray.sort().splice(0, audioArray.length * 0.75);
  audioArray.reverse().push(...[...audioArray].reverse());
  return audioArray;
}

function centeredSort(audioArray) {
  const newHalf = audioArray.splice(0, audioArray.length * 0.5);
  audioArray.reverse().push(...newHalf);
  return audioArray;
}

function mirror(audioArray) {
  audioArray = audioArray.filter((_, index) => index % 2 === 0);
  return [...audioArray, ...audioArray.reverse()];
}

function reverseMirror(audioArray) {
  audioArray = audioArray.filter((_, index) => index % 2 === 0);
  return [...audioArray.slice().reverse(), ...audioArray];
}

function renderAnimation(audioArray) {
  ctx.fillStyle = foregroundColor;

  for (let x = 0; x < audioArray.length; x++) {
    const soundVal = audioArray[x];
    if (rainbow)
      ctx.fillStyle =
        rainbowColors[x % rainbowColors.length] || foregroundColor;

    for (let y = 0; y < soundVal * verticalScale; y++) {
      const vertIndex = soundVal - y / verticalScale;
      const xPos = (x * canvas.width + canvas.width / 2) / audioArray.length;
      const yPos = y * dotSize * 2;
      const arcRadius = Math.min(vertIndex * dotSize, dotSize);

      ctx.beginPath();
      ctx.arc(xPos, midY - yPos, arcRadius, 0, TAU);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(xPos, midY + yPos, arcRadius, 0, TAU);
      ctx.fill();
    }
  }
}

function livelyAudioListener(audioArray) {
  // If visualizer is hidden, don't bother rendering
  if (visualizer.classList.contains("hide")) return;
  if (sortSoundArray) audioArray = sortSoundArray?.(audioArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderAnimation(audioArray);
}

let defaultAlbumArt = "img/record.gif";
albumArtElement.src = defaultAlbumArt;

function livelyCurrentTrack(data) {
  let obj = JSON.parse(data);
  if (obj != null) {
    visualizer.classList.remove("not-playing");
    visualizer.classList.add("playing");
    h2Element.innerText = obj.AlbumArtist;
    h2Element.innerText = obj.Artist;
    h1Element.innerText = obj.Title;
    if (obj.Thumbnail != null) {
      albumArtElement.src = "data:image/png;base64, " + obj.Thumbnail;
    } else {
      albumArtElement.src = defaultAlbumArt;
    }
  } else {
    visualizer.classList.remove("playing");
    visualizer.classList.add("not-playing");
    h2Element.innerText = "";
    h1Element.innerText = "Waiting for media...";
    albumArtElement.src = defaultAlbumArt;
  }
}
