const player = $("#player")[0];
const controls = $("#controls")[0];
const closeContainer = $("#closecontainer")[0];
const pixelNoise = $(".noise")[0];
const spriteWrap = $(".spriteWrap")[0];
const visualizer = $(".visualizer")[0];
const sysinfo = $(".sysinfo")[0];
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
      player.volume = val / 100;
      break;
    case "247-sprites":
      spriteWrap.classList.toggle("spriteWrap-animation", !val);
      break;
    case "controls-visible":
      controls.classList.toggle("hide", !val);
      closeContainer.classList.toggle("hide", !val);
      break;
    case "controls-location":
      switch (val) {
        case 0:
          controls.classList.add("left");
          closeContainer.classList.add("L");
          controls.classList.remove("right");
          closeContainer.classList.remove("R");
          break;
        case 1:
          controls.classList.add("right");
          closeContainer.classList.add("R");
          controls.classList.remove("left");
          closeContainer.classList.remove("L");
          break;

        default:
          console.error(`Unknown settings location option: ${val}`);
          break;
      }
      break;
    case "pixel-noise":
      pixelNoise.classList.toggle("hide", !val);
      break;
    case "visualizer-toggle":
      visualizer.classList.toggle("hide", !val);
      break;
    case "show-when-not-playing":
      visualizer.classList.toggle("show-when-not-playing", !val);
      break;
    case "visualizer-dots": {
      numDots = val;
      calcDotSize();
      break;
    }
    case "sorting-mode":
      switch (val) {
        case 0:
          sortSoundArray = concentratedSort;
          break;
        case 1:
          sortSoundArray = separatedSort;
          break;
        case 2:
          sortSoundArray = centeredSort;
          break;
        case 3:
          sortSoundArray = mirror;
          break;
        case 4:
          sortSoundArray = reverseMirror;
          break;
        default:
          sortSoundArray = null;
          break;
      }
      break;
    case "vertical-scale":
      verticalScale = val;
      break;
    case "dot-scale":
      dotScale = val;
      calcDotSize();
      break;
    case "y-offset":
      document.documentElement.style.setProperty("--y-offset", val + "%");
      break;
    case "sys-y-offset":
      document.documentElement.style.setProperty(
        "--sysinfo-y-offset",
        val + "%"
      );
      break;
    case "sysinfo-toggle":
      sysinfo.classList.toggle("hide", !val);
      break;
    case "sysinfo-cpu-toggle":
      sysinfo.children[0].classList.toggle("hide", !val);
      break;
    case "sysinfo-ram-toggle":
      sysinfo.children[1].classList.toggle("hide", !val);
      break;
    case "sysinfo-gpu-toggle":
      sysinfo.children[2].classList.toggle("hide", !val);
      break;
    case "sysinfo-location":
      switch (val) {
        case 0:
          sysinfo.classList.add("left");
          sysinfo.classList.remove("right");
          break;
        case 1:
          sysinfo.classList.add("right");
          sysinfo.classList.remove("left");
          break;
      }
      break;
    case "sysinfo-duration":
      animationDuration = val * 1000;
      break;
    default:
      console.error(`Unknown customization option: ${name}`);
      break;
  }
}
// log("Settings Loaded");
