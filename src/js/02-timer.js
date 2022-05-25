import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';
// all modules
import Notiflix from 'notiflix';
const refs = {
  currentDate: document.querySelector('input#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
  intervalId: null,
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0].getTime() - currentDate.getTime() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.start.disabled = false;
    }
  },
};

const result = flatpickr(refs.currentDate, options);

refs.start.disabled = true;

refs.start.addEventListener('click', onStartClick);

function onStartClick() {
  refs.intervalId = setInterval(() => {
    const newDate = new Date();
    const selectedDate = result.selectedDates[0];
    const timerData = selectedDate.getTime() - newDate.getTime();
    if (timerData < 0) {
      clearInterval(refs.intervalId);
      return;
    }
    const derivedDate = convertMs(selectedDate.getTime() - newDate.getTime());
    chooseDate(derivedDate);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const mins = Math.floor(((ms % day) % hour) / min);
  // Remaining seconds
  const secs = Math.floor((((ms % day) % hour) % min) / sec);

  return { days, hours, mins, secs };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function chooseDate(config) {
  refs.days.textContent = addLeadingZero(config.days);
  refs.hours.textContent = addLeadingZero(config.hours);
  refs.mins.textContent = addLeadingZero(config.mins);
  refs.secs.textContent = addLeadingZero(config.secs);
}
