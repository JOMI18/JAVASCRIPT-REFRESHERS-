"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal"); // this becomes a node list not an array... there are  methods we can use still

const header = document.querySelector(".header");

const allSections = document.querySelectorAll(".section");
const allButtons = document.getElementsByTagName("button");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault(); // corrects hyperlink jumping
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////    Selecting, Creating, and Deleting Elements  /////////////////////

///////////////////////////////////////
// Selecting Elements
console.log(document.documentElement);
// So just document here is not enough to select the document element because this is not the real DOM element, all right?
// So for example if we want to apply CSS styles to the entire page we always need  to select document element, okay?

console.log(document.head);
console.log(document.body);

// querySelector its available not just on documents but also on elements, and will be useful for selecting child Elements
console.log(document.querySelector(".header")); // returns the first element
console.log(document.querySelectorAll(".section")); //returns all the elements as a node list

// dont forget getElements don't require a selector
console.log(document.getElementById("section--1"));
console.log(document.getElementsByClassName("btn"));
console.log(document.getElementsByTagName("button"));

// So that's different from a node list  because an HTML collection is actually  a so-called life collection.
// And that means that if the DOM changes then this collection  is also immediately updated automatically.
//  So for example, if I remove this button here  and I can do that by clicking inspect  and then that will select that button here
// then all I need to do is to hit delete  and then if I go back here to the console  and try to read the allButtons again
// then you see that we only have eight elements in here  while before we had nine, right?  So that's something very important to
//  keep in mind  when you use this selector here, okay?  And sometimes it's actually quite helpful  to have an HTML collection like this
// which updates automatically because of course we can also delete elements from the DOM programmatically not just manually
// like I just deleted this button here earlier, all right.

///////////////////////////////////////
// Creating and Inserting Elements

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent =
//   " We use cookies to improve our functionality and analytics";
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// prepend and append can be used to both add and position
header.prepend(message); //So prepending basically adds the element as the first child of this element, okay?

header.append(message); // But we can also edit as the last child. And so that is a append.
// Now what we see here is that the element was actually only insert at once, now that's because this element here so message is now indeed a life element living in the DOM.
// And so therefore it cannot be at multiple places at the same time. It's just like a person that also cannot be at two places simultaneously, right?
// So what's happened here is that we first prepended  the element and then we appended it.

// But now what if we actually wanted to insert multiple copies of the same element? Well, in that case we actually would have  to first copy the first element.
// header.append(message.cloneNode(true)); // meaning all the child elements will be copied

// header.before(message); // the header element ... as a sibling
// header.after(message);

// .insertAdjacentHTML

// header.insertAdjacentHTML("afterbegin", message.innerHTML);

///////////////////////////////////////
// Deleting Elements

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.parentElement.removeChild(message)
    // And by the way, this way of moving up and down  in the DOM tree like selecting, the parent element  is called DOM traversing.
    message.remove(); // recent
  });

//////////////////   Styles, Attributes and Classes /////////////////////

///////////////////////////////////////
// Styles -- those set in js are set as inline styles

message.style.backgroundColor = "#37383d";
message.style.width = "104%";

// Now you might think that we are able to also read styles using this, so using the style property, but let's see what's gonna happen,
// so message.style, and let's say we want to get the height,  so let's see what we get and we get,  well basically nothing,
// and that's because using the style property  like this here only works for inline styles  that we set ourselves also using this style property.
//  So it's gonna work for example, for the background color,
console.log(message.style.color);
console.log(message.style.backgroundColor);

// Soln is to use get computed styles
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 15 + "px";
// document.documentElement.style.setProperty("--color-primary", "orangered");

///////////////////////////////////////
// Attributes;

const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className); // classname not class

// Setting the attribute
logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer); // so you can get it like you would an inbuilt element

console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

console.log(logo.src); // this gives the http
console.log(logo.getAttribute("src")); // to get the relative to the folders

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

//  Data Attributes
// for if we need to store data in the ui { html code }

console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c", "j"); // to add multiple classnames
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes

// Don't use
logo.clasName = "jonas";
// because this will override all the existing classes  and also it allows us to only put one class  on any element, all right, so again, only one class

// and it will override whatever is already there, while these four methods here make it really nice to work with the classes by simply allowing us
//  to add and remove classes based on their names,

// without interfering with the classes that are already there.

///////////////////  Implementing Smooth Scrolling  ////////////////////

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener(
  "click",

  function (e) {
    const s1coords = section1.getBoundingClientRect(); //then we get to this DOM rectangle now, right? relative to the screen
    console.log(s1coords);

    //   So this BoundingClientRect is basically relative to this visible view port, all right?
    console.log(e.target.getBoundingClientRect());

    console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

    console.log(
      "height/width viewport",
      document.documentElement.clientHeight,
      document.documentElement.clientWidth
    );

    // Scrolling
    // window.scrollTo(
    //   s1coords.left + window.pageXOffset,
    //   s1coords.top + window.pageYOffset
    // );

    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: 'smooth',
    // });

    section1.scrollIntoView({ behavior: "smooth" });
  }
);

///////////////////////////////////////
// Types of Events and Event Handlers
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");

  // for the event to be handled once
  h1.removeEventListener("mouseenter", alertH1);
  // doesnt have to be here
};

// METHOD 1
h1.addEventListener("mouseenter", alertH1); // mouseenter works like hover

// Now, there are two ways why addEventListener is better.  And the first one is that it allows us to add  multiple event listeners to the same event.
//  So, we could do this here again
// and simply change the function here. But if we did the same with this property, then the second function would basically simply override the first one.
//  So, that's one advantage of addEventListener.
// And the second one even more important is that we can actually remove an event handler in case we don't need it anymore. And this is something that
//  we hadn't done before, but it's actually very simple
// and very useful from time to time.  And to do that, first we need to export the function  into a named function.

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// METHOD 2 -- OLD SCHOOL
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// METHOD 3
// On the html but don't do this

///////////////////////////////////////////////////////
//Event Propagation: Bubbling and Capturing

// But anyway, let's now say that a click happens on the link.  And as we already know,  the dom then generates a click event right away.

// However, this event is actually not generated  at the target element.  So at the element, where the event happened,  in this case, the click on the anchor element.

// Instead, the event is actually generated  at the root of the document,  so at the very top of the dom tree.  And from there, the so-called capturing phase happens,
//  where the event then travels all the way down  from the document route to the target element.

// And as the event travels down the tree, it will pass through every single parent element of the target element. So in our example, here, the HTML element,
//  the body element, the section,
//  then the paragraph, until it finally reaches its target. As soon as the event reaches the target, the target phase begins, where events can be handled right
//  at the target. And as we already know,

// we do that with event listeners, such as this one. So event listeners wait for a certain event to happen on a certain element, and as soon as the event occurs,
//  it runs the attached callback function. In this example,

// it will simply create this alert window, all right? And again, this happens in the target phase. All right, now, after reaching the target, the event then
//  actually travels all the way up to the document route again, in the so-called bubbling phase. So we say that events bubble up

// from the target to the document route.  And just like in the capturing phase,  the event passes through all its parent elements,  and really just the parents,
// so not through any sibling elements.  So as an event travels down and up the tree,  they pass through all the parent elements,  but not through any sibling element.  But now you might be wondering why is this so important?  Why are we learning about all this detail?  Well, it is indeed very important because basically,  it's as if the event also happened  in each of the parent elements.  So again, as the event bubbles through a parent element,  it's as if the event had happened  right in that very element.  What this means is that if we attach  the same event listener, also for example,

// to the section element, then we would get  the exact same alert window for the section element as well.  So we would have handled the exact same event twice,
// once at its target, and once at one of its parent elements.  And this behavior will allow us  to implement really powerful patterns,  as we will see
// throughout the rest of the section.  So this really is very, very important to understand.  Now by default, events can only be handled in the target,
//  and in the bubbling phase.  However, we can set up event listeners in a way  that they listen to events in the capturing phase instead.
// Also, actually not all types of events  that do have a capturing and bubbling phase.  Some of them are created right on the target element,
//  and so we can only handle them there.

// But really, most of the events do capture and bubble such as I described it here in this lecture. We can also say that events propagate,
// which is really what capturing and bubbling is. It's events propagating from one place to another.

///////////////////////////////////////
// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
  
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);
//   console.log(e.currentTarget === this); // the same in any event handler

//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
// },true); // true/false is the parameter for capturing the events--- its not so useful
