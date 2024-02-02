"use strict";
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
// shift, // responsible for REMOVING from back

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

console.log("---- FOREACH ----");
movements.forEach(function (mov, i, arr) {
  //   in fact forEach passes in the current element, the index and the entire array that we are looping. And so therefore we can specify them here in our parameter list.
  // but what does matter is the order.  So the first parameter always needs to be  the current element,  the second parameter always the current index  and the third one always the entire array  that we are looping over.
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    // Math.abs() // it gives the absolute values
  }
});
// movements array
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
});

// Sets
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  // console.log(`${key}: ${value}`);
  // But now we get USD, USD, and here GBP, GBP. And so what this means is that the key here is exactly the same as the value.
  // So why is that? Well, a set doesn't have keys, right? And it doesn't have indexes either.  And so there is no value that would make sense for the key.
  console.log(`${value}: ${value}`);
  // SOLN
  // And so we can just use an underscore,  which in JavaScript means a throwaway variable.  So that means a variable that is completely unnecessary.  So it's just a convention which we will see again
});

///////////////////// Data Transformations: map, filter, reduce ////////////////////////////

///////// The Map Method
// And as we just learned, the map method is yet another way that we can use to loop over aN ARRAY. But unlike for each, the map method will give us a brand new array and this new array will contain in each position the results of applying a callback function to the original array elements.

const eurToUsd = 1.1;

const movementsUsd = movements.map(function (mov) {
  return mov * eurToUsd;
});

const movementsUsdArr = movements.map((mov) => mov * eurToUsd);

console.log(movements);
console.log(movementsUsd);

// And so, yeah, we could have written this here and it doesn't look too bad either but it's a completely different philosophy. So here in the map method, we use a function  to solve this problem of creating a new array.

// While here we simply loop over one array  and then manually create a new one.  So these are completely different philosophies  or we can also say paradigms.  So this here is more in line with functional programming

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}

console.log(movementsUSDfor);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 3 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}` // this is being returned
);
// So the, for each method creates side effects.

// But now here with this map method,  all we did was to return each of the strings from the callback.

// And so basically they got added into a new array.  And then finally we logged that entire array  to the console and not the elements one by one.

console.log(movementsDescription);

////////////////// The Filter Method

const deposits = movements.filter(function (mov, i, arr) {
  // return booleans
  return mov > 0;
});
const depositsFor = [];
for (const mov of movements) {
  mov > 0 ? depositsFor.push(mov) : " ";
}
const withdrawals = movements.filter(function (mov) {
  // return booleans
  return mov < 0;
});

console.log(deposits);
console.log(depositsFor);
console.log(withdrawals);

////////////////////// The reduce Method

// accumulator -> SNOWBALL
const balanceGlobal = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 10);
console.log(balanceGlobal);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

/////////////////////   The Magic of Chaining Methods ///////////////////////////
//  you can continually chain methods as long as it returns an array
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  //   And so again,  if we want to see that result of only this operation,  we can check out the current array  and the next array method that has chained on that filter.
  // .map((mov) => mov * eurToUsd)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, currMov) => acc + currMov, 0);
// as a result you cant chain any method to reduce beacuse it returns a value 
console.log(totalDepositsUSD);

// let me just give you a couple of remarks about chaining.
// So first we should not overuse chaining,  so we should try to optimize it  because chaining tons of methods one after the other  can cause a real performance issues
// if we have really huge arrays. So if we have a huge chain of methods, chained one after the other, we should try to compress all the functionality that they do into as little methods as possible.
// For example, sometimes we create way more map methods then we actually need, where we could just do it all in just one map call. So when you chain methods like this, keep looking for opportunities of keeping up your codes performance.

// And second, it is a bad practice in JavaScript to chain methods that mutate the underlying original array. And an example of that is the splice method. So again, you should not chain a method like the splice or the reverse method.
// I mean, you can do that, and for a small application like this one, it's not a big deal and it's not going to cause problems, but in a large scale application, it's usually always a good practice to avoid mutating array

/////////////  The Find Method
// we can use the Find method to retrieve one element  of an array based on a condition.

const firstWithdrawal = movements.find((mov) => mov < 0);
// So you see that just like the Filter method,  the Find method also needs a callback function  that returns a Boolean.  So the result of this is of course,  is either true or false.  Now, unlike the Filter method,  the Find method will actually not return a new array  but it will only return the first element  in the array that satisfies this condition.

console.log(movements);
// but there are two fundamental differences.

// First Filter returns all the elements  that match the condition while the Find method  only returns the first one 
// and second and even more important, the Filter method returns a new array while Find only returns the element itself and not an array, okay? So make sure that you understand this fundamental difference.
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find((acc) => acc.owner === "Jessica Davis");

console.log(account);

for (const acc of accounts) {
  acc.owner === "Jessica Davis" ? console.log(account) : "";
}

////////////////  The findIndex Method
// Now, to delete an element from an array, we use the splice method, remember, but for the splice method, we need the index at which we want to delete, and where could that index come from, and you guessed it from the findIndex method.

//////////////////// The Some Method
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some((mov) => mov === -130));
// And probably if I would have named this method,  I would have called it like any.  But of course, that's not the real name  but that's really what it does.  And so if there is any value  for which this condition is true,  then the some method will return true.

const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

//////////////////// The Every Method

// EVERY: CONDITION

console.log(movements.every((mov) => mov > 0)); // false
console.log(account4.movements.every((mov) => mov > 0)); //true
// So again, the every method is pretty similar  to the some method  but as you might guess, the difference between them  is that every only returns true  if all of the elements in the array satisfy the condition  that we pass in.

// Separate callback
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//////////////// The flat Method
// So  removed the nested arrays and flattened the array, which is why the method is called flat.
// and no callback function this time.

const nestedArr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(nestedArr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1)); // default
console.log(arrDeep.flat(2));
// but we can go two levels deep. And so now we get the same result as before. And that's because it now goes, even into the second level of nesting and also takes the element out of depth array.

// So let's say that the bank itself, wants to calculate the overall balance of all the movements of all the accounts.
// const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// using optional chaining
const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

///////////////// The flatMap Method

const overallBalance2 = accounts
  .flatMap((acc) => acc.movements) //And since flat map also does mapping, it needs to receive exactly the same callback   as a map method.   So this is essentially a map method   that all it does is, in the end,   it then flattens the result.
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

// Now just notice that, flat map here, only goes one level deep and we cannot change it. So if you do need to go deeper than just one level, you still need to use the flat method. So anyway, keep these two in mind. Whenever you find yourself in a situation

// where you have nested the race  and need to work with them.  And believe me,  that happens more often than you think,  and I believe that,  even in the course of this course,  there is gonna be another situation.

////////////////////// Sorting Arrays ///////////////////////////
// Strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
console.log(owners);
// you will see that it also now is mutated, okay? And so we have to be very careful with this method.

// Numbers
console.log(movements);
console.log(movements.sort()); // does not work because
// These numbers are not at all ordered in any way, are they? And the reason for this is that the sort method does the sorting based on strings, all right? So that might sound weird but that is just how it works by default. So basically, what it does is to convert everything
// to strings and then it does the sorting itself. And if we look at the result as if they were strings, then the result actually makes sense. So the minus here you see always comes first, okay?
// So first, you have all the minuses here and so that's basically alphabetically the first string that occurs. And then afterwards, you have this one, which starts with one before this four and then before the six.
// So these three are alphabetically ordered if they were strings. And the same here. So you have one first, then two, then three, then four and then seven. So again, if they were strings, then this result would make sense.

// movements.sort((a, b) => {}); // let's just think of a and b  as simply being two consecutive numbers in the array.
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// And so that is because basically the sort method keeps looping over the array and applying this callback function here until everything is in an ascending order according

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

movements.sort((a, b) => a - b); //And by the way, if we return zero here, so in case these two values are the same, then their position simply remains unchanged.
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

// Now, if you have a mixed array, like with strings and numbers together, then this is not gonna work and I advise you to simply not to use the sort method in these cases anyway. And that's because there's not really a point in doing so.

///////////////// More Ways of Creating and Filling Arrays ///////////////////
// normally
const arrs = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

////////// Empty arrays + fill method
const x = new Array(7);
console.log(x);
//this weird behavior of this Array() function  which does it so that whenever we only pass in one argument,  then it creates a new empty argument with that length.  So if we don't know about this special particularity  of the Array() constructor function  then this can lead to weird errors.
console.log(x.map(() => 5)); // this wont work only the fill methods work

x.fill(1); // this mutates the entire array
// Because this method is actually a little bit similar to the slice() method. So besides this value that we want to fill the array with, we can also specify where we want it to start to fill.
console.log(x);

x.fill(1, 3, 5); // number, indexstartpoint, indexendpoint(stops at num before)
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

//////////// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// Now, this Array.from() function was initially introduced into JavaScript in order to create arrays from array like structures. So remember how I talked about so-called Iterables before, so things like Strings, Maps or Sets,

// they are all Iterables in JavaScript.  And so they can be converted to real arrays  using Array.from().  And that's the reason also for the name of the function,  because we can create arrays from other things.
const z = Array.from({ length: 7 }, (_, i) => i + 1); // mapping => second parameter
console.log(z);

////////////////////   ARRAY METHODS IN PRACTICE /////////////////////////////

// 1)
const bankDepositsSum = accounts
  // .map((accs) => accs.movements)
  // .flat() //REPLACED WITH
  .flatMap((accs) => accs.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, curr) => sum + curr, 0);
console.log(bankDepositsSum);

// 2)
// EASIER
// const numDeposits1000 = accounts
//   .flatMap((accs) => accs.movements)
//   .filter((mov) => mov >= 1000).length;

// console.log(numDeposits1000);

// MORE COMPLEX
const numDeposits1000 = accounts
  .flatMap((accs) => accs.movements)
  // .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);
  // .reduce((count, curr) => (curr >= 1000 ? count++ : count), 0); // dint work because
  //   So the plus plus operator did its job here.  But the thing is that when we use it like this,  it will still return the all to value, which here was 10.  And so the same thing happened here.
  //  So we did count plus plus  which then increased the value from zero to one.
  // But the result of this expression here is still zero.  And so zero was returned here to the next iteration.
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0); // the fix
console.log(numDeposits1000);

// Prefixed ++ operator
let a = 10;
console.log(++a);
console.log(a);

// 3)

const reduceAsAnObject = accounts
  .flatMap((accs) => accs.movements)
  .reduce(
    (sum, cur) => {
      cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(reduceAsAnObject);

const { depositts, withdrawal } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.depositts += cur) : (sums.withdrawal += cur);
      sums[cur > 0 ? "depositts" : "withdrawal"] += cur;
      return sums;
    },
    { depositts: 0, withdrawal: 0 }
  );

console.log(depositts, withdrawal);

// 4)
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    // .map((word) => word[0].toUpperCase() + word.slice(1)); // check for the exceptions
    // .map((word) =>
    //   exceptions.includes(word)
    //     ? word
    //     : word[0].toUpperCase() + word.slice(1)
    // ).join(" ");
    // return titleCase;
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");
  return capitalize(titleCase);
};
console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
