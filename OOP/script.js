"use strict";

///////////////////////////////////////
// Constructor Functions and the new Operator

// only function declarations and function expressions will work to create a constructor function, the arrow function wont work because it requires a this keyword and arrow functions doesn't have its own

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never to this!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };

  // You should never create a method inside of a constructor function. That's because imagine we were gonna create a hundred or thousands or even tens of thousands of person objects using this constructor function.
  // Then what would happen, is that each of these objects
  // would carry around this function here.  So if we had a thousand objects,  we would essentially create a thousand copies  of this function.  And so that would be terrible  for the performance of our code.
};

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const jonas = new Person("Jonas", 1991);
const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);

console.log(matilda, jack);
const jay = "Jay";

console.log(jonas instanceof Person);
console.log(jay instanceof Person); // not made from the person object

///////////////////////////////////////
// Prototypes
console.log(Person.prototype);

// So actually, we talked about prototypes,  prototypal inheritance and delegation earlier already.  But how does all of that actually work?  Well, it can be summarized like this.  So, first each and every function in JavaScript
// automatically has a property called prototype.  And that includes, of course, constructor functions.  Now every object that's created  by a certain constructor function  will get access to all the methods and properties
// that we define on the constructors prototype property.  So just to visualize  in our case,  this would be person dot prototype.  So the prototype property  of the constructor function.  So again, as I was just saying,
// all the objects that are created through this constructor function here will inherit, so they will get access to all the methods and properties
// that are defined on this prototype property. And so let's no actually add a method to this prototype property.

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// should this prototype property here  not be the prototype of person?  Well, actually, no.  So this is the confusing part.  So person dot prototype here
// is actually not the prototype of person.  But instead, it is what's gonna be used  as the prototype of all the objects  that are created with the person constructor function.  So that's a subtle but important difference
// that you need to keep in mind.

// proof
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// think of prototype as  .prototypeOfLinkedObjects

Person.prototype.species = "Homo Sapiens";
console.log(jonas.species, matilda);

console.log(jonas.hasOwnProperty("firstName"));
console.log(jonas.hasOwnProperty("species"));

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);

// Object.prototype (top of prototype chain)
// So again, we learned in the last lecture that this works because of the prototype chain and in particular, because this method here is in this prototype of Jonas's prototype.
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__); // null because onj.prototype is the top of the chain

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// BE CAREFUL NOT TO DO THIS FOR LARGE SCALE APPLICATIONS
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");

console.dir(h1);

console.dir((x) => x + 1);

///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  // Now, what's important to understand here  is that all of these methods  that we write in the class,  so outside of the constructor
  // will be on the prototype of the objects. And not on the objects themselves. So this is really just like before, prototypal inheritance.

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // but setters and getters can actually be very useful
  // for data validation and as an example,

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(" "))
      this._fullName = name; //_fullName creates a new property name
    else alert(`${name} is not a full name!`);
  }

  // And so right now we cannot do jessica.fullName  because that simply doesn't exist.  And so to fix this we now also need to create a getter  for the fullName property.  And so that will simply return the underscore fullName.
  get fullName() {
    return this._fullName;
  }

  // static methods
  static hey() {
    console.log("Hey there 👋");
  }
}

// const jessica = new PersonCl("Jessica ", 1996);
const jessica = new PersonCl("Jessica Davis", 1996);
console.log(jessica);
// Now, the act of creating a new object  actually also works in the exact same way as before.
// So using the new operator.  And so therefore, whenever we create a new object,
// so like a new instance using the new operator, this constructor will automatically be called.
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted // And so even if they are class declarations. So functional declarations, remember, are hoisted, which means we can use them before they are declared in the code. But with classes, that doesn't work.
// 2. Classes are first-class citizens // And so what that means  is that we can pass them into functions  and also return them from functions.  And as I mentioned before,  that is because classes are really just a special kind  of function behind the scenes.
// 3. Classes are executed in strict mode // And so even if we didn't activate it for our entire script, all the code that is in the class will be executed in strict mode.

const walter = new PersonCl("Walter White", 1965);

///////////////////////////////////////
// Setters and Getters
// Let's now talk about a feature  that is actually common to all objects in JavaScript,  and that's getters and setters.  So every object in JavaScript  can have setter and getter properties.  And we call these special properties assessor properties,
// while the more normal properties are called data properties.  So getters and setters are basically functions  that get and set a value so just as the name says,  but on the outside they still look like regular properties.  And so let's first take a look at getters and setters  in a simple object literal,
const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  // Now it is not mandatory to specify a setter when we have a getter for the same property. Okay, so just a getter or just a setter would be enough.

  set latest(mov) {
    // And any setter method needs to have exactly one parameter
    this.movements.push(mov);
  },
};

console.log(account.latest); // to get, use it as a property you don't call a method

account.latest = 50; // to set, use you it like a method, not as an argument
console.log(account.movements);

///////////////////////////////////////
// Static method

Array.from(document.querySelectorAll("h1"));
// so remember that we have the Array.from method which converts any array like structure to a real Array.

// But that's not really the point,  what's the point is that this from method here  is really a method that is attached  to the Array constructor.  So we could not use the from method on an Array.

// const wontWork = [1, 2, 3].from();

// And so therefore all the Arrays do not inherit this method.  Again because its not on their prototype.  Its simply attached to the constructor itself.
// So Array.from here is basically just a simple function,  but its a function that's attached to the Array constructor.
// And the reason for that is simply,  so that developers know that it is related to Arrays.
// We also say that the from method is in the Array name space.  And we actually used that term before for some methods in the number and in the internationalization name space.

Person.hey = function () {
  console.log("Hey There 😶‍🌫️");
  console.log(this);
};

Person.hey();
// jonas.hey(); // wont exist

PersonCl.hey();
// And so again we get hey there and this time,  disc key word points to the entire class.  All right.  So keep in mind that these static methods  are not available on the instances,
// and sometimes they are still useful to implement  some kind of helper function about a class  or about a constructor function.

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto = {
  calcAges() {
    console.log(2037 - this.birthYear);
  },

  //looks like constructor function but it has nothing to do with it because were not calling it with new
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // originally empty with it linked to the prototype
console.log(steven);
steven.firstName = "steven";
steven.birthYear = 2005;
steven.calcAges();
console.log(steven);
console.log(steven.__proto__ === PersonProto);

// So the big takeaway is  that Object.create creates a new object,  and the prototype of that object  will be the object that we passed in.  So that's what matters from this video.
// And that's very important to understand in the future, when we will implement true class inheritance because for that, we are gonna need Object.create.

const sarah = Object.create(PersonProto);
sarah.init("Sarah", "2011");
sarah.calcAges();
console.log(sarah);

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Persons = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Persons.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // Persons( firstName, birthYear);
  // So the problem here is that we are now actually calling this persons constructor function as a regular function call. So we are not using this new operator to call this persons function constructor. And so therefore this function call here is simply a regular function call. And remember that in a regular function call, the this keyword is set to undefined.
  // And so therefore that's why we get this error here,  that it cannot set first name on undefined.  So instead of simply calling the persons function here,  we need to manually set the this keyword as well.  So do you remember how we can call a function?  And at the same time set the this keywords  inside that function?
  // Well, we can simply use the call method. So the call method will indeed call this function, but we will be able to specify the this keywords here as the first argument in this function. And so in this case, we want the this Keyword in this function{persons} to simply be the this keyword inside this function here{student}, right? Because as you know the this Keyword is gonna be
  Persons.call(this, firstName, birthYear); // use this instead of
  //   this.firstName = firstName;
  //   this.birthYear = birthYear;
  //First because it violates the "don't repeat yourself" principle, but second and even worse in this case is that imagine that the implementation of person here changes in the future, then that change will not be reflected in the student.
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Persons.prototype);
// Now we have to create this connection here  before we add any more methods  to the prototype object of student.  And that's because object dot create,  will return an empty object.
// And so at this point, student dot prototype is empty. And so then onto that empty object, we can add methods like this one. But if we did it the other way around so if this was after we created this method here, then object dot create would basically overwrite these methods that we had already added to the prototype object of student.

// Now you might be wondering why we even needed to use object dot create. So why didn't we just do this?
// So student dot prototype equals the person dot prototype, right? This many would have seen a little bit more logical to do, but in fact, this doesn't work at all.
Student.prototype = Persons.prototype; // this is saying they should be the same object

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student; // you need to set it manually, because object.create made it such that person was the prototype
console.dir(Student.prototype.constructor);
