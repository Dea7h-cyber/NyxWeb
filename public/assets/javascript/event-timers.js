import config from './config.js';

// Elements
const eventsField = document.querySelector('.event-timers');

// Render event timers
function render(name, index) {
  eventsField.innerHTML += `<div>${name}: <span id='event-${index}'>00:00</span></div>`;
}

function addZero(number) {
  return number <= 9 ? `0${number}` : number;
}

function getHour(hours) {
  const date = new Date();
  const time = date.getHours() * 60 + date.getMinutes();

  hours = hours.map(hour => {
    let h = hour.split(':');
    return Number(h[0]) * 60 + Number(h[1]);
  }).sort((a, b) => a - b);

  for (let hour of hours) if (time < hour) return hour;
  return hours[0];
}

function getRemainingTime(hour) {
  const date = new Date();
  const time = date.getHours() * 60 + date.getMinutes();

  return time < hour ? hour - time : (24 * 60 - time) + hour;
}

function timeTransform(mins) {
  const hours = Math.floor(mins / 60);
  const minutes = Math.floor(mins - hours * 60);
  return `${addZero(hours)}h:${addZero(minutes)}m`;
}

// Initiate event timers counter
function init() {
  config.events.list.forEach((event, index) => {
    render(event.name, index);

    setInterval(() => {
      let eventTime = document.querySelector(`#event-${index}`);
      let nextEvent = getHour(event.hours);
      let remaining = getRemainingTime(nextEvent);

      eventTime.textContent = timeTransform(remaining);
    }, 2000);

  });
}

export default { init };