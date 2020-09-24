const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-btn");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const timeElapsed = document.querySelector(".time-elapsed");
const timeDuration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-play-btn");
const speed = document.querySelector(".player-speed");

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  modal.classList.replace("hide-modal", "pause-modal");
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    modal.classList.replace("pause-modal", "hide-modal");
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

function displayTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  timeElapsed.textContent = `${displayTime(video.currentTime)} /`;
  timeDuration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //
let lastVolume = 1;

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0.3) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume < 0.3 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-mute");
  }
  lastVolume = volume;
}

function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.setAttribute("title", "Mute");
    if (video.volume > 0.7) {
      volumeIcon.classList.add("fas", "fa-volume-up");
    } else if (video.volume < 0.7 && video.volume > 0.3) {
      volumeIcon.classList.add("fas", "fa-volume-down");
    } else if (video.volume < 0.3 && video.volume > 0) {
      volumeIcon.classList.add("fas", "fa-volume-off");
    }
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

let fullscreen = false;

function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
modal.addEventListener("click", togglePlay);
modalBtn.addEventListener("click", video.play);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
