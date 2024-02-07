"use strict"; ///////////////////////////////////////////////
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
// And the first thing that you should know about numbers is that in JavaScript, all numbers are presented internally as floating point numbers.
// So basically, always as decimals, no matter if we actually write them as integers or as decimals.
console.log(23 === 23.0);

// Base 10 --> 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary base 2 --> 0 and 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // this will be difficult because of how difficult it is for js to represent 0.1
// Now, in this binary form, it is very hard to represent some fractions that are very easy to represent in the base 10 system that we are used to.
//  So base 10 is basically the numbers from zero to nine, while binary is base 2 and so that's the numbers zero and one.

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

// Now in modern JavaScript, it is more encouraged to call these functions actually on the Number object, okay? So we say that Number here provides
//  something called a namespace, all right? So a namespace for all these different functions, like parseFloat, and parseInt.
//  But anyway, let's now explore another function of the Number namespace

// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20X"));
console.log(Number.isNaN(23 / 0)); // And so this is not a number  is actually not a perfect way  for checking if a value is a number  because it doesn't
//  consider this use case  and sometimes, this might very well happen.  And therefore, there is a better method called isFinite.

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
console.log((2.7).toFixed(0)); // decimal place
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));
// So this is a number, so it's a primitive, right? And primitives actually don't have methods. And so behind the scenes, JavaScript will do boxing.
//  And boxing is to basically transform this to a number object, then call the method on that object.
// And then once the operation is finished it will convert it back to a primitive, okay?

///////////////////////  The Remainder Operator //////////////////////////

console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

// Now, one thing that is many times used for in programming, is to check whether a certain number is even or odd. So, even numbers are zero, two, four,
//  six, eight, ten and so on and so forth.

// And the odd numbers are all the others.  So, one, three, five, seven, etcetera.  So, when is a number even?  Well, its even if its divisible by two.
//  And divisible by two means that if we divide it by two,  the remainder is zero.
console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

//  to check whether a certain number is even or odd

const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

///////////////////////  Numeric Separators  //////////////////////////
// We can use a feature called "Numeric Separators" to format numbers in a way that is easier for us, or for other developers to read and to understand.

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);
// Numeric separators are simply underscores  that we can place anywhere that we want in  or numbers,  and which will make it really easy to understand
// and to parse numbers this large.  Using the underscore here as a thousand separator,  then makes it really easy to understand,

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

// restrictions to placement
// const PI = _3.1415;
// const PI = 3._1415;
// const PI = 3_.1415;
// const PI = 3.14__15;
// const PI = 3.1415_;
const PI = 3.1415;
console.log(PI);

// And now just one final detail that we need to be aware of is that when we try to convert strings, that contain underscores, to a number that
// will not work as expected.

console.log(Number("230_000")); // is that you should really only use, these numeric separators, when you are writing down numbers like this. Really in the code.
//  If you need to store a number in a string,
// for example, in an API, or if you get a number as a string from an API, you should not use underscores in there, because then JavaScript will
// not be able to parse the number correctly out of that string.
console.log(parseInt("230_000"));

//////////////////////  BigINT --> primitive type ///////////////////////////
// And so this is essentially the biggest number that JavaScript can safely represent, okay. Or actually is 53. So this is the biggest number, alright.
//  And it is two, because again we are working with base two,

// which has only zeros and ones.  And this number is so important  that it's even stored into the number namespace  as MAX_SAFE_INTEGER.

console.log(2 ** 53 - 1); // base 2 53 from the 64 bit and -1 because it starts from index 0
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// So, this can be a problem sometimes because in some situations we might need really, really big numbers. Way bigger than this one here, for example,
// for database IDs or wheN interacting with real 60 bit numbers and these numbers are actually used in other languages. And so we might, for example
// from some API, get a number that is larger than this.  And then we have no way  of storing that in JavaScript,  at least not until now,
//  because now starting from IES 2020  a new primitive was added,  which is called BigInt.

console.log(4838430248342043823408394839483204);
console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302)); // should be used with smaller numbers

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);

// MATH OPERATIONS NOT GONNA WORK
// console.log(Math.sqrt(16n));

const huge = 20289830237283728378237n;
const num = 23;
// console.log(huge * num); // you can't mix big int with other types
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20); // false ==> bigint != num  (no type coercion)
console.log(typeof 20n);
console.log(20n == 20); // true ==> loose equality ( type coercion)
console.log(20n == "20");
//  when working w strings
console.log(huge + " is REALLY big!!!");

// Divisions
console.log(11n / 3n); // gets the closest bigint (cuts decimal out)
console.log(10 / 3);

/////////////////////   Creating Dates => another type of objects like maps sets that have their own method ////////////////////////////

const now = new Date();
console.log(now);

console.log(new Date("Aug 02 2020 18:05:41"));
console.log(new Date("December 24, 2015")); // So JavaScript is pretty smart in parsing out the string that we write here.
// Now however, it's generally not a good idea  to do this because it can be quite unreliable, now right?  However, if the string was actually created
// by JavaScript itself, then of course it is pretty safe.
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // year month(in js is 0 based so 10 is nov, but in the real world is 11) date hour min sec

console.log(new Date(2037, 10, 31)); // js corrects the day
console.log(new Date(2037, 10, 33));

console.log(new Date(0)); // unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // convert from days to milliseconds
// days to hours to min to seconds to milliseconds
// (3 * 24 * 60 * 60 * 1000) => 259200000 // the result here we call the timestamp (And remember that the timestamp is the milliseconds, which have passed
//  since January 1, 1970, so get time.)

// Working with dates
console.log("-----FUNCTIONALITY------");
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getYear()); // but never use this
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // DAY OF THE WEEK, ALSO ZERO BASED
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // And so that's one of the very useful cases is when you want  to convert a particular date object into a string
// that you can then store somewhere.
console.log(future.getTime());

// THE TIME STAMP CAN THEN BE REVERSED
console.log(new Date(2142256980000));

// GIVES CURRENT TIMESTAMP
console.log(Date.now());

//  THERE ARE SET VERSIONS FOR ALL OF THE GETS
future.setFullYear(2040);
console.log(future);

/////////////////////// Operations With Dates //////////////////////////

///////////////////////////////////////
//
const fut = new Date(2037, 10, 19, 15, 23);
console.log(+fut);
// Now if you need really pretty sighs calculations, for example, including time changes due to daylight saving changes, and other weird edge cases like that,
// then you should use a date library like moment dot js.  And that's a library  that's available for free for all JavaScript developers.

const calcDaysPassed = (date1, date2) =>
  // Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)); // hours and mins are included

// const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
const days1 = calcDaysPassed(
  new Date(2037, 3, 4),
  new Date(2037, 3, 14, 10, 8)
);
console.log(days1);

////////////////////// Internationalizing Dates (Intl) ///////////////////////////

// const now = new Date();

const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  // month: "long",
  // month: "2-digit",
  year: "numeric",
  // year: "2-digit",
  // year: "long",
  // weekday: 'long',
  // weekday: 'narrow',
};

// better to get the locale from the users browser
const locale = navigator.language;
console.log(locale);

console.log(new Intl.DateTimeFormat("en-US", options).format(now));
console.log(new Intl.DateTimeFormat(locale, options).format(now));
console.log(new Intl.DateTimeFormat("en-US").format(now));
console.log(new Intl.DateTimeFormat("en-GB").format(now));
console.log(new Intl.DateTimeFormat("ar-SY").format(now));

// And to get these different codes,  let's just Google ISO language code table.  And then the one that's easiest to understand  is this one here.  So go to the one that has lingos.net,
//  and then from there you can find your own code  and then experiment with that

////////////////////  Internationalizing Numbers (Intl) /////////////////////////////
const nums = 3884764.23;

const option = {
  // style: "unit", if unit isnt used here it ignores the unit property
  style: "currency",
  // style: "percent",
  unit: "celsius",
  // unit: "miles-per-hour",
  currency: "EUR", // you have to set currency--- its not determined by the locale
  // useGrouping: false,
};

console.log("US:      ", new Intl.NumberFormat("en-US").format(nums));
console.log("US:      ", new Intl.NumberFormat("en-US", option).format(nums));
console.log("Germany: ", new Intl.NumberFormat("de-DE", option).format(nums));
console.log("Syria:   ", new Intl.NumberFormat("ar-SY", option).format(nums));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

//////////////////////  Timers: setTimeout and setInterval  ///////////////////////////
// First, the set timeout timer runs just once,  after a defined time, while the set interval timer  keeps running basically forever, until we stop it.
// So basically, we can use set timeout to execute some code at some point in the future.

// setTimeout
console.log("TIMERSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
setTimeout(() => console.log("Here is your pizza 🍕"), 3000);

const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);

// And so with this,  we really delayed calling this function here, right?  Yeah, by exactly three seconds.  And we can also say that we schedule this function call
//  for three seconds later, all right.
console.log("Waiting...");

//  Now, what's really important to realize here  is that the code execution does not stop here at this point.
// All right, so when the execution of our code  reaches this point,
// it will simply call  the set timeout function,  it will then essentially register  this callback function here to be called later.
// And then the code execution simply continues.

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

setInterval;
setInterval(function () {
  const now = new Date();
  console.log(
    `The time is ${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`
  );
}, 1000);
