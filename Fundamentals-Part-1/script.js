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
  console.log("Height is Undefined"); // because 0 is falsy value
}

////////////////////////// Equality Operators /////////////////////////////////

if (age === 18) {
  console.log("I'm Legal");
}
if ("18" == 18) {
  // this does coercion, avoid this during comparison
  console.log(true);
}

// const favorite = prompt("What's your favorite number?");
// const favorite = Number(prompt("What's your favorite number?"));
console.log(favorite, typeof favorite);

if (favorite === 22) {
  console.log("Cool! 22 is an amazing number");
} else if (favorite === 25) {
  console.log("Cool! 25 is an amazing number");
} else {
  console.log("Cool! The Number isn't 22 or 25 though");
}

if (favorite !== 9) {
  console.log("Why not 23");
}

////////////////////////// Boolean Logic /////////////////////////////////

// AND -- if one value is false, everything would be false....but if both A snd B is True- then they'd  both be true ==> True when ALL are true

// OR -- If at least one value is true then the result would be true... but if they're both false => then the result will be false  ==> True when ONE is true

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
