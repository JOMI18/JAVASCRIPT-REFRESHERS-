"use strict";

/////////////////////// Default Parameters /////////////////////////
const flightBookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  // price = 100 //could also be an expression
  price = 100 * numPassengers
) {
  // ES5 WAY
  // numPassengers = numPassengers || 1; // this works cos of short circuiting... if the first is falsy then it returns the last one
  // price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  flightBookings.push(booking);
};
createBooking("LH123x");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);

createBooking("LH123", undefined, 1000); // skipping a parameter, works cos it sets it to the default

/////////////////////// How Passing Arguments Works: Value vs. Reference /////////////////////////
const flight = "WST12";

const person = {
  name: "Oluwajomiloju Odedairo",
  passport: 12456778765433,
};

const checkIn = function (flightNum, passenger) {
  // And so let's now change that flight number parameter here,  and this is usually not a good practice to do,  so you should not change the parameters of a function,
  flightNum = "WDR45";
  // this wont work because flight is a primitive data type and flightNum just creates a copy
  // So this would be exactly the same as writing  flightNum = flight;
  passenger.name = "Mrs. " + passenger.name;
  //   So when we pass a reference type to a function,  what is copied is really just a reference  to the object in the memory heap.
  // so it works because but they both point to the same object in memory. And so that's exactly what is also happening here,
  //   console.log(passenger);
  if (passenger.passport === 12456778765433) {
    // assuming the number came in from a database API
    // alert("Checked in");
    console.log("Checked in");
  } else {
    // alert("Wrong passport!");
    console.log("Wrong passport!");
  }
};

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

checkIn(flight, person);
console.log(flight);
console.log(person);

// Alright, so in summary, passing a primitive type  to a function is really just the same  as creating a copy like this, outside of the function.  So the value is simply copied.

// On the other hand, when we pass an object to a function, it is really just like copying an object like this. And so whatever we change in a copy will also happen in the original.

// Example of problem that can be created
const newPassport = function (persons) {
  persons.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(person);
checkIn(flight, person);

// there are two terms that are used all the time  when dealing with functions,  which is passing by value, and passing by reference,  and many experienced programmers that are new to JavaScript

// have some confusion between these terms and how it works in JavaScript. And so I wanna quickly address that here as well.

// So JavaScript does not have passing by reference,  only passing by value,  even though it looks like it's passing by reference.

// So there are languages like C++,  where you can pass a reference to any value,  instead of the value itself.

// This works even with primitives,

// so you could pass a reference to the value of five,  and then the original value,  outside of the function, would be changed.  And this is called pass by reference.

// But once again, JavaScript does not have pass by reference.

// So if you already know some programming, but are new to JavaScript, be sure to understand this. And I know it's confusing, because as we just learned, for objects, we do in fact pass in a reference. So the memory address of the object.

// However, that reference itself is still a value.  It's simply a value that contains a memory address.  So basically we pass a reference to the function,  but we do not pass by reference,

///////////////////////  First-Class and Higher-Order Functions /////////////////////////

// So, first class functions is just a feature that a programming language either has or does not have. All it means is that all functions are values. That's it. There are no first class functions in practice, okay?

// It's just a concept. There are however higher order functions in practice, which are possible because the language supports first class functions.

/////////////////////// Functions Accepting Callback Functions  /////////////////////////
const oneWord = function (str) {
  // return str.replace(/ /g, "").toLowerCase();
  return str.replaceAll(" ", "").toLowerCase();
};

// console.log(oneWord("Javascript Is FUN"));

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

const transformer = function (str, fn) {
  console.log(`----- Transformed by: ${fn.name} ------ `);
  console.log(`Original String: ${str} `);
  console.log(`Transformed String: ${fn(str)} `);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);
// the callback functions. And that's because we do not call them ourselves. But instead we call JavaScript to basically tell them later.

// JS uses callbacks all the time
const high5 = function () {
  console.log("👋");
};
document.body.addEventListener("click", high5);
["Jonas", "Martha", "Adam"].forEach(high5);

// ADVANTAGES OF CALL-BACKS
// Why our callback functions so much used in JavaScript and why are they so helpful?

// 1. Well, the first big advantage of this is that it makes it easy to split up or code into more reusable and interconnected parts. So that's exactly what we have here, right.

// We have all of this functionality here,  nicely split up into their own functions,  and that itself is really helpful.

// 2. But there is a second and way more important advantage,  which is the fact that callback functions  allow us to create abstraction.

// So let me explain what that means.  So what we did here in our code example was to create a  level of abstraction and abstraction  is something really important in programming.  So basically what abstract and means,

// is that we hide the detail of some code  implementation because we don't really care  about all that detail.  And this allows us to think  about problems at a higher more abstract level.  And so that's why it's called an abstraction.

// So coming back to our example here, this transform a function does not care at all, how the string is transformed. It doesn't care about this level of detail. Okay, all that wants to do is to transform a string, but it doesn't care how it should do it.
// So what I mean is that we could have taken, this coat here and written it directly into transformer, or even this coat here, right.

// That would have worked just the same,  but instead we abstracted this  coat away into other functions.  So again, we created a new level of abstraction  and by doing this or main transformer function,  here is really only concerned  with transforming the input string itself.
//  But no matter how that transforming itself actually works.  So it's basically delegating the string transformation  to the other lower level of functions,
// which are these two.  Okay, and I hope this makes sense for you,  but we will also come back to this idea of abstraction  later when we talk about object oriented programming.

// REAL WORLD PRACTICE EXAMPLE
// "A restaurant is trying to streamline the process of handling orders for the day.
//  Can you create a function that takes in details of a customer's order, such as their name, the meal they want, the number of plates,
//  the type and quantity of drinks, and returns a message confirming the order?""

const meals = [];
const consumers = [
  {
    name: "Oluwajomiloju",
    meal: "Pancakes and Plantain with some eggs",
    numPlates: 4,
    numDrink: 1,
    drink: "Hollandia ",
  },
  {
    name: "Feran",
    meal: "Fries, Chicken and Burger",
    numPlates: 2,
    numdrink: 2,
    drink: "Zobo",
  },
  {
    name: "Pam & Pero",
    meal: "Sharwarma and Pizza",
    drink: "Coke",
  },
];

const order = function (name, meal, numPlates = 1, numDrink = 1, drink) {
  // ({ name, meal, numPlates, drink } = consumer);
  const orderReady = `Order by ${name}: ${numPlates} ${meal} with ${numDrink} ${drink} drink `;
  return orderReady;
};

const mealsPrepared = function (customer, fn) {
  // const ready = `Meal ready for Mrs ${customer.name} | You ordered, ${fn(
  //   customer
  // )}`; // problem here is that its receiving the entire object not the properties

  const ready = `Meal ready for ${customer.name} | ${fn(
    customer.name,
    customer.meal,
    customer.numPlates,
    customer.numDrink,
    customer.drink
  )}`;
  // console.log(ready);
  meals.push(ready);

  return ready;
};

for (const consumer of consumers) {
  const readyMessage = mealsPrepared(consumer, order);
  console.log(readyMessage);
}
console.log(meals);

///////////////////////  /////////////////////////
///////////////////////  /////////////////////////
///////////////////////  /////////////////////////
///////////////////////  /////////////////////////
