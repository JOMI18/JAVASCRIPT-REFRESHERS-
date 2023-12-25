//🥶 Lesson on imports and Export

import { apiKey, namedExports } from "./util.js"; // to export individual as lists
import { namedExports as heroPass } from "./util.js"; // to SET ALIASES {rename}
import * as utilities from "./util.js"; // to export everything from a file
import password from "./util.js" // if your exporting as default

console.log(apiKey, password, namedExports);

console.log(utilities.apiKey);
console.log(heroPass);

// 🥶 Lesson on Variables and Values

let userMessage = 'Hello world'
userMessage= "i'm reusable unlike when I'm set with const"
const player ="Rizzler Alert"
console.log(userMessage, player);

//🥶 Lesson on Operators

console.log("hello" + " " + "world", 10*2); // concatenation, basic operations
console.log(10===5, 10===10, 10>=3); // use to set boolean values


//🥶 Lessons on Functions and Parameters

function greetUser(userName, message="J") { //providing default values that can be overriden
    console.log("greetings humans!", userName, message);
} //defining a function

greetUser("maxine") // calling a function (can be called multiple times)
greetUser("Jomi", "Como Estas") // calling a function (can be called multiple times)


function createString(name, greeting) {
    return "I work Just Fine"+ "." +  " " + name + "," + greeting;
}

const greeting1=createString("Jomi", " Hello!")
console.log(greeting1);


// 🥶 Lesson on Arrow Functions

export default (userName, message) =>{
    console.log("Hello");
    return userName +message
}

userName =>{
    console.log("Hello");
    return userName; 
} // if it has one parameter ypu can removed the bracket

()=>{} // if it has none, bracket must be included

number=>number+3; // if it doesnt have any operation but the return statement you can omit the curly braces {no return needed}
number=>{{ age:  number}}// if youre trying to return an object use 2 braces
// note if statements cant be returned


//🥶 Lessons on Objects and Classes

const users={
    name:"Jomi",
    age: 18,
    greet(){ //functions in objects are called methods
    console.log("I'm a method", this.age);// use this to get the properties of an object
    }
}

console.log(users, users.name);
users.greet()


class User{ //first letter is capital
constructor(name,age) { // to accept parameters & variables
this.name=name;
this.age=age;
}
greeting(){
    console.log("Hi");
}
}

const user1= new User("Feran",20);
console.log(user1);
user1.greeting()


//🥶 Lessons on Array and Array Methods

const hobbies=["sports", "cooking", "reading"]
console.log(hobbies[0]);

hobbies.push("Baking") //Allows You add new item
console.log(hobbies);

// const index= hobbies.findIndex((item)=>{ //finds  index
//     return item ==="sports"
// })
const index= hobbies.findIndex((item)=> item ==="sports") // shorter
console.log(index);

const editedHobbies= hobbies.map((item)=> item + "!" ) // helps transform every item in your array to something else
const editHobbies= hobbies.map((item)=> ({text :item}) ) 
console.log(editedHobbies,editHobbies);


// 🥶Lessons on Destructing

// oN ARRAYS
const fullUserName =["Max", "Usher"];
const firstName = fullUserName[0]
const lastName=fullUserName[1]

// [] or {} on the left side is used for destructuring
console.log(firstName,lastName );

// oR

const [userName, email] = ["Jomi", "getjommy@gmail.com"]
console.log(userName, email); //{you can use any variable on the left for array but for object you have to use the property to destructure}

// oN OBJECTS

const friend={
    name: "Mabu",
    age:18
}

const name= friend.name;
const age= friend.age

console.log(name, age);

// oR

const {name:userNames, ages}={
    name: "Jomi",
    ages:18
}
// name:userName as above the collon is used as an alias to rename

console.log(userNames,ages);

// Destructuring in Function Parameter Lists

function storeOrder({id, currency}) { // destructuring
    localStorage.setItem('id', id);
    localStorage.setItem('currency', currency);
  }

storeOrder({id: 5, currency: 'USD', amount: 15.99}) // still on parameter


// 🥶 Lesson on spread operator

// on arrays
const babyNames =["Jayla", "Taylor", "Letitia", "DeLucca"]

const moreBabyNames=["Oluwajomiloju", "Oluwaferanmi", "Oluwapamilerin", "Oluwaperosayemi"]

const mergeNames= [...babyNames, ...moreBabyNames]

console.log(mergeNames);

// on objects

const cuteNames ={
    name: "Jayla",
    nickName: "Jay"
}

const moreCuteNames={
   gender: "Female",
     ...cuteNames
    }
console.log(moreCuteNames);


// 🥶 Lessons on Control Structures

//  IF conditions

//  const passWord =prompt ("Your Password")
// if (passWord==="Jomi'24") {
//     console.log("Welcome" );
// } else if (passWord==="Jomi'28") {
//     console.log("Congratulations" );
// } else{  
//     console.log("Access denied");
// } 

// For Loops

const fruit=["Pineapple", "Mango"]

for (const favFruit of fruit){
    console.log(favFruit);
}


//🥶 Lesson on Manipulating dom

const spanish=document.querySelector("h5")
spanish.remove()


//🥶 Lesson on Using Function as Values

function handleTimeout() {
    console.log("Timed Out");
}
setTimeout(handleTimeout, 2000);

const handleTiming=()=>{//as an anonymous function
    console.log("Timing Complete");
}

setTimeout(handleTiming, 3000);

setTimeout(() => {
    console.log("I'm the original timing");
}, 5000);
 


function greeter(greetFn) {
    greetFn();
}
greeter(()=>console.log("Greetings!"))


// Lesson on Defining Functions inside of Functions 

function init () {
    function speak() {
        console.log("speaks");
    }
    speak()
}
init();


// 🥶Lessons on reference vs Primitive Values

// Strings, booleans are primitive, they cant be edited 
// objects, arrays are reference values-  they can be edited