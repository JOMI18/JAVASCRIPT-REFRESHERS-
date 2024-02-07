"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account5 = {
  owner: "Oluwajomiloju Odedairo",
  movements: [10000, 250, -100, 5000, -50, 1300, 70, 1900],
  interestRate: 2, // %
  pin: 1234,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2024-01-27T14:43:26.374Z",
    "2024-01-31T18:49:59.371Z",
    "2024-02-02T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

///////////////////////////////////
///////////////////////////////////
// Working with Functions

///////////////////////// Creating DOM Elements ////////////////////////////////

///////////////// Formatting the date appearance
const formattedMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) {
    return "Today";
  } else if (daysPassed === 1) {
    return "Yesterday";
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

///////////////// Formatting the number appearance
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = "";

//   const movOrder = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   // movements.forEach(function (mov, i) {
//   movOrder.forEach(function (mov, i) {
//     const type = mov > 0 ? "deposit" : "withdrawal";

//     const html = `
//     <div class="movements__row">
//           <div class="movements__type movements__type--${type}">${
//       i + 1
//     }  ${type}</div>
//           <div class="movements__value">${mov.toFixed(2)}€</div>
//         </div>
//     `;
//     containerMovements.insertAdjacentHTML("afterbegin", html);

//   });
// };

// wee need to have access to the enter accounts

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ""; // Now innerHTML here is a little bit similar to text content.
  // .textContent=0
  //  So remember that now the difference is that textcontent simply returns the text itself while innerHTML returns everything, including the HTML.
  // So all the HTML tags will be included.

  const movOrder = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  // create a copy of the array don't sort directly

  // movements.forEach(function (mov, i) {
  movOrder.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // looping 2 arrays at the same time
    //  we are looping over the movements. And so at the same time, basically we also need to loop over the movement dates, okay. But that's not a problem because
    // we already have the index here. And so what we can do is to write account or acc.movementsDates and then we take it at position i.
    // So that is the current index in the movements array. And the same index is then gonna point to the equivalent date in this movements date array.

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formattedMovementDate(date, acc.locale);

    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const displayDate = `${day}/${month}/${year}`;
    // const calcDaysPassed = (date1, date2) =>
    //   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

    //  take it to a func

    // formatting number
    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   style: "currency",
    //   // currency: "USD",
    //   currency: acc.currency,
    // }).format(mov);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }  ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
          </div>
          `;
    // <div class="movements__value">${mov.toFixed(2)}€</div>

    // So we need to attach this HTML somehow into this container -So into this movements element.
    // And to do that,we will use a method called insertAdjacentHTML.
    containerMovements.insertAdjacentHTML("afterbegin", html);
    // And this method accepts two strings.
    // The first string is the position  in which we want to attach the HTML.
    // because now we need to specify the second argument and that is the string containing the HTML

    // And finally, I wanted to show you why I used afterbegin and not beforeend. Well, let me show you what happened with beforeend. I think this is how it works.
    // So beforeend. Yeah. So with that, the order of the movements would be inverted.
  });
};

// displayMovements(account1.movements);

//////////////////////////////// Computing Usernames //////////////////////////////////

// Thought Process
// And so how do we take each of the first letters here? Well, we could simply loop over the array, and then take the first letter in each iteration,
// and add them into a new array. And then in the end, we would join that array,  and we would end up with just a string of stw.
//  So let's do what I just said.  So looping over this array,  taking the first letter and then putting it  into a new array.
// And that is exactly what the map method does.  We can do that directly here,

// const user = "Steven Thomas Williams"; // stw

// 1. const username= user.toLowerCase()
// 2.const username= user.toLowerCase().split(" ") // returns an array
// 3. const username= user.toLowerCase().split(" ").map(function (word) {
//   return word[0]
// }) // returns an array so we can add the join method to take it to a string
// 4. const username = user
//   .toLowerCase()
//   .split(" ")
//   .map(function (word) {
//     return word[0];
//   })
//   .join(""); // returns an array so we can add the join method to take it to a string
// 5. const username = user
//   .toLowerCase()
//   .split(" ")
//   .map((word) => word[0]) // take to arrow func
//   .join("");

// console.log(username);

// 6. Take to function based

const createUsernames = function (usersAcc) {
  // But now we actually want to compute  one username for each of the account holders  in our accounts array.  So to do that, should we use the map  or
  // the for each method.
  // Well, we do not want to create a new array in this situation, all we want to do is to modify the object, so the elements that already exist in the accounts array.
  //  So in this array here, and so what we want is to simply loop over // this array here, and then do something.

  usersAcc.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
createUsernames(accounts);

console.log(accounts);

//////////////////////////////////// Using reduce method to create the total balances /////////////////////////////////////////////

// const calcDisplayedBalance = function (movement) {
//   console.log(movement);
//   // here we're not storing the account balance in any variable, so we cant have access to it
//   const balance = movement.reduce(function (accum, curMov) {
//     return accum + curMov;
//   }, 0);

//   labelBalance.textContent = `${balance}€`;
// };

const calcDisplayedBalance = function (acc) {
  // as a result
  const balance = acc.movements.reduce(function (accum, curMov) {
    return accum + curMov;
  }, 0);
  acc.balance = balance; // or you can set it directly
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);

  // acc.balance = acc.movements.reduce(function (accum, curMov) {
  //   return accum + curMov;
  // }, 0);
  // labelBalance.textContent = `${acc.balance}€`;
};

// calcDisplayedBalance(account1.movements);

//////////////////////////////////// Implementing the chaining method  /////////////////////////////////////////////

// const calcDisplaySummary = function (movements) {
//   const income = movements
//     .filter((mov) => mov > 0)
//     .reduce((accum, mov) => accum + mov, 0);
//   labelSumIn.textContent = `${income}€`;

//   const withdrawals = movements
//     .filter((mov) => mov < 0)
//     .reduce((accum, mov) => accum + mov, 0);
//   labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

//   // const interest = movements
//   //   .filter((mov) => mov > 0)
//   //   .map((deposits) => (deposits * 1.2) / 100).reduce((accum, intr) => accum + intr, 0);
//   //   labelSumInterest.textContent = `${interest}€`;

//   //   Great, but now let's say that the bank  introduces a new rule.  So now the bank only pays an interest  if that interest is at least one Euro

//   const interest = movements
//     .filter((mov) => mov > 0)
//     .map((deposits) => (deposits * 1.2) / 100)
//     .filter((deposits, i, arr) => {
//       console.log(arr);
//       return deposits >= 1;
//     })
//     .reduce((accum, intr) => accum + intr, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };

// And so, in order to get access to that data,  so to that interest rate,  we now need more than just the movements.  Instead of the movements,
// we want now, the entire account.  Because then we can take the movements from the account,  and also the interest rate.
//  Alright, so again, we will now change this function  and pass in the entire account,  and not just the movements array.
// And so then from there, we will be able to take  the movements that we need to calculate  these three statistics here.

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);
  // labelSumIn.textContent = `${income.toFixed(2)}€`;
  labelSumIn.textContent = formatCur(income, acc.locale, acc.currency);

  const withdrawals = acc.movements
    .filter((mov) => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);
  // labelSumOut.textContent = `${Math.abs(withdrawals.toFixed(2))}€`;
  labelSumOut.textContent = formatCur(
    Math.abs(withdrawals),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposits) => (deposits * acc.interestRate) / 100)
    //  So right now, for all of the accounts, the interest rate is now calculated using this 1.2 interest rate. However, as we take a look at the accounts,
    // each of them actually has a different interest rate.
    // So this one has 1.2, but this one has 1.5, and this one has less, so it gets a less interest. And so now of course, we also want to dynamically use
    // this interest rate depending on the current user, right?
    .filter((deposits, i, arr) => {
      // console.log(arr);
      return deposits >= 1;
    })
    .reduce((accum, intr) => accum + intr, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// calcDisplaySummary(account1.movements);

const updateUI = function (account) {
  // displayMovements(account.movements);
  displayMovements(account);
  calcDisplayedBalance(account);
  calcDisplaySummary(account);
};

///////////////////////////////////
///////////////////////////////////
// Working with Event Handlers

//////////////////////////////// Implementing the Find Method ///////////////////////////////////////

let currentAccount, timer;

////////////// Fake account Login
// currentAccount = account5;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
//////////////

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting, therefore reloading
  e.preventDefault();

  // hitting enter on enter in the fields, also  submits the form

  if (inputLoginUsername.value === "" && inputLoginPin.value === "") {
    alert("The input fields can not be empty");
  }

  // else{
  //   alert("Invalid Entry")
  // }

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {// optional chaining is a much better soln to first check if a user account exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message

    //  labelWelcome.textContent = `Welcome ${currentAccount.owner}` // fullName
    //  labelWelcome.textContent = `Welcome ${currentAccount.owner.split(" ")}` // adds a , between names, iff theres no space it separates every letter with a ,
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(" ")[0]}`;

    ///////////////// ADDING DATES and time  ///////////////////
    // const now = new Date();
    // console.log(now);
    // // const day = now.getDay();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // console.log(day);
    // // const month = now.getMonth()+1;
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // // const hour = now.getHours();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    const now = new Date();

    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur(); // removes cursor focus

    // Display movements
    // displayMovements(currentAccount.movements);

    // // Display balance
    // // calcDisplayedBalance(currentAccount.movements);
    // calcDisplayedBalance(currentAccount);

    // // Display summary
    // // calcDisplaySummary(currentAccount.movements);
    // calcDisplaySummary(currentAccount);

    // start timer
    // startLogOutTimerTestRun()
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();

    // Updating the Ui

    updateUI(currentAccount);
  }
});
////////////////////////////////////////////////  Implementing Transfers ////////////////////////////////////////////////

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  // const receiverAcc =  inputTransferTo.value // its not useful to just get the value, its important to find the object of the receiver account
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";

  // conditions for the transfer to be valid are:
  // 1. that the amount is positive,
  // 2. that the recipient account exists,
  // 3. the current amount is greater than the money being transferred
  // 4. I can nor send money to myself
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log("Transfer Valid");
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Adding the transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Updating the Ui

    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

/////////////////////////////////// The Find Index and  Closing Accounts ////////////////////////////////////////

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log("Can delete");
    const index = accounts.findIndex(
      //  Now, there's just a couple of things I want you to note here, both the find and findIndex methods
      //  get access to also the current index, and the current entire array. So as always, besides the current element, these other two values are also available.
      //  But in practice, I never found these useful.
      // And second, the both the find and findIndex methods  were added to JavaScript in ESX.  And so they will not work in like super old browsers.
      // But don't worry, there is going to be a lecture  a little bit later on how to support  all of these old browsers.
      (acc) => acc.username === currentAccount.username
    );
    // .indexOf
    //  Now, you might notice that this is actually similar  to the indexOf method that we studied before.  So, indexOf,  and then here we can pass in some value,
    // all right?  Now, the big difference here is that with indexOf,
    //  we can only search for a value that is in the array.  So, if the array contains the 23, then it's true,  and if not, then it's false.  But on the other hand,
    // with findIndex,  we can create a complex condition like this one,
    // and of course, it doesn't have to be  the equality operator here.  It can be anything that returns true or false, okay?  And here we can simply check
    // if the array contains this value or not,  and if so, return the indexOf it.
    // So both return an index number,  but this one here is a lot simpler.

    // DELETE ACCOUNT
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

//////////////////////// Implementing the Some Method and the request Loan Functionality /////////////////////////////

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  // const amount = Number(inputLoanAmount.value);
  // const amount = +inputLoanAmount.value;

  // loan amounts are whole
  const amount = Math.floor(inputLoanAmount.value);

  const requestedLoanValid = currentAccount.movements.some(
    (mov) => mov >= amount * 0.1
  );
  if (amount > 0 && requestedLoanValid) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Adding the loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 5000);
  }
  inputLoanAmount.value = "";
});

/////////////////////////////// Sorting Arrays ///////////////////////////////

let sortedState = false; // monitoring the state
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  // displayMovements(currentAccount.movements, !sortedState);
  displayMovements(currentAccount, !sortedState);
  sortedState = !sortedState;
});

////////////////////////////// Additional //////////////////////////////////

// Now, besides these obvious Iterables that I just mentioned,  like Maps or Sets another great example  of an array like structure  is the result of using
// querySelectorAll().

// So maybe you remember that querySelectorAll() returns,  something called a NodeList,  which is something like an array,  which contains all the selected
// elements.  But it's not a real array,  and so it doesn't have methods like map(), for example.

// But it's not a real array,  and so it doesn't have most of the array methods  like map() or reduce().  So if we actually wanted to use  a real array method
//  like that on a NodeList,  we would first need to convert the NodeList to an array.

// And for that Array.from() is perfect.

labelBalance.addEventListener("click", function () {
  // So again, let's pretend that we only have these values,  so all of these movements only stored here  in the user interface,  but we do not have them
  //  somewhere in our code.  So we don't have an array containing these values.
  // But now let's say we want to calculate their sum.  And so therefore we need to somehow get them first

  // from the user interface and then do the calculation  based on that.  So let's create a variable called movementsUI.  So the ones that we get from
  // the user interface.

  //So we can attach a EventListeners to every object. It doesn't have to be a button.

  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll(".movements__value")]; // another way to get an array

  ////////////////// Working with the remainders
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = "grey";
    // 0, 3, 6, 9
    // if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});

///////////////////////////////////////////////// ADDING DATES //////////////////////////////////
// const now = new Date();
// // const day = now.getDay();
// const day = `${now.getDay()}`.padStart(2, 0);
// // const month = now.getMonth()+1;
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// // const hour = now.getHours();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = now.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// works with the fake entry

/////////////// experimenting with API
// const now = new Date();
// const options = {
//   hour: "numeric",
//   minute: "numeric",
//   day: "numeric",
//   month: "numeric",
//   year: "numeric",
//   // weekday: 'long',
// };
// labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(now);

///////////////////////////////////////////////// /////////////////////////////////////////////////
// Now for security reasons, real bank applications

// will log out users after some inactive time.

// For example, after five minutes without doing anything.

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--; // And so in this iteration where the time is initially one, -- it solves it not reaching 0

    // this part of the code still gets executed. And again, because we increase that one second to zero here, before this. And so we need to put it after, of course.

    // And so now this part of the code here only gets triggered if the time really is zero here in this whole function. So now you will see that the logout will only really happen after exactly 10 seconds.
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick(); // So this callback function that we passed into set interval is not called immediately. -- this solves it
  const timer = setInterval(tick, 1000);

  return timer;
};

// const startLogOutTimerTestRun = function () {
//   let timer = 100;

//   setInterval(() => {
//     labelTimer.textContent = timer;
//     timer--;
//   }, 1000);
// };
