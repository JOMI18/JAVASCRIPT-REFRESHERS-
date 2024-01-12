'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const weekDays = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];
const menuHours = {
  sun: {
    open: 12,
    close: 22,
  },
  mon: { open: 11, close: 23 },
  tue: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (StarterIndex, mainIndex) {
    return [this.starterMenu[StarterIndex], this.mainMenu[mainIndex]];
  },

  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },

  // orderDelivery: function ({ starterIndex, mainIndex, address, time }) {
  //   console.log(
  //     `Order Received!, ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
  //   );
  // },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    address,
    time = '8:00',
  }) {
    console.log(
      `Order Received!, ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },
  orderPizza: function (mainIngredients, ...otherIngredients) {
    console.log(mainIngredients, otherIngredients);
  },

  //  ES6 Enhanced Object Literals
  // 1.
  // B :
  // menuHours:menuHours

  // A :
  menuHours, //with exactly that variable name. Otherwise, JavaScript will not know what this variable is.

  // 2.
  // B :
  // menuOrder: function (StarterIndex, mainIndex) {
  //   return [this.starterMenu[StarterIndex], this.mainMenu[mainIndex]];
  // },

  // A :
  menuOrder(StarterIndex, mainIndex) {
    return [this.starterMenu[StarterIndex], this.mainMenu[mainIndex]];
  },

  // 3.
  // B :

  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },

  // A :
  opening: {
    [weekDays[0]]: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    [`day-${1 + 3}`]: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//////////////////////Array destructuring////////////////////

// So in other words destructuring is to break a complex data structure down into a smaller data structure like a variable. So for arrays we use destructuring to retrieve elements from the array and store them into variables in a very easy way.
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; // in destructuring variables have to be declared with const
console.log(x, y, z);
console.log(arr); // original array is not damaged, its just being unpacked

let [main, secondary] = restaurant.categories;
const [one, , three] = restaurant.categories;

console.log(main, secondary);
console.log(one, three);

// Switching Variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return vales from a function
console.log(restaurant.order(2, 0));
const [starterCourse, mainCourse] = restaurant.order(2, 0);
console.log(starterCourse, mainCourse);

// Destructuring Nested Arrays
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j);
const [f, , [e, r]] = nested;
console.log(f, e, r);

// Setting Default Values in Destructuring
const [p, q, t] = [6, 7];
console.log(p, q, t);
const [g = 1, v = 1, l = 1] = [6];
console.log(g, v, l);
// usefully for when we get data from an api

//////////////////////Object destructuring////////////////////

// Then all we have to do is to provide the variable names that exactly match the property names that we want to retrieve from the object.

restaurant.orderDelivery({
  time: '11:30',
  address: 'Vin del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  address: 'Vin del Sole, 21',
  starterIndex: 3,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
// usefully for when we get data from an api

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Setting Default Values for properties that may or may not exist
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
// helpful most especially if its not hardcoded

// Mutating variables
let d = 111;
let h = 999;
const obj = { d: 23, h: 4, f: 12 };
// {a,b}=obj // this wont work, neither would a const or let because it had already been declared
({ d, h } = obj);
console.log(d, b);

const { fri } = openingHours;
console.log(fri);
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
const {
  fri: { open: o, close: cl },
} = openingHours;
console.log(o, cl);

//////////////////////The Spread Operator (...)////////////////////

const array = [7, 8, 9];
const badNewArr = [1, 2, array[0], array[1], array[2]];

console.log(badNewArr);
const newArr = [1, 2, ...array];
console.log(newArr);
console.log(...newArr);

// So we can use the spread operator to basically expand an array into all its elements. So basically unpacking all the array elements at one

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// Now you might have noticed that the spread operator  is actually a bit similar to destructuring,  because it also helps us get elements out of arrays.  Now, the big difference is that the spread operator  takes all the elements from the array  and it also doesn't create new variables.  And as a consequence, we can only use it  in places where we would otherwise  write values separated by commas.
console.log(newMenu);

// Shallow Copy of An Array
const mainMenuCopy = { ...restaurant.mainMenu }; // just like object.assign({},"")

// Join 2 or More Arrays
const FullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

console.log(FullMenu);

//  the spread operator works on all so-called iterables. Now what is an iterable? Well, there are different iterables in JavaScript. And we will talk about all of them by the end of the course, but for now, just know that iterables are things like all arrays, strings, maps, or sets, but not objects. So basically, most of the built-in data structures in JavaScript are now iterables, but except objects.

const str = 'Jonas';
const letters = [...str, ' ', 'S'];
console.log(letters);
// Now just keep in mind  that we can still only use the spread operator  when building an array,  or when we pass values into a function.
console.log(...str); // same thing as writing console.log("j","o");

// console.log(`${...str} Schmedtmann`) // this isn't going to work because it isn't expecting multiple values

// Real World Example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];

// console.log(ingredients);
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

// Objects

const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant }; // shallow copy
restaurantCopy.name = 'Ristotante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

//  SPREAD, because its on the RIGHT Side of =
const ary = [1, 2, ...[3, 4]];

//////////////////////The Rest Pattern and Parameters (...)////////////////////

// 1) DESTRUCTURING
// REST, is on the LEFT SIDE OF =
const [s, m, ...others] = [1, 2, 3, 4, 5, 6];
console.log(s, m, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]; // the rest operator must be the last in the assignment, because it doesn't include any skipped element {there can only be one rest operator}
console.log(pizza, risotto, otherFood);

const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// 2. FUNCTIONS
// called rest parameters here
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

// rest is the opposite of array
// rest takes multiple values and packs it into an array while spread does the opposite
add(2, 3);
add(5, 6, 3);
add(2, 7, 9, 3);
add(6, 5, 4, 9, 7, 3);

const xy = [23, 5, 9];
add(...xy);

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
restaurant.orderPizza('onions');

// So the spread operator is used where we would otherwise write values, separated by a comma. On the other hand the rest pattern is basically used where we would otherwise write variable names separated by commas. So, again the rest pattern can be used where we would write variable names, separated by commas and not values separated by commas. So it's a subtle distinction, but this is how you know when and where to use spread and rest.

////////////////////// Logical Operators-- Short Circuiting (&&, ||) ////////////////////

// logical operators can use any data type
// logical operators can return any data type
// logical operators can do short circuiting/ short circuit evaluation

// for the || operator if the first value is a truthy value it would return the first value without evaluating the second
console.log('---OR----');
console.log(3 || 'james');
console.log('' || 'james');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'hello' || 23 || null);

// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2); // this is a better option because its easier than if-else or the ternary operator

console.log('---AND----');
// for the && operator if the first value is a falsy value it would return the first value without evaluating the second
console.log(0 && 'jonas');
console.log(7 && 'jonas');
console.log('hello' && 23 && null && 'jonas');

// Practical Example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// So the OR operator will return the first truthy value of all the operands, or simply the last value if all of them are falsy. So that's what happened here, right? On the other hand, the AND operator will return the first falsy value or the last value if all of them are truthy.

// And as for practical applications,  we can use the OR operator to set default values,  and we can use the AND operator  to execute code in the second operand  if the first one is true.

////////////////////// The Nullish Coalescing Operator (??) //////////////////////

restaurant.numGuests = 0;

const guests3 = restaurant.numGuests || 10;
console.log(guests3);
// which is when we set numGuests to zero,  then JavaScript will still take this default value here  and assign it to guests because zero is a falsy value now,  and so therefore, we go to the second operand.

// Nullish, works with null and undefined{ not 0 or " "}
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//////////////////  Logical Assignment Operators ////////////////////////

const rest1 = {
  name: 'Capri',
  // numGuest: 20,
  numGuest: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR ASSIGNMENT OPERATOR
console.log('---OR ASSIGNMENT OPERATOR---');
rest1.numGuest = rest1.numGuest || 10;
rest2.numGuest = rest2.numGuest || 10;
console.log(rest1);
console.log(rest2);

// LOGICAL OR ASSIGNMENT OPERATOR
console.log('--- LOGICAL OR ASSIGNMENT OPERATOR---');

rest1.numGuest = rest1.numGuest ||= 10;
rest2.numGuest = rest2.numGuest ||= 10;
console.log(rest1);
console.log(rest2);

// LOGICAL NULLISH ASSIGNMENT OPERATOR
console.log('---LOGICAL NULLISH ASSIGNMENT OPERATOR---');
rest1.numGuest = rest1.numGuest ??= 10;
rest2.numGuest = rest2.numGuest ??= 10;
console.log(rest1);
console.log(rest2);

//  AND ASSIGNMENT OPERATOR
console.log('--- AND ASSIGNMENT OPERATOR---');
rest1.owner = rest1.owner && '<ANONYMOUS>';
rest2.owner = rest2.owner && '<ANONYMOUS>';
console.log(rest1);
console.log(rest2);

// LOGICAL AND ASSIGNMENT OPERATOR
console.log('---LOGICAL AND ASSIGNMENT OPERATOR---');
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1);
console.log(rest2);

// And so again, if you ever need to assign a value to a variable that is already defined, so that has a value that is currently truthy, then you can use this and assignment operator.

////////////////////// Looping Arrays ////////////////////////////

//////////// The for-of Loop ////////////
// you can also use the continue and break key words here too... but not in the other after this
const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of wholeMenu) {
  console.log(item);
}

// to get the current index
for (const item of wholeMenu.entries()) {
  console.log(item);
}

// console.log([...wholeMenu.entries()]);

for (const item of wholeMenu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
} // but we are actually at this point smarter than doing it like this. And that's because if item is now an array, we can de-structure it. We don't have to manually take element zero and element one,

for (const [i, el] of wholeMenu.entries()) {
  console.log(`Menu Order ${i + 1}: ${el}`);
}

////////////////////////  Enhanced Object Literals ////////////////////////

// check the restaurant object
console.log(restaurant);

// So the second enhancement to object literals  is about writing methods.

// And finally, the third enhancement is  that we can now actually compute property names instead  of having to write them out manually and literally.  And compute just means like calculate  and so l

console.log(restaurant.opening);

//////////////////////// Optional Chaining (?.) ////////////////////////
// console.log(restaurant.openingHours.mon.open); // this wont work because monday is a property that doesn't exist --- as a result it reads undefined.open hours which would result in an error

// a soln would be to use an if-else statement
if (restaurant.openingHours && restaurant.openingHours.mon) {
  // but in a real world example its not advised because it could further complicate your code
  console.log(restaurant.openingHours.mon.open);
}
// a better fix would be to use the optional chaining
console.log(restaurant.openingHours.mon?.open); // how this works is that if the values before the question mark aren't nullish {so null and undefined}... then it would process the variable after
// but if it is, it would just return undefined

console.log(restaurant.openingHours?.mon?.open);

// Real World Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  restaurant.openingHours.day; // you cant do this because its not an actual property of the object
  restaurant.openingHours[day]; // And so remember if we want to use a variable name  as the property name,  basically, we need to use the brackets notation.
  const openHours =
    // restaurant.openingHours[day]?.open || '- the store remains closed'; // but on saturday when it opens at 0, it reads it as falsy-- a soln is to used the nullish coalescing operator
    restaurant.openingHours[day]?.open ??
    '-- Sorry, the store remains closed today';
  console.log(`on ${day} we open at ${openHours} `);
}

// On Methods
console.log(restaurant.order?.(2, 0) ?? "Method doesn't exist");
console.log(restaurant.orderPrawn?.(2, 0) ?? "Method doesn't exist");

// On Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];

console.log(users[0]?.name ?? 'User array empty'); // easier & less complicated than if-else
// So, get used to this optional chaining operator,  which almost always,  we use them together with the nullish coalescing operator  so that we can actually do something  in case we don't get a result from the object  or from the array that's here on the left hand side.

// if (users.length > 0) console.log(users[0].name);
// else console.log('user array empty');

/////////////////////// Looping Objects: Object Keys, Values, and Entries ///////////////////////

// Property NAMES
for (const day of Object.keys(openingHours)) {
  console.log(day);
}

const properties = Object.keys(openingHours); // this is am array now
console.log(properties);

let openStr = `we are open ${properties.length} days a week:`;
for (const day of properties) {
  openStr += ` ${day},`;
}

console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);
for (const periods of values) {
  console.log(periods);
}

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);

for (const x of entries) {
  console.log(x);
}
// for (const [key, values] of entries) { // values is an object so further destructure
//   console.log(x);
// }
// [key, value] if it was a simpler structure
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}
