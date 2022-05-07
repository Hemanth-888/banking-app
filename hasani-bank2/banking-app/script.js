'use strict';

// Sample Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2022-01-14T14:43:26.374Z',
    '2022-01-28T18:49:59.371Z',
    '2022-01-29T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////

// Elements

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  //empty container and only then start adding new elements

  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    // if the current movement is > 0 then write deposit otherwise withdrawal

    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type
      movements__type--${type}">${i + 1}${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
  </div>
    `;
    //insertAdjacentHTML accepts two strings. 1st string is position string containing html that we want to work.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Function to calc balance from accounts data and display
const calcDisplayBalance = function (acc) {
  //return acc + current mov and start @ 0
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
// Function to calc balance summary from accounts data and display (bottom page)
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// CREATE USERNAME
const createUsernames = function (accs) {
  //"for each acc in the acc array"
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase() // MAKE EVERYTHING LOWERCASE
      .split(' ') // SPLIT ARRAY BY NAME
      .map(name => name[0]) // RETURN FIRST LETTER OF NAME @ POS 0
      .join(''); // ADD STRING ARRAY TOGETHER BY REMOVING SPACE
  });
};
createUsernames(accounts);
// Update U/I to display movements, balance, summary
const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

// Function to start logout timer upon logging in with sample data
const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // in each call, print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    // When time is at 0 secs, stop timer & logout user
    if (time == 0) {
      // clear timer
      clearInterval(timer);
      //Logout of account
      labelWelcome.textContent = `Login to get started, ${
        currentAccount.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = 0;
    }

    // Decrease by 1 sec
    time--;
  };
  // set time to 5 min
  let time = 120;

  // call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

/////////////////////////////////////////////
let currentAccount, timer;

//SIMULATE ALWAYS LOGGED IN (FX)
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//experimenting
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
const locale = navigator.language;
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// LOGIN FUNCITIONALITY
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  //check if pin matches user data
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display Welcome message & UI
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      // weekday: 'long',
    };

    // display local time based on account location
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    //Timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    //Update UI
    updateUI(currentAccount);
  }
});

// IMPLEMENTING TRANSFERS FUNCTIONALITY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    //code below: we are looking for the acc w the usern = to value
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //Add dates to transfers
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

// IMPLEMENT LOAN FUNCTIONALITY
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //Add movement
      currentAccount.movements.push(amount);
      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      //Update UI
      updateUI(currentAccount);

      //Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);

    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //delete account
    accounts.splice(index, 1);
    // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//Overall bank balance
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);

//sort functionality
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // conversion
// console.log(23 === 23.0);
// console.log(+'23');

// //parsing - java will indentify #'s in the string.
// console.log(Number.parseInt('20px', 10));
// console.log(Number.parseInt('e23', 2));

// console.log(Number.parseFloat('2.5rem'));
// console.log(Number.parseFloat('2.5rem'));

// //checking if value is a nan
// console.log(Number.isNaN(20));
// console.log(Number.isNaN(23 / 0));

// // checking if value is a number
// console.log(Number.isInteger(23));
// console.log(Number.isFinite(23));

// //Sqrt conversion
// console.log(Math.sqrt(25));
// console.log(25 ** 1 / 2);
// console.log(8 ** 1 / 3);

// //max+min value f(x)
// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.min(5, 18, 23, 11, 2));

// //find the circumference of a circle given the px
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// console.log(Math.trunc(Math.random() * 6) + 1);

// //Always generate random int betwen two values
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(10, 20));

// //Rounding integers
// console.log(Math.trunc(23.3));
// console.log(Math.round(23.9)); // round up
// console.log(Math.ceil(23.3)); //round down
// console.log(Math.floor(23.3)); //round down

// //Math.floor works best in all situations for rounding

// //Rounding decimals
// console.log((2.7).toFixed(0));

// console.log(5 % 2);
// console.log(5 / 2);

// //check whether a certain number is even or odd
// console.log(6 % 2);

// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));

// // Remainder lessons - Good idea to use when you need to do something every nth time.....
// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

// //Numeric Seperators

// const diameter = 287_460_000_000;
// console.log(diameter);

// const priceCents = 345_99;
// console.log(priceCents);

// const transferfee = 15_00;
// console.log(transferfee);

// const PI = 3.14_15;
// console.log(PI);
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 1);

// console.log(BigInt(7678776556767899876545687654));

//Create a date
// const now = new Date();
// console.log(now);

// console.log(new Date('Jan 26 2022 13:45:08'));
// console.log(new Date('December 24, 2015'));

// console.log(new Date(account1.movementsDates[0]));
// console.log();

// const future = new Date(2037, 10, 19, 15, 23);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));

// console.log(days1);

// const num = 38888786.23;

// const option = {
//   style: 'unit',
//   unit: 'mile-per-hour',
//   currency: 'EUR',
//   // useGrouping: false,
// };
// console.log('US:', new Intl.NumberFormat('en-US', option).format(num));
// console.log('GE:', new Intl.NumberFormat('de-DE', option).format(num));
// console.log('SY:', new Intl.NumberFormat('ar-SY', option).format(num));
// console.log('Browser:', new Intl.NumberFormat(navigator.language).format(num));
// SET TIMEOUT FUNCTION
// const ingredients = ['olives', 'spinach'];
// //1000 milliseconds is 1 sec
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`here is your pizza w/ ${ing1} and ${ing2} 🍕'`),
//   3000,
//   ...ingredients
// );
// console.log('waiting....');

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
// // every second a new date is created and logged to the console
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
