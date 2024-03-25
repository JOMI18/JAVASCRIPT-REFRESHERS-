"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal"); // this becomes a node list not an array... there are  methods we can use still

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");

const allSections = document.querySelectorAll(".section");
const allButtons = document.getElementsByTagName("button");
const imgsTarget = document.querySelectorAll("img[data-src]");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

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
// Page Navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault(); // prevent its automatic moving to the anchored place
//     const id = this.getAttribute("href");
//     console.log(id); // you can use query selector because at the end of the day it has a format of id selector
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// this isnt effective because in a case of 1000 CompressionStream, we would essentially be creating 1000 copies
// a better soln will be event delegation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }

  // there is actually an even more important use case  of event delegation,  which is when we are working with elements  that are not yet on the page on runtime.
  // So by the time the page loads. And a great example are buttons that are added dynamically while using the application. So it's not possible to add event handlers
  // on two elements that do not exist,  but we will still be able to handle events  on elements that don't exist at the beginning  by using event delegation one more time.
});

///////////////////////////////////////
// Tabbed component

// we know that to add event listeners to the body it would be a bad practice to loop over them, hence event delegation {on the parent} would work
tabsContainer.addEventListener("click", function (e) {
  // const clicked = e.target // this is isn't the best way because it gets the element clicked {so if span, span, if button, button}
  // const clicked = e.target.parentElement; // doesn't fully solve that issue because if the button is clicked then the parent element of the button is what is selected
  const clicked = e.target.closest(".operations__tab"); // is the best option because it finds the closest parent to the tab;
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////
// Passing Arguments to Event Handlers --> Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    // So, you see that this time around,  I'm not using the closest methods.  And that's because there are simply no child elements  that we could accidentally click here
    // in this link, right? So that was the reason why we needed the closest method here in this tabs because we had this button, but then we could also click on the span element.
    // And so here we then needed to find the closest element.  So the closest button to both of these places, okay?  But here that's not necessary.
    const link = e.target;

    const siblings = link.closest(".nav").querySelectorAll(".nav__link"); // using it to search ==> querySelectorAll & querySelector
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
// js expects a function in its event handlers
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// and there are also kind of opposite events  of mouseover and mouseenter.  And we use these to basically undo
// what we do on the hover. So the opposite of mouseenter is mouseleave, and the opposite of this mouseover is mouseout.

///////////////////////////////////////
// Implementing a Sticky Navigation: Using the Intersection OBserver API
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // which is the rootMargin, okay?  And this root margin here, for example 90,  is a box of 90 pixels that will be applied  outside of our target element,
  // so of our header here, okay? And so now it is as if the header did not stop right here, but instead, out here.
});
headerObserver.observe(header);

///////////////////////////////////////
// Revealing Sections on Scroll
const revealSection = function (entries, obs) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  //   But we are observing all of the sections  here with this same observer here, right.  And so now we need a way of knowing,  which is the section that actually
  // intersected the viewport.  And so that's what we can use the target [from the logged intersectingAPI] for.  And so let's do that.  So that's at entry dot target.

  //   So you see, as we keep scrolling here,  more and more of these events,  keep getting added.  But in fact, they are actually no longer necessary,

  // because we already did all the work that we wanted. And so we can now unobserve. And so there is again by doing observer, dot unobserve,
  obs.unobserve(entry.target);
};
const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionsObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////
// Implementing Lazy Loading Images

// So that's a huge difference  and that image we then reference here  in this data-src attribute in the html.  So that's a special attribute that we can use,  but any other would work as well.
// So this is not a standard HTML attribute  but instead it's one of these special data attributes
// that we can do ourselves.  And so basically the idea is to...  As we scroll to one of these low resolution images  we will then replace this low resolution image  with the one that is here specified  in the data-src attribute.
// And we then also are gonna remove this class here which has kind of this filter, which makes this image blurred because without this filter,

// So lazy loading images and so once again,  this one is really great for performance  while the other things we did so far are more visual things.  This one really impacts how your site works and especially
// for your users who might have a slow internet connection
// or a low data plan or a slow cell phone.  And we always have to think about these users as well.  Not everyone has a super high end computer  or the latest phone.

const loadingImg = function (entries, obs) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // because the image switching occurs behind the scenes, its a good idea to remove it this way
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  obs.unobserve(entry.target);
};
const imgsObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgsTarget.forEach((img) => {
  imgsObserver.observe(img);
});

///////////////////////////////////////
// Slider

// const sliders = document.querySelector(".slider");
// sliders.style.transform = "Scale(0.4) translateX(-800px)";
// sliders.style.overflow="visible"

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// LECTURES

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

// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.className); // classname not class

// // Setting the attribute
// logo.alt = "Beautiful minimalist logo";

// Non-standard
// console.log(logo.designer); // so you can get it like you would an inbuilt element

// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "Bankist");

// console.log(logo.src); // this gives the http
// console.log(logo.getAttribute("src")); // to get the relative to the folders

// const link = document.querySelector(".nav__link--btn");
// console.log(link.href);
// console.log(link.getAttribute("href"));

//  Data Attributes
// for if we need to store data in the ui { html code }

// console.log(logo.dataset.versionNumber);

///////////////////////////////////////
// Classes
// logo.classList.add("c", "j"); // to add multiple classnames
// logo.classList.remove("c", "j");
// logo.classList.toggle("c");
// logo.classList.contains("c"); // not includes

// Don't use
// logo.className = "jonas";

// because this will override all the existing classes  and also it allows us to only put one class  on any element, all right, so again, only one class

// and it will override whatever is already there, while these four methods here make it really nice to work with the classes by simply allowing us
//  to add and remove classes based on their names,

// without interfering with the classes that are already there.

///////////////////////// Types of Events and Event Handlers ///////////////////////
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");

  // for the event to be handled once
  h1.removeEventListener("mouseenter", alertH1); // also doesn't bubble
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
h1.onmouseenter = function (e) {
  alert("onmouseenter: Great! You are reading the heading :D");
};

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

/////////////////////// Dom traversing  //////////////////////////

// So Dom traversing is basically walking through the Dom. Which means that we can select an element based on another element. And this is very important
// because sometimes we need to select elements  relative to a certain other element.  For example, a direct child or a direct parent element.  Or sometimes we don't even know the structure
// of the Dom at runtime.  And in all these cases, we need Dom traversing.

// GOING DOWNWARDS: CHILD

console.log(h1.querySelectorAll(".highlight"));
// So this here indeed selects all the elements with the highlight class that are children of the h1 element. and that would work no matter how deep these child elements would be inside of the h1 element.
// Okay, and that's very important to notice.

console.log(h1.childNodes); // to get direct children nodes
console.log(h1.children); // to get direct children

// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// GOING Upwards: PARENT
console.log(h1.parentNode);
console.log(h1.parentElement);

// So let's say that on the page, we had multiple headers  so multiple elements with a class of header,  but for some reason  we only wanted to find the one  that is a parent element of h1.
// So of all h1 element here.  And so for that, we can use closest.  And so the closest method receives a query string  just like querySelector and querySelectorAll.

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)"; // the element itself will be returned

// So we can think of closest here  as basically being the opposite of querySelector.  So both receive a query string as an input  but querySelector, finds children,
// no matter how deep in the Dom tree, while the closest method finds parents. And also no matter how far up in the Dom tree. All right, so very important method here to keep in mind,

// Going sideways: siblings
// we'll use more of the elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// the nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// to get all the siblings, go to the parents and get all the children inclusive of the h1
console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

///////////////////////////////////////
// Implementing a Sticky Navigation:

// avoid
//////////////////////  The Scroll Event ////////////////////
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener("scroll", function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

/////////////////// Implementing a Sticky Navigation: Using the Intersection OBserver API ////////////////////
// But what actually is the intersection observer API, and why is it so helpful? Well, this API allows our code to basically observe changes to the way that a certain target element
// intersects another element, or the way  it intersects the viewport.

const obsCallBack = function (entries, observer) {
  // So this callback function here will get called each time that the observed element, so our target element here, is intersecting the root element at the threshold that we defined, okay?
  entries.forEach((entry) => {
    console.log(entry);
  });
};

const obsObject = {
  root: null, //And so the root will once again be null,  because we are again interested in the entire viewport,
  // And this root is the element  that the target is intersecting.  So again, this here is the target,  and the root element will be the element that we want our target element to intersect.

  // threshold: 0.1, //(So you can think of this threshold here  at the percentage that we want to have visible in our root  So in our viewport in this case, )
  // And then second, we can define a threshold. Threshold, and this is basically the percentage  of intersection at which  the observer callback will be called,  so this callback here.  So again that's very confusing,

  threshold: [0, 0.2],
  // Now what I'm gonna do here is to now specify an array, so to specify different thresholds, and one of them is gonna be zero,
  // and the other one 0.2, so that's 20%. So 0% here means that basically our callback will trigger each time that the target element moves completely out of the view,
  // and also as soon as it enters the view, okay? And so that's because the callback function will be called when the threshold is passed when moving into the view and when moving out of the view,
  // and this is really important to remember here.  On the other hand, if we specified one here,  like this, then that means that the callback  will only be called when 100% of the target  is actually visible in the viewport.
};

const observer = new IntersectionObserver(obsCallBack, obsObject);
observer.observe(section1); // which is the target in this case

////////////////////// DOM LIFE CYCLE ////////////////////
// let's take a quick look at a couple of different events
// that occur in the DOM during a webpage's life cycle.
// And when we say lifecycle,  we mean right from the moment  that the page is first accessed, until the user leaves it.

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});
// Now, the first event that we need to talk about  is called DOM content loaded.  And this event is fired by the document  as soon as the HTML is completely parsed, which means that the HTML has been downloaded
// and been converted to the DOM tree. Also, all scripts must be downloaded and execute. before the DOM content loaded event can happen.
// And then name of the event is, as I mentioned, DOM content loaded. All right, now this event does actually not wait for images and other external resources to load.
// Okay. So just HTML and JavaScript need to be loaded.

// we want all our code only to be executed after the DOM is  ready.  Right?  So does that mean that we should wrap our entire code into  an event listener like this?  So with a function like this, well, actually, no,
// we don't need to do that. And that's because we have to script tag, which is the one that imports or a JavaScript into the HTML, right. At the end of the body. So you see it is down here.
// So basically it's the last thing that is going to be read in the HTML. And so basically the browser will only find or script when the rest of the HTML is already parsed anyway.

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

// next up there is also the load event and the load event is fired by the window. As soon as not only the HTML is parsed, but also all the images and external resources like CSS files are also loaded.
// So basically when the complete page has finished loading is  when this event gets fired.

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = "";
});
// Now, finally, the last event that I want to show you is the before unload event, which also gets fired on window. So window.add event listener. And so that's before unload.
// And this event here is created immediately before a user is about to leave a page. So for example, after clicking this close button here in the browser tab, so we can basically use this event to ask users if they are
// 100% sure that they want to leave the page. Now in some browsers to make this work, we need to call prevent default here. In Chrome it's not necessary, but some browsers require it.

// So the only time you should prompt the user,  if they really want to leave the page is for example,  when the user is leaving in the middle of filling out the  form, or like writing a blog post or something like that.

// So a situation in which data could actually be lost by  accident.
