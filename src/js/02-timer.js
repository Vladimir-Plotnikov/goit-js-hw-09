import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

const refs = {
    dataPicker: document.querySelector('#datetime-picker'),
    startButton: document.querySelector('button[data-start]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]'),
}

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        let setDateSec = selectedDates[0].getTime();
        let defDateSec = options.defaultDate.getTime();
      
       let ms = setDateSec-defDateSec
        function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
        }
        function setDate() {
            refs.secondsValue.innerHTML = convertMs(ms).seconds;
            refs.minutesValue.innerHTML = convertMs(ms).minutes;
            refs.hoursValue.innerHTML = convertMs(ms).hours;
            refs.daysValue.innerHTML = convertMs(ms).days;
        }
        if (selectedDates[0] <= options.defaultDate) {
            refs.startButton.disabled = true;
            window.alert("Please choose a date in the future")
        } else {
            refs.startButton.disabled = false;
            refs.startButton.addEventListener('click', countDown)
            
            function countDown() {
                timerId = setInterval(setDate,1000)
            }
            console.log(timerId);
      }
  },
};

flatpickr(refs.dataPicker, options)


