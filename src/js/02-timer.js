import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
    selectedDay = selectedDates[0].getTime();
    if (selectedDay < new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    btnStart.disabled = false;
  },
};

// змінні-------------------------------------------------
const btnStart = document.querySelector('[data-start]');
const timePicker = document.querySelector('#datetime-picker');
const timerRef = document.querySelector('.timer');
let selectedDay = flatpickr(timePicker, options);
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

btnStart.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// слухачі подій------------------------------------------

btnStart.addEventListener('click', onStart);

// функція запуску таймера--------------------------------
function onStart(event) {
  timer.start();
}

//-----часики
function clock({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

// функція таймер------------------------------------------
const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      console.log('currentTime :', currentTime);
      let deltaTime = selectedDay - currentTime;
      if (deltaTime < 995) {
        clearInterval(this.intervalId);
        this.isActive = false;
        //перезавантажуємо сторінку
        window.location.reload();
      }
      // підтягуємо годинник
      console.log('deltaTime :', deltaTime);
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      console.log(`${days}:${hours}:${minutes}:${seconds}`);
      const timer = convertMs(deltaTime);
      clock(timer);
    }, 1000);
  },
};

// ф-я приведення часу до 2 знаків----------------------------
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
