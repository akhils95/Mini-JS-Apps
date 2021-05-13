//Define variables
const resetBtn = document.getElementById('new-day');
const count = document.getElementById('counter-value')
const addOneBtn = document.getElementById('add-one');
const addValue = document.getElementById('count');
const addManualBtn = document.getElementById('add-button');

//Populate dom on startup
function populate() {
    if(sessionStorage.getItem("count")){
        count.innerHTML = sessionStorage.getItem("count");
    } else {
        count.innerHTML = 0;
    }
}

//Start a new day (reset)
function reset (){
    count.innerHTML = 0;
    sessionStorage.removeItem("count");
}

//Add to count
function addToCount (number) {
    var oldCount = parseInt(count.innerHTML);
    var newCount = oldCount + number;
    count.innerHTML = newCount;
    sessionStorage.setItem("count", newCount)
}

function addOne() {
    addToCount(1);
}

function addManual() {
    var number = parseInt(addValue.value);
    addToCount(number);
    addValue.value = '';
}

//Event Listeners
addOneBtn.addEventListener("click", addOne);
addManualBtn.addEventListener("click", addManual);
resetBtn.addEventListener('click', reset);

//On Startup
window.addEventListener("load", populate);