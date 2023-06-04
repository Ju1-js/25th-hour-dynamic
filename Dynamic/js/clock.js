const time = document.querySelector('.time'),
timeMeridiem = document.querySelector('.time-meridiem'),
date = document.querySelector('.date');

setInterval(function() {
    showTime(false, true, true, 'dd/mm/yyyy', '-');
}, 1000);

function showTime(is24hr, showSeconds, showDate, dateFormat, dateSeparator) {
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear(),
    meridiem = 'AM';

    // Set AM or PM
    if (is24hr === false) {
        meridiem = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
    } else {
        meridiem = '';
    }

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}${showSeconds ? `<span>:</span>${addZero(sec)}` : ''}`;
    timeMeridiem.innerHTML = `${meridiem}`;

    // Output Date
    if (showDate) {
        date.innerHTML = `${addZero(day)}${dateSeparator}${addZero(month)}${dateSeparator}${year}`;
    }
}
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
