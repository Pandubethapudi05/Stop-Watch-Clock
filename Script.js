// CLOCK
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-GB'); // HH:MM:SS format
  document.getElementById('clock').textContent = timeStr;
}

setInterval(updateClock, 1000);
updateClock(); // Call immediately once

// STOPWATCH
let stopwatchInterval;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateStopwatchDisplay() {
  document.getElementById('stopwatch').textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (isRunning) return;
  isRunning = true;
  const startTime = Date.now() - elapsedTime;

  stopwatchInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateStopwatchDisplay();
  }, 10);
}

function stopStopwatch() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  updateStopwatchDisplay();
  document.getElementById('lapList').innerHTML = ''; // Clear recorded laps
}

function recordLap() {
  if (!isRunning) return; // Only allow lap recording if running
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  document.getElementById('lapList').appendChild(lapItem);
}
