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

///////////////////////  Functions Returning Functions /////////////////////////
const greet = function (greeting) {
  // console.log(greeting);
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeter = greet("Hello");
greeter("Jonas"); //what matters here is that our first function a greet returned a new function that we stored into this variable. And so this variable is now just a function that we can call
greeter("Feran");
// And in case you're wondering why that actually works, it is because of something called a closure.

// or
greet("What's up,")("Pero & Pam"); // greet("What's up,") this is now a function

// And now this example might look a bit weird  and unnecessary for you Like what's the point  of having functions returning other functions?  Well, this will actually become extremely  useful in some situations.  And especially if we're using a really important  programming paradigm called functional programming.

// Mini challenge
// using arrow functions
const greetings = (greetMe) => {
  return (name) => {
    console.log(`${greetMe} ${name}`);
  };
};
const arrowGreeter = greetings("Welcome to the Arrow verse,");
arrowGreeter("Jonas");
arrowGreeter("Feran");

// Challenge
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);

greetArr("Hi")("Jonas");

///////////////////////  The call, apply, and bind Methods /////////////////////////
// Setting the this key word manually
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Jonas Schmedtmann");
lufthansa.book(635, "John Smith");

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book; // making a shallow copy of the method but its not a function

// Does NOT work
// book(23, "Sarah Williams");
//  Well, it's because this function here,  the book function is now just a regular function call  and so as we learned in one of the previous sections,  in a regular function call,  the this keyword points to undefined,  at least in strict mode.

////////// Call method
book.call(eurowings, 23, "Sarah Williams"); // the first one directs the this keyword to the  variable
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper"); // Instead, we called the call method and it's then this call method, which will call the book function with the this keyword set to eurowings.
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper");

////////// Apply method
// The only difference is that apply  does not receive a list of arguments  after the this keyword,  so it doesn't receive this list here  but instead, it's gonna take an array  of the arguments,

const flightData = [239, "Sarah Williams"];
book.apply(swiss, flightData);
console.log(swiss);

// better use is call then spreading the array
book.call(swiss, ...flightData);

////////// The bind Method
// Now, the difference is that bind  does not immediately call the function.  Instead it returns a new function  where this keyword is bound.  So it's set to whatever value we pass into bind.
const bookEW = book.bind(eurowings);
bookEW(45, "Paula Quavo");
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

const bookEW25 = book.bind(eurowings, 25); //And by the way, what we did here, so, basically specifying parts of the argument beforehand, is actually a common pattern called partial application. So essentially, partial application means that a part of the arguments of the original function are already applied, so which means, already set.
bookEW25("Paula Quavo");

///////// WITH EVENT HANDLER
lufthansa.planes = 300;
lufthansa.buyPlanes = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlanes(); // further proof that  the this keyword is set dynamically by what calls it
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlanes.bind(lufthansa));
// we learned that in an event handler function, that this keyword always points to the element on which that handler is attached to.

// And so we already know that the call method calls the function. And so that's not what we need. And so therefore, we use bind. Because we already know that bind is gonna return a new function.

/////////////// WITH PARTIAL APPLICATION
const addTax = (rate, value) => value + rate * value;
console.log(addTax(0.1, 100));

const addVAT = addTax.bind(null, 0.23); // the first has to refer to the this keyword and since we don't need it- it can be set to null
// addVAT = value => value + value * 0.23;
console.log(addVAT(500));
// When you want to do this yourself, just keep in mind that the order of the arguments then is important.

// Now you could argue that what we just did here  could easily have been done with default parameters.

// But this is actually different,  because this here is creating a brand new,  simply, more specific function  based on a more general function,  which is the addTax function.

// And of course, the example here  could be a lot more complex too, right?  So this really is different  because using binds,  actually it really gives us a new function.  So, it's as if we returned a new specific function  from the addTax function.

// MINI CHALLENGE
// rewrite this whole example here, but using the technique of one function returning another function.

const addTaxValues = function (values) {
  // console.log(values);
  return function (rates) {
    // console.log(rates);
    const amount = values + rates * values;
    console.log(
      `The Amount payed from a $${values} income at a tax rate of ${rates} is $${amount}`
    );
    return amount;
  };
};

const taxRates = addTaxValues(200);
taxRates(0.1);
console.log(taxRates(0.5));

// Jonas' Solution ==> how it actually works because its not the amount that is set, its the rate
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

///////////////////////  Immediately Invoked Function Expressions (IIFE) /////////////////////////

// So sometimes in JavaScript, we need a function that is only executed once. And then never again. So basically a function that disappears right after it's called once.
const runOnce = function () {
  console.log("This will never run again");
};
runOnce();

// IIFE
(function () {
  console.log("This will never run again");
  const isPrivate = 23;
  // So for example, this isprivate here is encapsulated inside of this function scope, that's created here. And data encapsulation and data privacy are extremely important concepts in programming. So many times we actually need to protect our variables, 
  // from being accidentally overwritten by some other parts of the program. Or even with external scripts or libraries.
  //But for now, keep in mind that it's important to hide variables. And that scopes are a good tool for doing this. And this is also the reason why The Immediately Invoked Function Expressions were invented. 
  // So basically, this pattern here. So this is not really a feature, of the JavaScript language. It's more of a pattern, that some developers came up with. And that then started to being used, by many other developers.
})();

// console.log(isPrivate);

(() => console.log("This will ALSO never run again"))();
// But you might be wondering, why was this pattern actually invented? Well, we already know that functions create scopes, right? And what's important here is that one scope does not have access to variables from an inner scope, right?
//  For example, right here in this global scope. We do not have access to any variables that are defined in the scope of any of these functions here, right?

{
  const isPrivate = 23;
  var notPrivate = 46;
  // Now, do you remember what also creates a scope in ES6? And that's right. Variables declared with let or const create their own scope inside a block.
}
// console.log(isPrivate);
console.log(notPrivate);

/////////////////////// Closures  /////////////////////////
// CLOSURES HAVE PRIORITY OVER SCOPE CHAIN
const secureBooking =function () {
  let passengerCount=0
  return function () {
    passengerCount++
    console.log(`${passengerCount} Passengers`);
    
  }
  
}
const booker= secureBooking()
booker()
booker()
booker()
console.dir(booker)
// So we can say that a closure makes a function remember all the variables that existed at the function's birthplace essentially, right?
// we can also say that thanks to the closure, a function does not lose connection to variables that existed at the function's birthplace.


////// MORE EXAMPLES ON CLOSURES
// EXAMPLE 1
let f

const g =function () {
  const a =23
  f =function () {
    console.log(a*23);
  }
}

g()
f()
console.dir(f);

// Re-assigning f function

const h =function () {
  const b =89
  f =function () {
    console.log(b*23);
  }
}

h()
f()
console.dir(f);

// EXAMPLE 2
const boardPassengers= function (n,wait) {
  // CLOSURES ALSO INCLUDE ARGUMENTS
  const perGroup =n/3

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000 // from s to ms
  )
  console.log(`We will start boarding in ${wait} seconds`);

}
const perGroup=1000 // proof that closures have priority over scope chain
boardPassengers(180, 6)



