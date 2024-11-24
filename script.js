const dayInput = document.getElementById('day');
const dayOutput = document.getElementById('day-data');

const monthInput = document.getElementById('month');
const monthOutput = document.getElementById('month-data');

const yearInput = document.getElementById('year');
const yearOutput = document.getElementById('year-data');

const formInput = document.querySelector('form');
const submitBtn = document.getElementById('submit');

const dayError = document.getElementById('day-err');
const monthError = document.getElementById('month-err');
const yearError = document.getElementById('year-err');

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

// To calculate leap year

const leapYear = (y) => {
  let isLeapYear = true;
  if (y % 100 === 0 ? y % 400 === 0 : y % 4 === 0) {
    isLeapYear = true;
  } else {
    isLeapYear = false;
  }
  return isLeapYear;
};
// console.log(leapYear(2023));

const monthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// const error = document.querySelector('.err');

//Validation

const validate = () => {
  let validator = true;
  const allInputs = document.querySelectorAll('input');

  allInputs.forEach((input) => {
    const parent = input.parentElement;

    if (!input.value) {
      //empty field
      input.style.borderColor = 'hsl(0, 100%, 67%)';
      parent.querySelector('.err').innerText = 'this field is required.';
      validator = false;
    } else if (dayInput.value > 31) {
      //invalid day
      dayInput.style.borderColor = 'hsl(0, 100%, 67%)';
      dayError.innerText = 'must be valid day.';
      validator = false;
    } else if (monthInput.value > 12) {
      //invalid month
      monthInput.style.borderColor = 'hsl(0, 100%, 67%)';
      monthError.innerText = 'must be valid month.';
      validator = false;
    } else if (dayInput.value > 29 && monthInput.value == 2) {
      //invalid day for february
      dayInput.style.borderColor = 'hsl(0, 100%, 67%)';
      dayError.innerText = 'must be valid day.';
      validator = false;
    } else if (yearInput.value > year) {
      //For future years or invalid year
      yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
      yearError.innerText = 'Not Born Yet.';
      validator = false;
    } else if (
      dayInput.value == 29 &&
      monthInput.value == 2 &&
      leapYear(yearInput.value) === false
    ) {
      //Leap year
      yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
      yearError.innerText = 'Not a leap year.';
      validator = false;
    } else {
      //no error
      input.style.borderColor = 'hsl(0, 0%, 8%)';
      parent.querySelector('.err').innerText = '';

      validator = true;
    }
  });
  return validator;
};

const submission = (e) => {
  e.preventDefault();
  if (validate()) {
    if (dayInput.value > day) {
      day = day + monthDate[month - 1];
      month = month - 1;
    }
    if (monthInput.value > month) {
      month = month + 12;
      year = year - 1;
    }

    const dayData = day - dayInput.value;
    const monthData = month - monthInput.value;
    const yearData = year - yearInput.value;

    dayOutput.innerHTML = dayData;
    monthOutput.innerHTML = monthData;
    yearOutput.innerHTML = yearData;
    // console.log(dayData);
    // console.log(monthData);
    // console.log(yearData);
  }
};

submitBtn.addEventListener('click', submission);
