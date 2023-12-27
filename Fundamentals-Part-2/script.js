////////////////////////// The Strict Mode /////////////////////////////////

"use strict"; // shows unnoticed  technical error messages & prevents use of reserved words
let hasDriversLicense = false;
const passTest = true;

if (passTest) {
  //   hasDriverLicense = true;
  hasDriversLicense = true;
}
if (hasDriversLicense) {
  console.log("I can drive");
}

////////////////////////// Functions  /////////////////////////////////
function logger() {
  console.log("My name is Jomi");
}

// calling / running/ invoking a function
logger();

function fruitProcessor(apples, oranges) {
  // apples and oranges are empty variables that would then receive the argument{the actual values}
  //   console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}

fruitProcessor(4, 6); // the value that is returned now becomes the function {that can be saved into a variable}

const fruitJuice = fruitProcessor(4, 6);
console.log(fruitJuice);
// console.log(fruitProcessor(4, 6));

// the function can then be reused
const appleOrangeJuice = fruitProcessor(2, 4);

console.log(appleOrangeJuice);

////////////////////////// Function Declaration vs Expressions /////////////////////////////////
// => declaration {you can call it before its defined}
function calcAge1(birthYear) {
  const age = 2037 - birthYear;
  return age;
}
const age1 = calcAge1(2005);
console.log(age1);

// => expression{the one you save in variables}
const calcAge2 = function (birthYear) {
  return 2024 - birthYear;
};
const age2 = calcAge2(2005);
console.log(age2);

////////////////////////// Arrow Functions /////////////////////////////////

const calcAge3 = (birthYear) => 2023 - birthYear;
const age3 = calcAge3(2005);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const ages = 2023 - birthYear;
  const retirement = 65 - ages;
  //   return retirement;
  return `${firstName} retires in ${retirement} years`;
};
console.log(yearsUntilRetirement(2005, "Jomi"));

////////////////////////// Functions in  Functions /////////////////////////////////
function cutFruitPieces(fruits) {
  return fruits * 4;
}
function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges`;
  return juice;
}
console.log(fruitProcessor(2, 3));

const calcAge = function (birthYear) {
  return 2023 - birthYear;
};

const yearsLeftUntilRetirement = function (birthYear, firstName) {
  const ages = calcAge(birthYear);
  const retirement = 65 - ages;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired `);

    return -1;
  }
};
console.log(yearsLeftUntilRetirement(2005, "Jomi"));
console.log(yearsLeftUntilRetirement(1920, "Jamie"));

// ==> Data Structures
////////////////////////// Arrays /////////////////////////////////
const friends = ["Michael", "Feran", "Pam"];
const yrs = new Array(1991, 1994, 20230);

console.log(friends[0], friends[2]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "Jay";
console.log(friends);

const firstName = "Jomiloju";
const person = [firstName, "Odedairo", 2024 - 2005, "student", friends]; // arrays expect expressions---{the one that produces values}
console.log(person);
console.log(person.length);

const calcAge4 = function (birthYear) {
  return 2024 - birthYear;
};
const years = [1990, 2005, 1985, 1764, 1223, 1002];
const age4 = calcAge4(years[0]);
const age5 = calcAge4(years[1]);
const age6 = calcAge4(years[3]);
const age7 = calcAge4(years[years.length - 1]);

const ages = [
  calcAge4(years[0]),
  calcAge4(years[1]),
  calcAge4(years[3]),
  calcAge4(years[years.length - 1]),
];

console.log(ages);

////////////////////////// Array Methods /////////////////////////////////
// => Adds Element
// 1. push -- adds elements to the end of an array
friends.push("Jason");
console.log(friends);
// const newLength = friends.push("Jason");
// console.log(newLength); // you can get the length directly {for push, amd unshift} by saving it to a variable because they return the length of the array

// 2. unshift-- adds elements to the front of an array

friends.unshift("John");
console.log(friends);

// Remove Element
// 3. pop-- removes  elements from the back
friends.pop();
console.log(friends);

// const popped = friends.pop(); // it {pop, shift}returns the popped elements, to see-- save it to a variable
// console.log(popped);

//4. shift -- removes elements from the front
friends.shift();
console.log(friends);

// Checks If Elements are Present

// 5. indexOf -- finds the index of element
console.log(friends.indexOf("Feran"));
console.log(friends.indexOf("Steven")); // if the element isn't there -- it'd be -1

// 6. includes -- it returns true or false {it uses strict equality}
console.log(friends.includes("Feran"));
console.log(friends.includes("Steven"));
friends.push(23);
console.log(friends.includes("23")); // this would be false

if (friends.indexOf("Feran")) {
  console.log("You have a friend called Feran");
}

////////////////////////// Objects /////////////////////////////////
const human = {
  firstName: "Oluwajomiloju",
  lastName: "Odedairo",
  age: 2024 - 2005,
  status: "student",
  friends: ["Michael", " Feran", " Peter"],
};

console.log(human);
console.log(human.lastName); //retrieving data-- its a direct property {the . is an operator}
console.log(human["firstName"]); // you can put an expression in the square brackets

const nameKey = "Name";
console.log(human["first" + nameKey]);
console.log(human["last" + nameKey]); // this can't work the dot operator

// ADVANTAGE OF USING the bracket instead
// const interestedIn = prompt(
//   "What do you want to know about me? Choose between age, firstName, lastName, status, and friends"
// );
// console.log(human.interestedIn); // this wont work because interested is not a property of human
// console.log(human[interestedIn]); // this will work because  an expression can be used within the brackets

// if (human[interestedIn]) {
//   console.log(human[interestedIn]);
// } else {
//   console.log(
//     "Wrong Request! Choose between age, firstName, lastName, status, and friends"
//   );
// }

// Adding to objects
human.location = "Nigeria";
human["instagram"] = "@jomi.loju_x";

console.log(human);

// Mini-Challenge
// Jonas has 3 friends, and his best friend is called Michael

console.log(
  `${human.firstName} has ${human.friends.length} friends, they are ${human.friends}. Her best friend is called ${human.friends[1]} `
);

////////////////////////// Object Methods /////////////////////////////////

let personalInformation = {
  firstName: "Oluwajomiloju",
  lastName: "Odedairo",
  birthYear: 2005,
  status: "student",
  friends: ["Michael", " Feran", " Peter"],
  hasDriversLicense: true,
  // calcAge: function (birthYear) {
  //   return 2024 - birthYear;
  // },

  // calcAge: function () {
  //   console.log(this); // this is referring to the name of the object
  //   return 2024 - this.birthYear; // its better to use the this keyword in this case too, because it wont violate the do no repeat principle--- especially when the object name is changed
  // },

  calcAge: function () {
    this.age = 2024 - this.birthYear; // this is the best way because, the age wont need to constantly recalculated
    return this.age;
  },
  // any function attached to an object is a method
  // declarations won't work
};
// console.log(personalInformation.calcAge(2005));
// console.log(personalInformation["calcAge"](2005)); // calcAge has to be a string for this one to work

//  we shouldn't need to repeat the birthYear, it violates the no repeat principle
//  instead we use the this keyword since we already have birthYear as a property

console.log(personalInformation.calcAge());
console.log(personalInformation.age); // this way you can call it directly

// Mini-Challenge
// write a method called getSummary,this method should return a string
// Jonas is a 46-year old teacher, and he has a/none driver's license

const Information = {
  firstName: "Oluwajomiloju",
  lastName: "Odedairo",
  birthYear: 2005,
  status: "student",
  friends: ["Michael", " Feran", " Peter"],
  hasDriversLicense: false,
  calcAge: function () {
    this.age = 2024 - this.birthYear;
    // this is the best way because, the age wont need to constantly recalculated
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()} ${
      this.status
    }, and she has ${this.hasDriversLicense ? "a" : "no"} driver's license`;
  },
};
console.log(Information.getSummary());

////////////////////////// Loops /////////////////////////////////

// If-Else is a control Structure, just like loops

for (let reps = 1; reps <= 10; reps++) {
  // for loops keeps running while condition is true
  console.log(`Lifting Weights repetition ${reps}`);
}

personalInformation = [
  "Oluwajomiloju",
  "Odedairo",
  2005,
  "student",
  ["Michael", " Feran", " Peter"],
  true,
];
console.log(personalInformation);

const types = [];
for (let i = 0; i < personalInformation.length; i++) {
  // const element = personalInformation[i];
  // Reading An Array
  console.log(personalInformation[i], typeof personalInformation[i]);

  // Filling an array
  // types[i] = typeof personalInformation[i];
  types.push(typeof personalInformation[i]); // make sure in adding you add from the back of the array
}
console.log(types);

const birthYears = [1991, 2005, 1980, 1947, 2000];
const currentAges = [];

for (let i = 0; i < birthYears.length; i++) {
  currentAges.push(2024 - birthYears[i]);
}
console.log(currentAges);

// continue and break  statements for loops
// => continue {exits the current iteration and continues the next one}
//  => break {terminates the whole loop}

console.log("-------ONLY STRINGS -------");
for (let i = 0; i < personalInformation.length; i++) {
  if (typeof personalInformation[i] !== "string") {
    continue;
  }
  console.log(personalInformation[i], typeof personalInformation[i]);
}
console.log("-------BREAK W NUMBERS  -------");
for (let i = 0; i < personalInformation.length; i++) {
  if (typeof personalInformation[i] === "number") {
    break;
  }
  console.log(personalInformation[i], typeof personalInformation[i]);
}

////////////////////////// Looping BackWards and Loops in Loops /////////////////////////////////

personalInformation = [
  "Oluwajomiloju",
  "Odedairo",
  2005,
  "student",
  ["Michael", " Feran", " Peter"],
  true,
];
// console.log(personalInformation);

for (let i = personalInformation.length - 1; i >= 0; i--) {
  console.log(i, personalInformation[i], typeof personalInformation[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`----- Starting exercise ${exercise}`);
  for (let reps = 1; reps < 6; reps++) {
    console.log(`Exercise ${exercise}: Lifting weight repititon ${reps}`);
  }
}

////////////////////////// While Loops /////////////////////////////////

for (let reps = 1; reps <= 10; reps++) {
  console.log(`Lifting Weights repetition ${reps}`);
}
// DIFFERENCE
let reps = 1;
while (reps <= 10) {
  console.log(` WHILE:Lifting Weights repetition ${reps}`);
  reps++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
//Math.random() gives decimal value --- so trunc it

// console.log(dice);

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) {
    console.log("Loop is about to end");
  }
}
