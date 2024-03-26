"use script";

///////////////////////////////////////
// Coding Challenge #1

// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀

// CONSTRUCTOR FUNCTIONS
const Cars = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

let bmw = new Cars("BMW", 120);
let mercedes = new Cars("Mercedes", 95);

console.log(bmw, mercedes);

Cars.prototype.accelerate = function () {
  //   this.speed = speed + 10;
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

bmw.accelerate();
mercedes.accelerate();

console.log(bmw, mercedes);

Cars.prototype.brake = function () {
  //   this.speed = speed - 5;
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

bmw.brake();
mercedes.brake();

console.log(bmw, mercedes);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

///////////////////////////////////////
// Coding Challenge #2

// 1. Re-create challenge 1, but this time using an ES6 class;
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford' going at 120 km/h

// GOOD LUCK 😀

// ES6 CLASSES
console.log("-------------ES6---------------");
class CarsCls {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    this.speed / 1.6;
    console.log(`${this.make} is going at ${this.speed} mi/h`);
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
}

let new_bmw = new CarsCls("BMW", 120);
let new_mercedes = new CarsCls("Mercedes", 95);
console.log(new_bmw, new_mercedes);

new_mercedes.accelerate();
new_mercedes.brake();
new_mercedes.accelerate();

new_bmw.accelerate();
new_bmw.brake();
new_bmw.accelerate();

new_bmw.speedUS; //getting
new_bmw.speedUS = 120; //setting

let ford = new CarsCls("Ford", 120);

ford.accelerate();
ford.brake();
ford.speedUS;
ford.speedUS = 200;

///////////////////////////////////////
// Coding Challenge #3

// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

// GOOD LUCK 😀

const EV = function name(make, speed, charge) {
  Cars.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Cars.prototype); //remember to set before creating new properties - so you don't overwrite them

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
tesla.accelerate(); //But JavaScript of course used to first one.
// So when there are two methods or properties with the same name in a prototype chain, then the first one that appears in the chain is the one that's gonna be used. So the same is true also for the scope chain.

// And remember that this is exactly the definition of polymorphism that We talked about at the beginning of the section.
tesla.brake();
tesla.chargeBattery(100);
console.log(tesla);

///////////////////////////////////////
// Coding Challenge #4

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

// GOOD LUCK 😀

class EVCls extends CarsCls {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

let rivian = new EVCls("Rivian", 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .chargeBattery(30)
  .accelerate()
  .brake()
  .accelerate()
  .accelerate();
console.log(rivian);

console.log(rivian.speedUS);
