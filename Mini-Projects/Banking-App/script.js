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

const account5 = {
  owner: "Oluwajomiloju Odedairo",
  movements: [10000, 250, -100, 5000, -50, 1300, 70, 1900],
  interestRate: 2, // %
  pin: 1234,
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
          <div class="movements__value">${mov}€</div>
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

// displayMovements(account1.movements);

//////////////////////////////// Computing Usernames //////////////////////////////////

// Thought Process
// And so how do we take each of the first letters here? Well, we could simply loop over the array, and then take the first letter in each iteration,
// and add them into a new array. And then in the end, we would join that array,  and we would end up with just a string of stw.  So let's do what I just said.  So looping over this array,  taking the first letter and then putting it  into a new array.  And that is exactly what the map method does.  We can do that directly here,

const user = "Steven Thomas Williams"; // stw

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
  usersAcc.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

// But now we actually want to compute  one username for each of the account holders  in our accounts array.  So to do that, should we use the map  or the for each method.

// Well, we do not want to create a new array in this situation, all we want to do is to modify the object, so the elements that already exist in the accounts array. So in this array here, and so what we want is to simply loop over // this array here, and then do something.
createUsernames(accounts);

console.log(accounts);

//////////////////////////////////// Using reduce method to create the total balances /////////////////////////////////////////////

const calcDisplayedBalance = function (movement) {
  console.log(movement);
  const balance = movement.reduce(function (acc, curMov) {
    return acc + curMov;
  }, 0);

  labelBalance.textContent = `${balance}€`;
};

// calcDisplayedBalance(account1.movements);

//////////////////////////////////// Implementing the chaining method  /////////////////////////////////////////////

// const calcDisplaySummary = function (movements) {
//   const income = movements
//     .filter((mov) => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${income}€`;

//   const withdrawals = movements
//     .filter((mov) => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

//   // const interest = movements
//   //   .filter((mov) => mov > 0)
//   //   .map((deposits) => (deposits * 1.2) / 100).reduce((acc, intr) => acc + intr, 0);
//   //   labelSumInterest.textContent = `${interest}€`;

//   //   Great, but now let's say that the bank  introduces a new rule.  So now the bank only pays an interest  if that interest is at least one Euro

//   const interest = movements
//     .filter((mov) => mov > 0)
//     .map((deposits) => (deposits * 1.2) / 100)
//     .filter((deposits, i, arr) => {
//       console.log(arr);
//       return deposits >= 1;
//     })
//     .reduce((acc, intr) => acc + intr, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };

// And so, in order to get access to that data,  so to that interest rate,  we now need more than just the movements.  Instead of the movements, we want now, the entire account.  Because then we can take the movements from the account,  and also the interest rate.
//  Alright, so again, we will now change this function  and pass in the entire account,  and not just the movements array.
// And so then from there, we will be able to take  the movements that we need to calculate  these three statistics here.

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const withdrawals = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposits) => (deposits * acc.interestRate) / 100)
    //  So right now, for all of the accounts, the interest rate is now calculated using this 1.2 interest rate. However, as we take a look at the accounts, each of them actually has a different interest rate.
    // So this one has 1.2, but this one has 1.5, and this one has less, so it gets a less interest. And so now of course, we also want to dynamically use this interest rate depending on the current user, right?
    .filter((deposits, i, arr) => {
      console.log(arr);
      return deposits >= 1;
    })
    .reduce((acc, intr) => acc + intr, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

//////////////////////////////// Implementing the Find Method and Working with Event Handlers ///////////////////////////////////////

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting, therefore reloading
  e.preventDefault();

  // hitting enter on enter fields submit the form

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

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur(); // removes cursor focus

    // Display movements
    displayMovements(currentAccount.movements);

    // Display balance
    calcDisplayedBalance(currentAccount.movements);

    // Display summary
    // calcDisplaySummary(currentAccount.movements);
    calcDisplaySummary(currentAccount);
  }
});
///////////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////// /////////////////////////////////////////////////

///////////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////// /////////////////////////////////////////////////

///////////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////// /////////////////////////////////////////////////
