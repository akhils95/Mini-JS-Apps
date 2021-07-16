const appInfo = [
  ["Tic Tac Toe", "TicTacToe"],
  ["Snake Game", "SnakeGame"],
  ["Pong Game", "PongGame"],
  ["Math Sprint Game", "MathSprintGame"],
  ["Calculator", "Calculator"],
  ["Paint Canvas", "PaintCanvas"],
  ["Maze Game", "MazeGame"],
  ["Stone Paper Scissors Lizard Spock - Game", "BigBangTheoryGame"],
  ["Pushups Recorder", "PushupsRecorder"],
  ["Code Editor", "CodeEditor"],
  ["Weather App", "WeatherApp"],
  ["Notes", "Notes"],
  ["Utility Calculator", "UtilityCalculator"],
  ["Light / Dark Mode", "LightModeDarkMode"],
  ["Custom Countdown", "CustomCountdown"],
  ["Bookmarks", "Bookmarks"],
  ["Markdown Editor", "MarkdownEditor"],
  ["Animated Landing Page", "AnimatedLandingPage"],
  ["Animated Navigation", "AnimatedNavigation"],
  ["Quote Generator", "QuoteGenerator"],
  ["Infinte Scroll", "InfiniteScroll"],
  ["Picture In Picture", "PictureInPicture"],
  ["Music Player", "MusicPlayer"],
  ["Joke Teller", "JokeTeller"],
  ["Video Player", "VideoPlayer"],
  ["BMI Calculator", "BMICalculator"],
  ["Color Invertor", "ColorInvertor"],
  ["Analog Stopwatch", "AnalogStopwatch"],
  ["Analog Clock", "AnalogClock"],
];

const list = document.querySelector(".list");

function populateDOM() {
  appInfo.forEach((app) => {
    const name = app[0];
    const folder = app[1];
    const listEl = document.createElement("li");
    const iconBox = document.createElement("div");
    iconBox.classList.add("icon-box");
    const link = document.createElement("a");
    link.setAttribute("href", `apps/${folder}/index.html`);
    link.setAttribute("target", "_blank");
    const img = document.createElement("img");
    img.classList.add("icon");
    img.setAttribute("src", `apps/${folder}/images/favicon.svg`);
    const appName = document.createElement("p");
    appName.textContent = name;
    link.appendChild(img);
    link.appendChild(appName);
    iconBox.appendChild(link);
    listEl.appendChild(iconBox);
    list.appendChild(listEl);
  });
}

populateDOM();
