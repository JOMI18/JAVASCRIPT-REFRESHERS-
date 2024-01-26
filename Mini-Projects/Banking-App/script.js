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
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

///////////////////////// Creating DOM Elements ////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = ""; // Now innerHTML here is a little bit similar to text content.
  // .textContent=0
  //  So remember that now the difference is that textcontent simply returns the text itself while innerHTML returns everything, including the HTML. So all the HTML tags will be included.
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }  ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;

    // So we need to attach this HTML somehow into this container -So into this movements element.
    // And to do that,we will use a method called insertAdjacentHTML.
    containerMovements.insertAdjacentHTML("afterbegin", html);
    // And this method accepts two strings.
    // The first string is the position  in which we want to attach the HTML.
    // because now we need to specify the second argument and that is the string containing the HTML

    // And finally, I wanted to show you why I used afterbegin and not beforeend. Well, let me show you what happened with beforeend. I think this is how it works. So beforeend. Yeah. So with that, the order of the movements would be inverted.
  });
};

displayMovements(account1.movements);
