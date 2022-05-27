const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
stop.disabled = true;

let eventId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);

function onStartClick() {
  start.disabled = true;
  stop.disabled = false;
  eventId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(eventId);
  start.disabled = false;
  stop.disabled = true;
}
