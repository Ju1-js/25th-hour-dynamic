const player = $("#player")[0];
const controls = $("#controls")[0];
const Closecontainer = $("#closecontainer")[0];
const pixelNoise = $(".noise")[0];
const spriteWrap = $(".spriteWrap")[0];
var offset = 0;
var volume = 0.25;
// const debug = $("#debug")[0];

/* function log(message) {
  debug.textContent += message + "\n";
}

function clearLog() {
  debug.textContent = "";
} */

// function livelyAudioListener(audioArray) {}

// log("Starting...");
function livelyPropertyListener(name, val) {
  // log(`Name: ${name} Val: ${val}`);
  switch (name) {
    case "tree-animation-play":
      switch (val) {
        case true:
          $("#landscape .layer11").css(
            "animation",
            "treesway 60s linear 2s infinite, treecolor 86400s linear 2s infinite"
          );
          setCorrectTime();
          break;
        case false:
          $("#landscape .layer11").css(
            "animation",
            "treecolor 86400s linear 2s infinite"
          );
          setCorrectTime();
          break;

        default:
          console.error(`Unknown animation playback option: ${val}`);
          break;
      }
      break;
    case "offset":
      offset = val / 2;
      setCorrectTime();
      break;
    case "audio-play":
      // log(val);
      switch (val) {
        case true:
          player.autoplay = true;
          player.play();
          videojs("player").muted(false);
          break;
        case false:
          player.autoplay = false;
          player.pause();
          videojs("player").muted(true);
          break;

        default:
          console.error(`Unknown audio playback option: ${val}`);
          break;
      }
      break;
    case "audio-volume":
      // log(val / 100);
      player.volume = val / 100;
      break;
    case "247-sprites":
      spriteWrap.classList.toggle("spriteWrap-animation", !val);
      break;
    case "controls-visible":
      controls.classList.toggle("hide", !val);
      Closecontainer.classList.toggle("hide", !val);
      // log(`Visible: ${val} | ${controls.classList}`);
      break;
    case "controls-location":
      // log(val);
      switch (val) {
        case 0:
          controls.classList.add("left");
          Closecontainer.classList.add("L");
          controls.classList.remove("right");
          Closecontainer.classList.remove("R");
          break;
        case 1:
          controls.classList.add("right");
          Closecontainer.classList.add("R");
          controls.classList.remove("left");
          Closecontainer.classList.remove("L");
          break;

        default:
          console.error(`Unknown settings location option: ${val}`);
          break;
      }
      break;
    case "pixel-noise":
      pixelNoise.classList.toggle("hide", !val);
      break;

    default:
      console.error(`Unknown customization option: ${name}`);
      break;
  }
}
// log("Settings Loaded");
