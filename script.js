let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;


// Get HTML elements
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const lapBtn = document.getElementById("lapBtn");

const resetBtn = document.getElementById("resetBtn");

const laps = document.getElementById("laps");


// Format time
function formatTime(time) {

    let hours = Math.floor(time / (1000 * 60 * 60));

    let minutes = Math.floor(
        (time / (1000 * 60)) % 60
    );

    let seconds = Math.floor(
        (time / 1000) % 60
    );

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );
}


// Update stopwatch
function updateDisplay() {

    const currentTime =
        Date.now() - startTime + elapsedTime;

    display.textContent = formatTime(currentTime);
}


// START BUTTON

startBtn.addEventListener("click", function () {

    if (!running) {

        startTime = Date.now();

        timerInterval = setInterval(
            updateDisplay,
            10
        );

        running = true;

    }

});


// PAUSE BUTTON

pauseBtn.addEventListener("click", function () {

    if (running) {

        elapsedTime += Date.now() - startTime;

        clearInterval(timerInterval);

        running = false;

    }

});


// LAP BUTTON

lapBtn.addEventListener("click", function () {

    if (running) {

        const currentTime =
            Date.now() - startTime + elapsedTime;

        const lapItem =
            document.createElement("li");

        lapItem.textContent =
            "Lap " +
            (laps.children.length + 1) +
            " - " +
            formatTime(currentTime);

        laps.appendChild(lapItem);

    }

});


// RESET BUTTON

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    startTime = 0;

    elapsedTime = 0;

    running = false;

    display.textContent = "00:00:00";

    laps.innerHTML = "";

});