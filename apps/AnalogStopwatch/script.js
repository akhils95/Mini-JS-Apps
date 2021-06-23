const close = document.querySelector('.close');
const welcome = document.querySelector('.welcome');
const resetEl = document.querySelector('.left-dial');
const startEl = document.querySelector('.right-dial');
const minuteEl = document.getElementById('min');
const hand = document.getElementById('hand');

const bgTick = new Audio('clockTick.mp3');
bgTick.loop = true;

let isTimerOn = false;
let timePassed = 0;
let timeString = '0 0';
let timeValue;
let firstLoad = false;

const showTimer = () => {
    welcome.setAttribute('style', 'display:none');
}

const reset = () => {
    firstLoad = true;
    hand.classList.remove('move-hand');
    timePassed = 0;
    timeString = '0 0';
    minuteEl.innerText = timeString;
    clearInterval(timeValue);
}

const start = () => {
    if(firstLoad) {
        hand.classList.add('move-hand');
        firstLoad = false;
    }
    if(!isTimerOn) {
        bgTick.play();
        isTimerOn = true;
        hand.style.animationPlayState = 'running';
        calculateTime();
    } else {
        bgTick.pause();
        isTimerOn = false;
        hand.style.animationPlayState = 'paused';
        clearInterval(timeValue);
    }
}

const calculateTime = () => {
    timeValue = setInterval(() => {
        timePassed += 0.1;
        let seconds = Math.trunc(timePassed);
        if (seconds % 60 === 0 && seconds !== 0) {
            updateMinutes(seconds);
        }
    },100)
}

const updateMinutes = (sec) => {
    const minutes = sec / 60;
    const minArr = String(minutes).split('');
    let str = '';
    if (minArr.length <= 1){
        str = '0 ' + minArr[0];
    }else {
        minArr.forEach(char => {
            str = str + char + ' ';
        })
    }
    timeString = str.trim();
    minuteEl.innerText = timeString;
}

const checkKey = (key) => {
    if(key.code === 'Space') {
        start();
    } else if(key.code === 'KeyR') {
        reset();
    } else{
        return;
    }
}

close.addEventListener('click', showTimer);
resetEl.addEventListener('click', reset);
startEl.addEventListener('click', start);
window.addEventListener('keyup', e => checkKey(e));
window.addEventListener('load', () => firstLoad = true);