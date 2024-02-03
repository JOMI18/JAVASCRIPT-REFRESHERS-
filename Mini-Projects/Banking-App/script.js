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


///////////////////////////////////
///////////////////////////////////
// Working with Functions


///////////////////////// Creating DOM Elements ////////////////////////////////

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ""; // Now innerHTML here is a little bit similar to text content.
  // .textContent=0
  //  So remember that now the difference is that textcontent simply returns the text itself while innerHTML returns everything, including the HTML. So all the HTML tags will be included.

  const movOrder = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // create a copy of the array don't sort directly

  // movements.forEach(function (mov, i) {
  movOrder.forEach(function (mov, i) {
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
  // But now we actually want to compute  one username for each of the account holders  in our accounts array.  So to do that, should we use the map  or the for each method.
  // Well, we do not want to create a new array in this situation, all we want to do is to modify the object, so the elements that already exist in the accounts array. So in this array here, and so what we want is to simply loop over // this array here, and then do something.

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
  labelBalance.textContent = `${acc.balance}€`;

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

// And so, in order to get access to that data,  so to that interest rate,  we now need more than just the movements.  Instead of the movements, we want now, the entire account.  Because then we can take the movements from the account,  and also the interest rate.
//  Alright, so again, we will now change this function  and pass in the entire account,  and not just the movements array.
// And so then from there, we will be able to take  the movements that we need to calculate  these three statistics here.

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const withdrawals = acc.movements
    .filter((mov) => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposits) => (deposits * acc.interestRate) / 100)
    //  So right now, for all of the accounts, the interest rate is now calculated using this 1.2 interest rate. However, as we take a look at the accounts, each of them actually has a different interest rate.
    // So this one has 1.2, but this one has 1.5, and this one has less, so it gets a less interest. And so now of course, we also want to dynamically use this interest rate depending on the current user, right?
    .filter((deposits, i, arr) => {
      // console.log(arr);
      return deposits >= 1;
    })
    .reduce((accum, intr) => accum + intr, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

const updateUI = function (account) {
  displayMovements(account.movements);
  calcDisplayedBalance(account);
  calcDisplaySummary(account);
};


///////////////////////////////////
///////////////////////////////////
// Working with Event Handlers 

//////////////////////////////// Implementing the Find Method ///////////////////////////////////////


let currentAccount;
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

    // Updating the Ui

    updateUI(currentAccount);
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
      //  get access to also the current index, and the current entire array. So as always, besides the current element, these other two values are also available. But in practice, I never found these useful.
      // And second, the both the find and findIndex methods  were added to JavaScript in ESX.  And so they will not work in like super old browsers.  But don't worry, there is going to be a lecture  a little bit later on how to support  all of these old browsers.
      (acc) => acc.username === currentAccount.username
    );
    // .indexOf
    //  Now, you might notice that this is actually similar  to the indexOf method that we studied before.  So, indexOf,  and then here we can pass in some value, all right?  Now, the big difference here is that with indexOf,
    //  we can only search for a value that is in the array.  So, if the array contains the 23, then it's true,  and if not, then it's false.  But on the other hand, with findIndex,  we can create a complex condition like this one,
    // and of course, it doesn't have to be  the equality operator here.  It can be anything that returns true or false, okay?  And here we can simply check  if the array contains this value or not,  and if so, return the indexOf it.
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

  const amount = Number(inputLoanAmount.value);

  const requestedLoanValid = currentAccount.movements.some(
    (mov) => mov >= amount * 0.1
  );
  if (amount > 0 && requestedLoanValid) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

/////////////////////////////// Sorting Arrays ///////////////////////////////

let sortedState = false; // monitoring the state
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});



////////////////////////////// //////////////////////////////////


// Now, besides these obvious Iterables that I just mentioned,  like Maps or Sets another great example  of an array like structure  is the result of using querySelectorAll().

// So maybe you remember that querySelectorAll() returns,  something called a NodeList,  which is something like an array,  which contains all the selected elements.  But it's not a real array,  and so it doesn't have methods like map(), for example.

// But it's not a real array,  and so it doesn't have most of the array methods  like map() or reduce().  So if we actually wanted to use  a real array method like that on a NodeList,  we would first need to convert the NodeList to an array.

// And for that Array.from() is perfect.

labelBalance.addEventListener("click", function () { //So we can attach a EventListeners to every object. It doesn't have to be a button.
  
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll(".movements__value")]; // another way to get an array
});

// So again, let's pretend that we only have these values,  so all of these movements only stored here  in the user interface,  but we do not have them somewhere in our code.  So we don't have an array containing these values.
// But now let's say we want to calculate their sum.  And so therefore we need to somehow get them first

// from the user interface and then do the calculation  based on that.  So let's create a variable called movementsUI.  So the ones that we get from the user interface.


///////////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////// /////////////////////////////////////////////////
