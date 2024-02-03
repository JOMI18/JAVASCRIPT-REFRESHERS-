"use strict";

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
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

const accounts = [account1, account2];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//////////////////// Converting and Checking Numbers /////////////////////////////

// And so now let's start learning a little bit about numbers.
// And the first thing that you should know about numbers is that in JavaScript, all numbers are presented internally as floating point numbers. So basically, always as decimals, no matter if we actually write them as integers or as decimals.
console.log(23 === 23.0);

// Base 10 --> 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary base 2 --> 0 and 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // this will be difficult because of how difficult it is for js to represent 0.1
// Now, in this binary form, it is very hard to represent some fractions that are very easy to represent in the base 10 system that we are used to. So base 10 is basically the numbers from zero to nine, while binary is base 2 and so that's the numbers zero and one.

// Conversion
console.log(Number("23"));
console.log(+"23");

// Parsing
console.log(Number.parseInt("30px"));
console.log(Number.parseInt("30px", 10)); // the 10 representing base 10 ==> will prevent bugs
console.log(Number.parseInt("30px", 2));
console.log(Number.parseInt("e23", 10)); // this wont work because the first value in the string should be a number

console.log(Number.parseInt("  2.5rem  ")); // will only get integers
console.log(Number.parseFloat("  2.5rem  ")); // will get both --- go to if you need the value of a string

// Now, by the way, these two functions here are actually also so-called global functions. So we would not have to call them on Number.

// So this here also works. Okay, but this is the more traditional and old-school way of doing it.

console.log(parseFloat("  2.5rem  "));

// Now in modern JavaScript, it is more encouraged to call these functions actually on the Number object, okay? So we say that Number here provides something called a namespace, all right? So a namespace for all these different functions, like parseFloat, and parseInt. But anyway, let's now explore another function of the Number namespace

// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20X"));
console.log(Number.isNaN(23 / 0)); // And so this is not a number  is actually not a perfect way  for checking if a value is a number  because it doesn't consider this use case  and sometimes, this might very well happen.  And therefore, there is a better method called isFinite.

// Checking if value is number
// isFinite is is actually better to check if something is a number or not.
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20X")); // --- go to if you need to check if its a number
console.log(Number.isFinite(23 / 0));

// checking if its an integer
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

////////////////////  Math and Rounding /////////////////////////////

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3)); // only way to take cubic root

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, "23", 11, 2)); // coerces
console.log(Math.max(5, 18, "23px", 11, 2)); // but doesn't parse

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI);
console.log(Math.PI * Number.parseFloat("10px") ** 2);
// This is how we calculate the area of a circle  with this radius (10), all right?

console.log(Math.trunc(Math.random() * 6) + 1);

// Random dice rolls
const dice = Array.from(
  { length: 100 },
  (_, i) => Math.trunc(Math.random() * 100) + 1
);
console.log(dice);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20));

// Rounding integers {all do type coercion}
console.log(Math.trunc(23.3)); // removes decimal

console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); // takes it to 24
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3)); //takes it to 23
console.log(Math.floor("23.9"));

console.log(Math.trunc(-23.3)); //23
console.log(Math.floor(-23.3)); // 24 negatives work the other way around

// Rounding decimals
// toFixed returns a string not a number, ==> it works different to integers
//  it also works differently than in string methods
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));
// So this is a number, so it's a primitive, right? And primitives actually don't have methods. And so behind the scenes, JavaScript will do boxing. And boxing is to basically transform this to a number object, then call the method on that object. And then once the operation is finished it will convert it back to a primitive, okay?

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
