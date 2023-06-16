// Get the container element for the daily days.
const daysContainer = document.querySelector(".daily-days-container");

// Get an array of day names.
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Get the current date.
const today = new Date();

// Get the current year, month, and date.
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();
const thisDate = today.getDate();

// Get the last day of the month.
const lastDayOfMonth = new Date(thisYear, thisMonth + 1, 0);

// Get the last day of the previous month.
const lastDayOfPrevMonth = new Date(thisYear, thisMonth, 0);

// Initialize a string to store the HTML for the days.
let DaysHtml = "";

// Start at the current date and go back 3 days.
let start = thisDate - 3;

// If the start date is less than 1, then set it to the last day of the previous month.
if (start < 1) {
  start = lastDayOfPrevMonth.getDate() + start;
}

// Set a flag to indicate whether the previous month has been processed.
let isPrevDone = false;

// Get the day name for the current date.
let dayName = today.getDay() - 3;

// If the day name is less than 0, then wrap it around to 7.
if (dayName < 0) dayName = 7 + dayName;

// Loop through the days, starting at the start date and going up to 7 days.
for (let day = start, i = 0; i < 7; i++, day++) {
  // If the day is less than the last day of the month, then set the isPrevDone flag to false.
  if (day < lastDayOfMonth.getDate()) {
    isPrevDone = false;
  }

  // If the isPrevDone flag is false and the day is greater than the last day of the month, then set the day to 1 and set the isPrevDone flag to true.
  else if (!isPrevDone && day > lastDayOfMonth.getDate()) {
    day = 1;
    isPrevDone = true;
  }

  // If the day is greater than the last day of the month, then set it to 1.
  else if (day > lastDayOfMonth.getDate()) {
    day = 1;
  }

  // Increment the day name by 1 and wrap it around to 7 if it is greater than 6.
  dayName++;
  dayName %= 7;

  // If the current day is the current date, then add an active class to the day card.
  if (day === thisDate) {
    DaysHtml += `<div class="day-card active">
            <p>${dayNames[dayName++]}</p>
            <span>${day}</span>
        </div>`;
  }

  // Otherwise, just add a regular day card.
  else {
    DaysHtml += `<div class="day-card">
            <p>${dayNames[dayName++]}</p>
            <span>${day}</span>
        </div>`;
  }
}

// Set the inner HTML of the days container to the HTML for the days.
daysContainer.innerHTML = DaysHtml;
