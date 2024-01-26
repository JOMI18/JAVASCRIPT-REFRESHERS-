"use strict";
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////// Array Methods ////////////////////////////

let arr = ["a", "b", "c", "d", "e"];

// 1. SLICE => TO TAKE A SLICE OF, WITHOUT CHANGING THE ORIGINAL ARRAY
console.log(arr.slice(2));
console.log(arr.slice(0, 4)); // remember if the last argument is index 4, it stops at the element before 4
console.log(arr.slice(-2));
console.log(arr.slice(-1)); // negative arguments take from the back
console.log(arr.slice(1, -1));
console.log(arr.slice()); // makes a shallow copy of the array just like
console.log([...arr]); // makes a shallow copy of the array

// SO BOTH CAN BE USED TO CREATE A SHALLOW COPY
// The only time you really need to use the slice method here  is when you want to chain multiple methods together,  so calling one after the other.

// 2. SPLICE => And a splice method works in almost the same way as slice. But the fundamental difference is that it does actually change the original array.

// console.log(arr.splice(2));
console.log(arr.splice(-1));
// All we are usually interested in is to just delete one or more elements from an array using splice. And one pretty common use case is to simply remove the last element of an array.
console.log(arr);

console.log(arr.splice(1, 2)); // for splice the second parameter isn't the index but the count
// so here b and c should be removed
console.log(arr);

// Parameter is the variable in the declaration of the function.

// Argument is the actual value of this variable that gets passed to the function.

// 3. REVERSE => this also mutates the array, it will reverse the order of the elements and log the reversed array.
arr = ["a", "b", "c", "d", "e"];
let arr2 = ["g", "b", "i", "f", "q"];
console.log(arr2.reverse());

// WHEN TO USE WHAT
// we might not want to mutate the original array, and then we cannot use any of these methods.

// 4. CONCAT => used to join 2 arrays -- it also doesn't mutate the array
const letters = arr.concat(arr2);
console.log(letters);
// so its the same as doing
console.log([...arr, ...arr2]);

// 4. JOIN => turns an array to a string
console.log(letters.join("\n"));

// And remember that you already know
// push  // responsible for ADDING from back
// unshift, // responsible for ADDING from front

// pop  // responsible for REMOVING from back
// unshift, // responsible for REMOVING from back

// indexOf
// includes

// Now if you ever lose track of all these different methods, and how they work, you can always come back to these videos. Or of course, check the documentation on MDN,

////////////////////  The new at Method /////////////////////////////
let ar3 = [23, 67, 90];
console.log(ar3[0]); // traditional
console.log(ar3.at(0)); // So here we say, array at position zero.  And so that's why this new method is called  array dot at position zero.

////// Uniqueness 
// Well, actually there is one particularity of the At Method,  which makes it quite useful to use  instead of the brackets notation.
// 1) So, if you want to get to the last element of an array,  or basically start counting from the end of an array,  then you should probably start using the At Method.

// 2) Also, if you want to do something called "method chaining",  which we will talk about later in this section,  then the At Method is also perfect for that,  So basically combining multiple method,  all at the same time

// 3) And then, it's quite helpful to use the At Method instead of the brackets notation.


////// getting last array element
// So, let's now say that we wanted to get  the last element of the array.  Now, supposing that we do not know the length of the array,
console.log(ar3[ar3.length - 1]);
console.log(ar3.slice(-1)[0]);
console.log(ar3.at(-1));

// The At Method also works on strings.
console.log("perosayemi".at(0));
console.log("perosayemi".at(-1));

// Now, on the other hand, if you just want to quickly get a value from an array, so just like the first element, then of course you can keep using the brackets notation. And personally, I also do that all the time. 
// So basically if all you want to do is something like this, then you can simply keep using the square brackets.


////////////////////  Looping Arrays: forEach /////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');
movements.forEach(function (mov, i, arr) {
//   in fact forEach passes in the current element, the index and the entire array that we are looping. And so therefore we can specify them here in our parameter list.
// but what does matter is the order.  So the first parameter always needs to be  the current element,  the second parameter always the current index  and the third one always the entire array  that we are looping over.
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }

});
// 0: function(200)
// 1: function(450)
// 2: function(400)


// Now when should you use forEach and when should you use the for of loop. Well one fundamental difference

// between the two of them is that you cannot break out  of a forEach loop.  So the continue and break statements  do not work in a forEach loop at all.  So instead, forEach will always loop over the entire array  and there is nothing that you can do about it.

// So if you really need to break out of a loop  then you have to keep using the for of loop,  but other than that  it really comes down to your personal preference.



////////////////////// forEach With Maps and Sets ///////////////////////////
// Maps
const currencies = new Map([
 ["USD", "United States dollar"],
 ["EUR", "Euro"],
 ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
})

// Sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  // console.log(`${key}: ${value}`);
  // But now we get USD, USD, and here GBP, GBP. And so what this means is that the key here is exactly the same as the value. 
  // So why is that? Well, a set doesn't have keys, right? And it doesn't have indexes either.  And so there is no value that would make sense for the key.
  console.log(`${value}: ${value}`);
  // SOLN
  // And so we can just use an underscore,  which in JavaScript means a throwaway variable.  So that means a variable that is completely unnecessary.  So it's just a convention which we will see again


})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
