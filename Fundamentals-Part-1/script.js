// JS RUNS FROM TOP TO BOTTOM

let js = "amazing";
// if (js === "amazing") {
//   alert("Javascript is FUN");
// }
console.log(40 + 8 + 23 - 10);

///////////////// Learning Data Types //////////////////////////

// => Primitive
// 1. Numbers --decimals and integers
let age = 23;
// 2. Strings- for texts
let firstName = "Oluwajomiloju";
// 3. Boolean- true or false
let fullAge = true;
// 4. undefined- a variable with undefined value
let children;
// 5. Null
// 6. SYmbol
// 7. BigInt

///////////////// Operators //////////////////////////

// 1. Arithmetic - {%, *, -, +, ** }
const now = 2045;
const ageJonas = now - 1991;
const ageJomi = now - 2005;
console.log(ageJonas, ageJomi);

// Concatenating Strings
const lastName = "Odedairo";
console.log(firstName + " " + lastName);

// 2 typeOf - tells you the data type
let year = 1991;
console.log(typeof year);

// 3. Assignment {=, +=}
let x = 10 + 5;
console.log(x);
x += 10; // x = x + 10
x *= 4; // x = x * 4
x /= 2;
x++;
x--;
console.log(x);

// 4. Comparison {works w boolean-- >, < , >=, <=}
console.log(ageJonas > ageJomi);

///////////////// Strings and Template Literals /////////////////
const job = "Web Developer";

const jomiloju =
  "I'm " + firstName + ", a " + ageJomi + " year old " + job + "!";
console.log(jomiloju);

const jomiNew = `I'm ${firstName}, a ${ageJomi} year old ${job}`;
console.log(jomiNew, `This is a template literal`);
console.log(`template literals 
can be used to 
create multiple lines`);

///////////////// If - Else Statements /////////////////

const ageSarah = 12;
// const isOldEnough = ageSarah >= 18;
if (ageSarah >= 18) {
  console.log("Sarah can Start driving 🥰");
} else {
  console.log("Sarah can't drive yet ");
  const yearsLeft = 18 - ageSarah;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years`);
}

let century;
if (year <= 2000) {
  century = 20;
} else {
  century = 21;
}

console.log(century);
// any variable defined in a code block will not be available outside the code block

///////////////// Type Conversion {MANUALLY CONVERTS TYPES} and Coercion {JS CONVERTS BEHIND THE SCENES}/////////////////

// Conversion
const inputYear = "1991";
console.log(Number(inputYear)); //Strings to Numbers
console.log(Number(inputYear) + 18);
console.log(String(23)); //Numbers to Strings

// Coercion
console.log("I am " + 23 + " years old"); // + triggers number to strings conversion
console.log("54 " - "23" / 3); // {-, *, /} triggers strings to number conversion

/////////////////////// Truthy and Falsy Values////////////////////////////

// =>falsy values = 0," ", undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Jomi"));
console.log(Boolean({}));

const money = 0;
if (money) {
  console.log("Go get a dog");
} else {
  console.log("Go get a Job"); // because 0 is falsy value
}

let height;
if (height) {
  console.log("Yay! Height is defined");
} else {
  console.log("Height is Undefined"); // because height is undefined
}

////////////////////////// Equality Operators /////////////////////////////////

if (age === 18) {
  console.log("I'm Legal");
}
if ("18" == 18) {
  // this does coercion, avoid this during comparison==> always use strict to prevent bugs
  console.log(true);
}

// const favorite = prompt("What's your favorite number?");
// const favorite = Number(prompt("What's your favorite number?"));
// console.log(favorite, typeof favorite);

// if (favorite === 22) {
//   console.log("Cool! 22 is an amazing number");
// } else if (favorite === 25) {
//   console.log("Cool! 25 is an amazing number");
// } else {
//   console.log("Cool! The Number isn't 22 or 25 though");
// }

// if (favorite !== 9) {
//   console.log("Why not 23");
// }

////////////////////////// Boolean Logic /////////////////////////////////

// AND -- if one value is false, everything would be false....but if both A snd B is True- then they'd  both be true ==> True when ALL are true
// ATAT

// OR -- If at least one value is true then the result would be true... but if they're both false => then the result will be false  ==> True when ONE is true
// OTOT

// NOT -- inverts true / false values {has higher precedence over OR and AND operators}

// let girlsAge=16

// Boolean Variables
// A: Age is greater or equal to 20 {false}
// B: Age  is less than 30 {true}

// so:
// !A = true
// A AND B =FALSE
// A OR B =TRUE
// !A AND B = TRUE
// A AND !B =FALSE

const hasDriversLicense = true;
const hasGoodVision = true;
console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

const shouldDrive = hasDriversLicense && hasGoodVision;
if (shouldDrive) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive");
}

const isTired = true;
console.log(hasDriversLicense || hasGoodVision || isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive");
}

////////////////////////// The Switch Statement /////////////////////////////////

let day = "monday";
switch (day) {
  case "monday": // day === "monday"
    console.log("Plan course Structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend");
  default:
    console.log("Not a valid day");
  // break;
}

day = "friday";

if (day === "monday") {
  console.log("Plan course Structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy the weekend");
} else {
  console.log("Not a valid day");
}

////////////////////////// Statements and Expressions /////////////////////////////////

// Expressions- a piece of code that produces a value ==> 3 + 4, 1991, true && false & !false
// Statements are like full sentences that translate our actions
if (23 > 10) {
  const str = "23 is bigger"; // this is an expression
} // this is a statement

// note: in template literals you can only write expressions not statements

////////////////////////// The Conditional Operator- Ternary Operator /////////////////////////////////
const agePam = 15;
agePam >= 18
  ? console.log("I like to drink wine")
  : console.log("I have to drink water");

const drink = agePam >= 18 ? "wine" : "water";
console.log(drink);

// instead of
let drink2; // remember that this has to be defined outside
if (agePam >= 18) {
  drink2 = "wine";
} else {
  drink2 = "water";
}
console.log(`I like to drink ${agePam >= 18 ? "wine" : "water"}`);
