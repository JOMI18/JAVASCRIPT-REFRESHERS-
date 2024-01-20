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

pollApp.displayResults.call({ answers: [5, 2, 3] }, "string");
pollApp.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
pollApp.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
document
  .querySelector(".poll")
  .addEventListener("click", pollApp.registerNewAnswer.bind(pollApp));
