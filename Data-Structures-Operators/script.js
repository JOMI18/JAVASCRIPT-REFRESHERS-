"use strict";
// Data needed for a later exercise
// const flights =
//   "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const weekDays = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];
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
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

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
    time = "8:00",
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
  time: "11:30",
  address: "Vin del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  address: "Vin del Sole, 21",
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

const newMenu = [...restaurant.mainMenu, "Gnocci"];
// Now you might have noticed that the spread operator  is actually a bit similar to destructuring,  because it also helps us get elements out of arrays.
//  Now, the big difference is that the spread operator  takes all the elements from the array  and it also doesn't create new variables.  And as a consequence, we can only use it  in places where we would otherwise  write values separated by commas.
console.log(newMenu);

// Shallow Copy of An Array
const mainMenuCopy = { ...restaurant.mainMenu }; // just like object.assign({},"")

// Join 2 or More Arrays
const FullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

console.log(FullMenu);

//  the spread operator works on all so-called iterables. Now what is an iterable? Well, there are different iterables in JavaScript.
//  And we will talk about all of them by the end of the course, but for now, just know that iterables are things like all arrays, strings, maps, or sets, but not objects. So basically,
// most of the built-in data structures in JavaScript are now iterables, but except objects.

const str = "Jonas";
const letters = [...str, " ", "S"];
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

const newRestaurant = { foundedIn: 1998, ...restaurant, founder: "Guiseppe" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant }; // shallow copy
restaurantCopy.name = "Ristotante Roma";
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

restaurant.orderPizza("mushrooms", "onions", "olives", "spinach");
restaurant.orderPizza("onions");

// So the spread operator is used where we would otherwise write values, separated by a comma. On the other hand the rest pattern is basically used where we would otherwise write variable names separated by commas.
//  So, again the rest pattern can be used where we would write variable names, separated by commas and not values separated by commas. So it's a subtle distinction, but this is how you know when and where to use spread and rest.

////////////////////// Logical Operators-- Short Circuiting (&&, ||) ////////////////////

// logical operators can use any data type
// logical operators can return any data type
// logical operators can do short circuiting/ short circuit evaluation

// for the || operator if the first value is a truthy value it would return the first value without evaluating the second
console.log("---OR----");
console.log(3 || "james");
console.log("" || "james");
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || "" || "hello" || 23 || null);

// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2); // this is a better option because its easier than if-else or the ternary operator

console.log("---AND----");
// for the && operator if the first value is a falsy value it would return the first value without evaluating the second
console.log(0 && "jonas");
console.log(7 && "jonas");
console.log("hello" && 23 && null && "jonas");

// Practical Example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}
restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");

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
  name: "Capri",
  // numGuest: 20,
  numGuest: 0,
};

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

// OR ASSIGNMENT OPERATOR
console.log("---OR ASSIGNMENT OPERATOR---");
rest1.numGuest = rest1.numGuest || 10;
rest2.numGuest = rest2.numGuest || 10;
console.log(rest1);
console.log(rest2);

// LOGICAL OR ASSIGNMENT OPERATOR
console.log("--- LOGICAL OR ASSIGNMENT OPERATOR---");

rest1.numGuest = rest1.numGuest ||= 10;
rest2.numGuest = rest2.numGuest ||= 10;
console.log(rest1);
console.log(rest2);

// LOGICAL NULLISH ASSIGNMENT OPERATOR
console.log("---LOGICAL NULLISH ASSIGNMENT OPERATOR---");
rest1.numGuest = rest1.numGuest ??= 10;
rest2.numGuest = rest2.numGuest ??= 10;
console.log(rest1);
console.log(rest2);

//  AND ASSIGNMENT OPERATOR
console.log("--- AND ASSIGNMENT OPERATOR---");
rest1.owner = rest1.owner && "<ANONYMOUS>";
rest2.owner = rest2.owner && "<ANONYMOUS>";
console.log(rest1);
console.log(rest2);

// LOGICAL AND ASSIGNMENT OPERATOR
console.log("---LOGICAL AND ASSIGNMENT OPERATOR---");
rest1.owner &&= "<ANONYMOUS>";
rest2.owner &&= "<ANONYMOUS>";
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
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
  restaurant.openingHours.day; // you cant do this because its not an actual property of the object
  restaurant.openingHours[day]; // And so remember if we want to use a variable name  as the property name,  basically, we need to use the brackets notation.
  const openHours =
    // restaurant.openingHours[day]?.open || '- the store remains closed'; // but on saturday when it opens at 0, it reads it as falsy-- a soln is to used the nullish coalescing operator
    restaurant.openingHours[day]?.open ??
    "-- Sorry, the store remains closed today";
  console.log(`on ${day} we open at ${openHours} `);
}

// On Methods
console.log(restaurant.order?.(2, 0) ?? "Method doesn't exist");
console.log(restaurant.orderPrawn?.(2, 0) ?? "Method doesn't exist");

// On Arrays
const users = [{ name: "Jonas", email: "hello@jonas.io" }];
// const users = [];

console.log(users[0]?.name ?? "User array empty"); // easier & less complicated than if-else
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

//////////////////////////// Sets ////////////////////////////////////
// And a set is basically just a collection  of unique values.  So that means that a set can never have any duplicates.

const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);
console.log(ordersSet);

console.log(new Set("Jonas"));
console.log(new Set());

console.log(ordersSet.size);
// And then the size is how many different meals will be cooked? And just note, how it is actually called size and to not length like it is in arrays.

console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("Bread"));
// this has method is similar to the includes method in arrays.

ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
console.log(ordersSet);
ordersSet.delete("Risotto");
console.log(ordersSet);
// And in fact, there is no way  of getting values out of a set.  And if we think about this,  then it makes sense.  So there's really no need for getting data out  of a set. That's because if all values are unique,
//  and if their order does not matter,  then there is no point  of retrieving values out of a set.  All we need to know  is whether a certain value  is in the set or not.  And that's why we have the has method.

// If your goal is to actually store values in order and then retrieve it, then the best use case, is to just use an array. You wouldn't use a set for that. And so again, there's no need for getting values out of a set, because if you need it, then you will just use an array.

// ordersSet.clear();
// All we can use it for is to basically delete all of the elements of the set.
// console.log(ordersSet);

// Sets are iterables... so we can loop over them
for (const order of ordersSet) {
  console.log(order);
}
// Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
// const staffUnique = [new Set(staff)]; // here its an OBJECT
const staffUnique = [...new Set(staff)]; // we want it to be in an array, we can spread it because spread operator works on iterables
console.log(staffUnique);

console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
);

console.log(new Set("jonasschmedtmann").size);
// All right. So as a conclusion to this video sets are not intended to replace arrays at all. So whenever you need to store values in order, and that might contain duplicates, always just use arrays.
// That's also true when you need to really manipulate data, because arrays have access to a lot of great array methods that we're going to study a little bit later.
// Now sets have this very useful property of being unique. And it's also very easy to interact with sets by using all of their straightforward methods.

//////////////////////////////////////  Maps: Fundamentals //////////////////////////////
// a map is a data structure that we can use to map values to keys. So, just like an object data is stored in key value pairs in maps. Now, the big difference between objects and maps is that in maps, the keys can have any type and this can be huge.
//  So, in objects, the keys are basically always strings. But in maps, we can have any type of key. It could even be objects, or arrays, or other maps.
// MOSA
const rest = new Map();
rest.set("name", "Classico Italiano"); // set is adding it
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal")); // And, calling the set method like this  does not only update the map that it's called on,  but it also returns the map.

// Now, the fact that the set method  actually returns the updated map  allows us to change the set method

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");

console.log(rest.get("name")); // get is to read data from a map
console.log(rest.get(true)); // data types matter, if it was console.log(rest.get("true")) => it would be undefined
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get("open") && time < rest.get("close"))); // this would return true or false=> (time > rest.get('open') && time < rest.get('close')

console.log(rest.has("categories"));
rest.delete(2);
console.log(rest);
// Now comparing this to objects,  we can actually also delete properties from objects  using something called the Delete Operator.  But, that's a really slow process.  And usually, it's not encouraged to do that here.

// About the has method, objects do also have a method which is called hasOwnProperty.

console.log(rest.size);
// rest.clear();
// console.log(rest);

rest.set([1, 2], "Test");
console.log(rest.get([1, 2])); /// this isn't going to work because behind the scenes they are different objects in memory, instead
const arys = [1, 2];
rest.set(arys, "Test");
console.log(rest.get(arys));

rest.set(document.querySelector("h1"), "Heading");
console.log(rest);

////////////////////////////////  Maps: Iteration //////////////////////////////

const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "Try again!"],
]); // better than using sets to add
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours)); // whenever you want a map and have an object
console.log(hoursMap);

// Quiz app
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = Number(prompt("What's the Answer?"));
const answer = 3;
console.log(answer);

// console.log(question.get(answer == 3 ? true : false)); // this way we're rewriting values, which is not the point
console.log(question.get(question.get("correct") === answer));

// Convert map to array
console.log([...question]); // using spread operator
// console.log(question.entries()); // make sure to put it into an array
console.log([...question.keys()]);
console.log([...question.values()]);

//////////////////////////  Summary: Which Data Structure to Use? ////////////////////////////////////////////

// where data can actually come from.

// So there are essentially three sources of data.

// First, the data can be written  within the program source code itself like status messages  that will be displayed on a webpage based on user actions.

// Second, data can come from the user interface. So from the webpage, it can either be data that the user inputs into some form or data test already written somehow in the DOM. For example, this can be the users tasks in a todo app or expenses in a budget app or anything like that.

// Finally, data can come from external sources  which is usually a web API.  Now what is a web API?  Well, API stands for Application Programming Interface  and we can basically use a web API to get data  from other web applications.
// For example we can use a web API  to get the current weather in any city or data about movies  or currency conversion rates  and really every kind of data that you can imagine.

///////// DECIDING //////////
// So the first decision is this
//  do we just need a simple list of values?
//  If so, then we're gonna use an array or a set.
//  But on the other hand if we need key value pairs,
//  then we need an object or a map.
//  So the big difference here is that with a key value pair
//  we have a way of describing the values, so by using the key.
//  On the other hand, in a list like an array or a set,
//  we simply have the values without any description, okay?

////////////////////////////// Working With Strings  ////////////////////////////////////
// - Part 1

const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]);

console.log(airline.length);
console.log("B737".length);

// Methods are case sensitive
console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("portugal")); // this is case sensitive

// All right now, what can we actually do with these indexes? Why are they useful?  Well, one good use case is to extract part  of a string using the slice method

// slice uses indexes as arguments
// strings are primitives, so they are impossible to mutate
console.log(airline.slice(4)); // the methods will always return a new string
console.log(airline.slice(4, 7));
// And so what this means is that the end value is actually not included in the string. All right so basically it stops extracting before reaching index number seven. And that's really important to keep in mind.
//  And just as a side note, the length of the extracted string is always going to be end minus beginning. So seven minus four is three. And so that's the length here of air.

// Now up until this point,  we have always just hard-coded these values,  but ofcourse many times we don't even know the string
// that's where index of and last index of comes in

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

// And we can even define a negative begin argument. Like this for example, and then it will start counting from the end. Or actually start extracting from the end.

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are the middle seats
  const st = seat.slice(-1);
  // Well to extract part of a string,  we already know we use the slice method
  if (st === "B" || st === "E") {
    console.log("You got the middle seat 😬");
  } else console.log("You got lucky 😎");
};
checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("14E");
checkMiddleSeat("15D");

////////// Behind the scenes
// Shouldn't methods only be available  on objects such as a race?  Well that is actually true.
//  However, JavaScript is really smart.  And so here is how this works.  Whenever we call a method on a string,
//  JavaScript will automatically behind the scenes  convert that string primitive to a string object  with the same content.  And then it's on that object where the methods are called.
// All right and this process is called boxing  because it basically takes our string  and puts it into a box  which is the object.

console.log(new String("jonas"));
console.log(typeof new String("jonas"));

// And in fact all string methods return primitives.  Even if called on a string object.
console.log(typeof new String("jonas").slice(1));

// - Part 2
// The first two are gonna be for changing the case of a string. and this doesn't require any arguments at all.

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
console.log("Jomi".toUpperCase());

// Fix capitalization in name
const passenger = "jOnAs"; //Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const passengerNameCorrector = function (names) {
  const correctName = names.toLowerCase();
  const newName = correctName[0].toUpperCase() + correctName.slice(1);
  console.log(names, correctName, newName);
};
passengerNameCorrector("JoMIloJU");
passengerNameCorrector("jOnAtHan");
passengerNameCorrector("DAVid");
passengerNameCorrector("CHarLES");

// Comparing emails
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io \n";
// or even an enter character, which remember is \n {which is just white space}.

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail); // you can do this all in one

const normalizedEmail = loginEmail.toLowerCase().trim(); // The trim() method removes whitespace from both sides of a string.
console.log(normalizedEmail);

console.log(email === normalizedEmail);

const emailValidator = function (user, valid) {
  const correctUserEmail = user.toLowerCase().trim();
  //   By the way, here, since ES2019, there's also trim start-- you can use to trim wide space only from the start

  // and trim end, which as their names say, -- of the string or only from the end.

  if (correctUserEmail === valid) {
    console.log("Email is Valid");
  } else {
    console.log("Sorry wrong Email");
  }
};
emailValidator("getjOmmY@gmail.com \n", "getjommy@gmail.com");
emailValidator(" Hello@Jonas.Io \n", "hello@jonas.io");

// REPLACING
// Next up, let's learn one of the most important thing, about strings, which is to replace parts of strings.

const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", "."); // but instead we will do chaining again
console.log(priceGB, priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";

console.log(announcement.replace("door", "gate")); // THIS ONLY WORKS FOR THE FIRST ONE
console.log(announcement.replaceAll("door", "gate")); // A NEWER SOLN
console.log(announcement.replace(/door/g, "gate")); // THIS IS THE FIX FOR THE FIRST ONE  // this is case sensitive
// And then to create a regular expression,  we need to write the string between slashes.  So not between quotes.

// Methods that return Booleans
const planes = "Airbus A320neo";
console.log(planes.includes("A320"));
console.log(planes.includes("Boeing"));
console.log(planes.startsWith("Airb"));

if (planes.startsWith("Airbus") && planes.endsWith("neo")) {
  console.log("Part of the NEW Airbus family");
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  // So this is important to show you once again that when we receive input from a user, we usually always start by putting everything into lower case, okay? Because that makes it a lot easier to then compare it to something.

  // OR YOU WOULD
  // So then we would have to check for all the variations,  like knife like this, or this knife, or even this.  So every possible variation.  So that would be highly impractical.

  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board");
  } else {
    console.log("Welcome aboard!");
  }
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

// - Part 3

// So split allows us to split a string, into multiple parts based on a divider string.
// and it will then store the results into elements of a new array.

// Split and join
console.log("a+very+nice+string".split("+"));
console.log("Jonas Schmedtmann".split(" ")); // common

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");
console.log(firstName, lastName);

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" "); // The join() method returns an array as a string
// const newName = ["Mr.", firstName, lastName.toUpperCase()].join("---");
console.log(newName);

const capitalizeNames = function (name) {
  const names = name.split(" ");
  console.log(names);
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(" "));
};

capitalizeNames("jessica ann smith davis");
capitalizeNames("jonas schmedtmann");

// Padding
// Now padding a string means to add a number of characters to the string until the string has a certain desired length.

const message = " Go to gate 23! ";
console.log(message.padStart(25, "+").padEnd(35, "-"));
console.log("jonas".padStart(25, "+"));

// Real - World Example

const maskCreditCard = function (numbers) {
  // CONVERTING THE NUMBERS TO STRINGS first
  // const str = String(numbers);
  const str = numbers + ""; // this works because + with "" takes everything to a string
  const lastNums = str.slice(-4);
  return lastNums.padStart(str.length, "*");
};
console.log(maskCreditCard(64637836));
console.log(maskCreditCard(899803378463864647384));
console.log(maskCreditCard("334859493847755774747"));

// REPEATING
// this one simply allows us to repeat the same string multiple times.

const message2 = "Bad weather... All Departures Delayed... ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"🛩".repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

/////////////////// String Methods Practice //////////////////////
// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

//  STEPS

// 1) find something common to split, in this case (+)
console.log(flights.split("+"));
const flightDetails = flights.split("+");

const getCodeName = (str) => str.slice(0, 3).toUpperCase();

// 2) loop through the array to get the individual elements
for (const flight of flightDetails) {
  const [type, from, to, time] = flight.split(";");
  // console.log(type, from, to, time);

  // 3) Do the conversions
  // const finalOutput = `${type.replaceAll("_", " ")} from ${from
  //   .slice(0, 3)
  //   .toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${time.replace(
  //   ":",
  //   "h"
  // )})`; //  instead of slicing twice, a function can be created

  console.log(type); // _D this is it before its replaced, so use it for the condition
  const finalOutput = `${
    type.startsWith("_Delayed") ? "🔴" : ""
  } ${type.replaceAll("_", " ")} from ${getCodeName(from)} to ${getCodeName(
    to
  )} (${time.replace(":", "h")})`.padStart(106);
  console.log(finalOutput);
}
