function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;

btnStart.addEventListener('click', onStart);

let timerId;
function onStart() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => {
    const bodyColor = getRandomHexColor();
    document.body.style.background = bodyColor;
  }, 1000);
}

btnStop.addEventListener('click', onStop);

function onStop() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
}
