'use strict';
///////////////////// Scoping in Practice //////////////////////

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;

    if (birthYear >= 1981 && birthYear <= 1996) {
      const str = `Oh and you're a millennial, ${firstName}`;
      // const and let variables are block scoped
      console.log(str);
    } else {
      var millennial = false; // var isn't block scoped
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Feran'; // this will work because it is now scoped to this function, therefore it would affect the log

      const str = `Oh and you're not a millennial, ${firstName}`;
      // const and let variables are block scoped
      console.log(str);
      function add(a, b) {
        return a + b;
      }
      console.log(add(3, 4));
      // Reasssigning outer scope's variable
      output = 'NEW OUTPUT'; // this will work because its just redefining it
    }
    // add(3, 4); // this wont work because functions are block scoped
    // console.log(add(3, 4)); // it will however work if strict mode is off... which is not advisable
    // console.log(str); // error
    console.log(millennial); // so this will work
  }
  printAge();

  return age;
}

const firstName = 'Jomi';
calcAge(2005);
// console.log(age); // error cos its unavailable outside its scope
// printAge()  // error cos its unavailable outside its scope

// And so this calcAge function here is,  as we learned in the last lecture, defined in a global scope.

// And that's because it is here in the top level code, right?

// Also, this function here creates its own scope.

// And that scope is gonna be equivalent to the variable environment of its execution context.

// Now as you see, this first name variable is not actually in this scope of the calcAge function.

// However, it is a global variable that we defined out here.

// And so therefore, through the scope chain, it's gonna be made available also inside of this scope.
// So inside of this function, right?

// So here in the global scope, we do not have access to any variables defined in any other scope.

///////////////////// Hoisting and TDZ in Practice ////////////////////

// ==> Variable
console.log(me);
//Well, the first console dot log result in undefined, and that's because variables declared with var are actually hoisted, but they are hoisted to the value of undefined. And so therefore when we try to access them undefined is exactly the result that we get.

// console.log(job);
// console.log(year);
//on the contrary we have this let variable,and so here we see that we cannot access job before initialization.And so that's exactly the kind of error that I showed you in the last slide.And the origin of this error is the fact that the job variable is still in the temporal dead zone here at this point.Right, so remember that the temporal dead zone of a variable declared with a let or const,starts from the beginning of the current scope

const year = 2024;
let job = 'student';
var me = 'Jomi';

// ==> Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));
function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;
// cannot access addExpression before initialization. And so that's exactly the same error that we got before here with this let and const variables. And that's because this function here right now is simply a const variable too. And so it means that it's now also in the temporal dead zone right? So again we are simply assigning a function value to this variable. And since this variable was defined with const, it is now in a temporal dead zone

// Example
console.log(numProducts);

if (!numProducts) {
  deleteShoppingCart();
}
var numProducts = 10;
function deleteShoppingCart() {
  console.log('All products deleted');
}

// solutions--Best Practices {not the rules of how it works in JavaScript}

// Well, as a first step, as I told you many times

// 1. just don't use var to declare variables.

// Use const most of the time to declare variables

// and let, if you really need to change the variable later.

// 2. Also in order to write clean code, you should declare your variables at the top of each scope.

// That will just make your code

// at least look a little bit better.

// 3. Finally, always declare all your functions first

// and use them only after the declaration.

// And this applies to all types of functions, even function declarations, which are hoisted. So you could use function declarations before you declare them, but still just don't do that it's just not clean.

// Another difference between const, let and var
// wINDOW-- the global object in the browser

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

// that variables declared with var, will create a property on the global window object.

////////////////////////// The this Keyword in Practice ////////////////////////

console.log(this); // it points to the global windows object in the browser

const calcAge2 = function (birthYear) {
  const age = 2037 - birthYear;
  console.log(age);
  console.log(this);
  //in strict mode its undefined but in sloppy mode it points to the global object
};
calcAge2(2005);

const calcAge3 = (birthYear) => {
  const age = 2037 - birthYear;
  console.log(age);

  console.log(this);
  // the arrow function doesn't get its own this key word... it takes on the parent {which in this case is the window}
};
calcAge3(2015);

let jonas = {
  year: 1991,
  calcAge4: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge4();

// So here we wrote the calcAge  method inside of the Jonas object.

// And so we might think

// that this is the reason why the disc keyword points to Jonas, but that is not true.

// The reason that the disc keyword will point to Jonas in this case is

// because Jonah's was the object calling debt method

// and that's a subtle, but very important difference. jonas.calcAge4();

const matilda = {
  year: 2017,
};

// method borrowing
matilda.calcAge4 = jonas.calcAge4; // here we copied it from jonas to matilda

console.log(matilda);
console.log(matilda.calcAge4());
// const f = jonas.calcAge4;
// f();

///////////////////// Regular Functions vs. Arrow Functions ////////////////////

jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge4: function () {
    console.log(this);
    console.log(2037 - this.year);

    // problem
    // const isMillennial = function () {
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // };

    // solution 1
    // const self = this; // self or that
    // const isMillennial = function () {
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // solution 2
    const isMillennial = () => {
      console.log(self.year >= 1981 && self.year <= 1996);
    }; // this works cos in this case the parent scope is jonas
    isMillennial();
    // And indeed, the this key word here is undefined. So why is that? Well, if we think about this, then this here is really just a regular function call, isn't it? It is a regular function call, even though it happens inside of a method. And the rule says that inside a regular function call, which this clearly is, that this keyword must be undefined. And so therefore it is undefined right here. So this is just as if this function was outside of this method. So if we copy this function out here, we would get the exact same result.
  },
  greet: () => {
    console.log(`Hey ${this.firstName}`); // its going to the window object because arrows don't have
  },
}; // this is an object literal, not a scope block
jonas.greet();
// using var here is a problem because it would set firstname to jonas on the global object
jonas.calcAge4();

// arguments keyword
const addExpress = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpress(2, 5);
addExpress(2, 5, 8, 12); // its there in the argument array, so you can loop through it and use it

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8); // this wont work because the argument only exists in normal functions

/////////////////////////////// Objects{reference values} vs. primitives{numbers, strings, booleans} /////////////////////////////

let age = 30;
let oldAge = age;
age = 31;
console.log(age); // each variable will be saved in its own piece of memory in the stack
console.log(oldAge); // we expect age to still be 30, because of where it was declared

const person = {
  name: 'Jonas',
  age: 30,
};
const friend = person;
friend.age = 27;
console.log('Friend:', friend);
console.log('Me:', person); // objects don't work that way because both the me and friend object are stored in the same heap which is then modified

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica; //not copying the object, but bts- we are copying the reference thats pointing to the same address
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage: ', marriedJessica);
// marriedJessica = {}; // this will not work because it would create a new object in the stack, which would change the reference address-- it would work for let tho

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
// Object.assign, it merges 2 objects to create a new one
// However, there is still a problem because using this technique of object.assign only works on the first level. Or in other words, if we have an object inside the object, then this inner object will actually still be the same. So, it will still point to the same place in memory. And that's why we say that this object.assign only creates a shallow copy and not a deep clone which is what we would like to have. So, again, a shallow copy will only copy the properties in the first level while a deep clone would copy everything. And to illustrate this,
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);

// However, the family object is a deeply nested object. And so therefore, object.assign did not really, behind the scenes, copy it to the new object. All right? So in essence, both the objects, Jessica2 and JessicaCopy have a property called family, which points at the same object in the memory heap, and that object is, of course, this array. And so, when we change the array in one of them, it's also gonna be changed in the other one. Now, a deep clone is what we would need here, but it is not easy to achieve, and it would actually be beyond the scope of this video to learn how to create a deep clone.
// use external libraries like lo-dash
