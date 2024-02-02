"use strict";

///////////////////////////////////////
// Coding Challenge #1

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀

const dataJulia = [3, 5, 2, 12, 7];
const dataKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsOnly = dogsJulia.slice(1, -2);
  console.log(dogsOnly);
  let newData = [...dogsOnly, ...dogsKate];
  console.log(newData);
  newData.forEach(function (age, i) {
    // console.log(age);
    let result =
      age >= 3
        ? ` Dog number ${i + 1} is an adult, and is ${age} years old`
        : ` Dog number ${i + 1} is still a puppy 🐶`;
    console.log(result);
  });
};

checkDogs(dataJulia, dataKate);
console.log("----DATA 2 ----");
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// JONAS'

const checkDogsAge = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(); // he didn't mutate directly here, he created a shallow copy with slice
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
console.log("----Jonas Soln  ----");

checkDogsAge([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogsAge([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////////
// Coding Challenge #2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]

const calcAverageHumanAge = function (ages) {
  // const humanAge = ages.map(function (currDogAge) {
  //   if (currDogAge <= 2) {
  //     return 2 * currDogAge;
  //   }
  //    else if (currDogAge > 2) {
  //     return 16 + currDogAge * 4;
  //   }
  // });
  // return humanAge;

  const humanAge = ages.map((currDogAge) =>
    currDogAge <= 2 ? 2 * currDogAge : 16 + currDogAge * 4
  );
  const adults = humanAge.filter((age) => age >= 18);
  console.log(humanAge);
  console.log(adults);

  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  const average = adults.reduce(
    (acc, curr, i, arr) => acc + curr / arr.length,
    0
  );
  // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

  return average;
};

const data1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(data1);
const data2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(data2);

///////////////////////////////////////
// Coding Challenge #3

// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

const calcAverageHumanAgeArr = (ages) => {
  return ages
    .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter((age) => age >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
  // Now what's really important to notice here, is that this is actually really the only way of calculating the average now. So basically dividing the age by the length of the current array immediately here in each of the iteration. So remember that in the last challenge, I first simply added all the values together. And then afterwards I divided it by the length of the array.

  // So in this case, by the length of the adults array.  However, that would not work in this case.  Because there would be no way of knowing the length  of the adults array.
};

console.log("-------USING MULTIPLE CHAINING ------");
console.log(calcAverageHumanAgeArr([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeArr([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////////
// Coding Challenge #4

// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array.
// Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// GOOD LUCK 😀

// 1.
// Calculate recommended Portion
const recFoodPortion = dogs.forEach(
  (dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28))
);

console.log(dogs);

// 2.
// Find Sarah
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(dogSarah);
const sarah = dogSarah.owners.slice(0, 1);
console.log(sarah);
const quantity = `${sarah}'s dog eats too ${
  dogSarah.curFood > dogSarah.recFood ? "much" : "little"
}`;
console.log(quantity);

// 3.
// ownersEatTooMuch & ownersEatTooLittle
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooLittle);

// 4.
// "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
const ownersEatTooMuchStr = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners)
  .join(" and ");
console.log(`${ownersEatTooMuchStr}'s dog eat too much!`);

const ownersEatTooLittleStr = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners)
  .join(" and ");
console.log(`${ownersEatTooLittleStr}'s dog eat too little!`);

// 5.
// dog eating exact food measure
const accurateFoodMeasure = dogs.some((dog) => dog.curFood === dog.recFood);

console.log(accurateFoodMeasure);

// 6.
// dog eating okay food measure

const okayFoodMeasure = dogs.some(
  (dog) => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
);

console.log(okayFoodMeasure);

// const checkEatingOkay = (dog) =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// console.log(dogs.some(checkEatingOkay)); // so i can reuse it in 7

// 7.
// return the array of recFoodPortion
// console.log(dogs.filter(checkEatingOkay));

// const okayFoodMeasureArr = dogs.filter(okayFoodMeasure); // this wont work because its already returning true or false
// console.log(okayFoodMeasureArr);

const okayFoodMeasureArr = dogs.filter(
  (dog) => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
);
console.log(okayFoodMeasureArr); // here violates the dry principle

// 8.
// sort dogs array
const newDogsArraySorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);

console.log(newDogsArraySorted);
