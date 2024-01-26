"use strict"

//////////////////////// Coding Challenge #1 //////////////////////

// Let's build a simple poll app!

// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

// Here are your tasks:

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
// What is your favorite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)

//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const selectedNumber = Number(
      prompt(`
        What is your favorite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
        `)
    ); // first issue is that this shouldn't have been written manually {here's where the this keyword comes in.. and it will show undefined because its being called by an events listener- so bind it to the poll to set the pointer fir the this keyword}

    // const selectedNumber = prompt(`
    //     What is your favorite programming language?
    //     0: JavaScript
    //     1: Python
    //     2: Rust
    //     3: C++
    //     (Write option number)
    //     `);
    console.log(selectedNumber);

    if (typeof selectedNumber === "number") {
      console.log(typeof selectedNumber);
      //   if (selectedNumber >= 0 && selectedNumber <= 3) {
      // next time don't hardcode
      if (selectedNumber >= 0 && selectedNumber < this.answers.length) {
        console.log("reaching");
        this.answers[selectedNumber]++; // its selecting this way cos its not a direct element

        for (const [option, value] of poll.options.entries()) {
          // thus is unnecessary {we're not checking if their right were counting how many times an option was picked}
          console.log(option, value);
          //   const selectedOption = option++;
          //   console.log(selectedOption);
        }
      } else {
        console.log("Invalid Number! Try Again...");
        return;
      }
    } else {
      console.log("Not a Number! Try Again...");

      return;
    } //  second issue, I should have short circuited instead of using all these ifs

    // return answer;
  },
  displayResults(type) {},
};

// document
//   .querySelector(".poll")
//   .addEventListener("click", poll.registerNewAnswer);

/////////////    SECOND TRIAL /////////////

const pollApp = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const selectedNumber = Number(
      prompt(` ${this.question}\n ${this.options.join(
        "\n"
      )}\n(Write option number)
          `)
    );
    //JOIN returns an array as a string without distorting the actual array

    console.log(selectedNumber);

    // Register answer
    typeof selectedNumber === "number" &&
      selectedNumber < this.answers.length &&
      this.answers[selectedNumber]++; // its selecting this way cos its not a direct element

    // HOW THIS WORKS
    // AND -- if one value is false, everything would be false....but if both A snd B is True- then they'd  both be true ==> True when ALL are true
    // OR -- If at least one value is true then the result would be true... but if they're both false => then the result will be false  ==> True when ONE is true
    //   for the || operator if the first value is a truthy value it would return the first value without evaluating the second
    // for the && operator if the first value is a falsy value it would return the first value without evaluating the second

    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    // setting the default

    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

// console.log(pollApp.answers);

pollApp.displayResults.call({ answers: [5, 2, 3] }, "string"); //Okay, so the answers come from the this keyword.
// And so if we want to have a different this keyword, then we need to use call.
pollApp.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
pollApp.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
document
  .querySelector(".poll")
  .addEventListener("click", pollApp.registerNewAnswer.bind(pollApp));



  //////////////////////  Coding Challenge #2 /////////////////////////


// This is more of a thinking challenge than a coding challenge 🤓

// Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

// And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

// GOOD LUCK 😀


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector("body").addEventListener("click", function (params) {
    header.style.color = 'blue';
  })
})();

// Then keep in mind that we did not select the h1 here again. I simply used the header variable that we had already selected before. So let's give it a safe. And I will click now the body. And indeed, it became blue, and that worked just fine. So why did this work?

// Or in other words, how does this callback function here, get access to the header variable? And one more time, the explanation is the closure. So I hoped that you really explained basically how the closure works to yourself or to someone else.

// ELSE

// And so in this particular example, the closure is necessary or it's useful because by the time this callback here is executed, this IIFE, so this immediately invoked function expression is now long gone. So it has already been executed. And with it, this variable here is basically gone as well. Right? So all of that is gone.

// But still, this function here is attached to the body element. And so it's waiting for some events to happen there. And when the event happens, well, then this function here is of course, executed.

// And again, even though the environment  in which this function here was created is already gone,  it is still able to access the variables  that were created in that variable  by the time the function was born, so to say.

// So this is the birthplace of or event handler function here.  And therefore the function  remembers all the variables present at a time of its birth.  We can also say  that the header is in the backpack of this function.  So that explanation works as well.