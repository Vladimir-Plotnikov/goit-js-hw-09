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

let timer = null;

console.log(refs.dataPicker);

refs.startButton.disabled = true;

//flatpickr

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            refs.startButton.disabled = true;
            window.alert("Please choose a date in the future")
        } else {
            refs.startButton.disabled = false;
            refs.startButton.addEventListener('click', countDownTime);

            function countDownTime() {
                timer = setInterval(() => {
                    refs.startButton.disabled = true;
                    const dataChoosen = selectedDates[0].getTime()
                    const nowTime = new Date().getTime();
                    const timeLeft = dataChoosen - nowTime

                    const { days, hours, minutes, seconds } = convertMs(timeLeft);

                    refs.daysValue.innerHTML = days < 10 ? addLeadingZero(days) : days;
                    refs.hoursValue.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
                    refs.minutesValue.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
                    refs.secondsValue.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

                    if (timeLeft < 1000) {
                        clearInterval(timer);
                        refs.startButton.disabled = false;
                    }
                }, 1000);
            }
            function addLeadingZero(value) {
                const stringValue = String(value);
                return stringValue.padStart(2, '0');
            }
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
        }
    },
            
};

flatpickr(refs.dataPicker, options)