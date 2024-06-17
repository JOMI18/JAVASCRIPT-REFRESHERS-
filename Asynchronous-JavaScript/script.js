// "use strict";

// const btn = document.querySelector(".btn-country");
// const countriesContainer = document.querySelector(".countries");

// ///////////////////////////////////////

// // https://countries-api-836d.onrender.com/countries/
// // https://restcountries.com/v2/name/portugal

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText("beforeend", msg);
//   // countriesContainer.style.opacity = 1;
// };

// function renderCountry(data, className = "") {
//   const html = ` <article class="country ${className}">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>`;

//   countriesContainer.insertAdjacentHTML("beforeend", html);
//   // countriesContainer.style.opacity = 1;
// }

// ///////////////////////////////////////
// ///////////////////////////////////////
// // AJAX Call: XMLHttpRequest

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();

//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   //   request.open("GET", `https://restcountries.com/v3.1/region/america`);
//   request.send();

//   request.addEventListener("load", function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = ` <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// // getCountryData("portugal");
// // getCountryData("Nigeria");
// // getCountryData("usa");
// // getCountryData("uk");
// // getCountryData("germany");

// ///////////////////////////////////////
// ///////////////////////////////////////
// // Callback Hell

// const getCountryDataAndNeighbor = function (country) {
//   // ajax call
//   const request = new XMLHttpRequest();

//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   //   request.open("GET", `https://restcountries.com/v3.1/region/america`);
//   request.send();

//   request.addEventListener("load", function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render Country
//     renderCountry(data);

//     // Get neighboring Country

//     const neighbors = data.borders?.[0];
//     const request2 = new XMLHttpRequest();

//     request2.open("GET", `https://restcountries.com/v2/alpha/${neighbors}`);
//     request2.send();
//     request2.addEventListener("load", function () {
//       console.log(this.responseText);

//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       // Render Country
//       renderCountry(data2, "neighbour");
//     });
//   });
// };

// // getCountryDataAndNeighbor("portugal");
// // getCountryDataAndNeighbor("usa");

// // setTimeout(() => {
// //   console.log("1 second passed");
// //   setTimeout(() => {
// //     console.log("2 seconds passed");
// //     setTimeout(() => {
// //       console.log("3 second passed");
// //       setTimeout(() => {
// //         console.log("4 second passed");
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// ///////////////////////////////////////
// ///////////////////////////////////////
// //  Promises and the Fetch API

// // const req = fetch("https://restcountries.com/v2/name/italy");
// // console.log(req);

// // const getData = function (country) {
// //   fetch(`https://restcountries.com/v2/name/${country}`)
// //     .then(function (res) {
// //       console.log(res); // it needs to be in json to be read
// //       return res.json(); // this returns a promise so you need to call then on it too
// //     })
// //     .then(function (data) {
// //       console.log(data);
// //       renderCountry(data[0])
// //     });
// // };

// const getData = function (country) {
//   // country1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     // handling the error part1
//     // .then(
//     //   (res) => res.json(),
//     //   (err) => console.log(err)
//     // )
//     .then((res) => res.json())
//     .then((data) => {
//       renderCountry(data[0]);

//       // country2
//       // the return of a then method is always a promise
//       // no matter if we actually return anything or not.
//       // But if we do return a value, then that value will become the fulfillment value of the return promise.

//       const neighbors = data[0].borders?.[0];
//       return fetch(`https://restcountries.com/v2/alpha/${neighbors}`);
//     })
//     .then((response) => response.json())
//     .then((data) => renderCountry(data, "neighbour"))

//     // promise errors are typically internet isssues
//     .catch((err) => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something Went Wrong  💥💥💥  ${err.message}...Try Again`);
//     })
//     .finally(() => {
//       // Will always call regardless of success
//       countriesContainer.style.opacity = 1;
//     });

//   // don't make this mistake of chaining directly to the call backs.
//   // ..So always return to promise
//   // and then handle it outside by simply continuing
//   // the chain like this.

//   // return fetch(`https://restcountries.com/v2/alpha/${neighbors}`).then(
//   //   (response) =>
//   //     response.json().then((data) => renderCountry(data, "neighbour"))
//   // );
// };

// // getData("italy");

// ///////////////////////////////////////
// ///////////////////////////////////////
// //  Handling Rejections

// // btn.addEventListener("click", function () {
// //   getData("usa");
// // });

// // const getDataErrors = function (country) {
// //   // country1
// //   fetch(`https://restcountries.com/v2/name/${country}`)

// //     .then((res) => {
// //       console.log(res);

// //       if (!res.ok) {
// //         throw new Error(`Country not found (${res.status})`);
// //       }
// //       return res.json();
// //     })
// //     .then((data) => {
// //       renderCountry(data[0]);

// //       // country2

// //       // const neighbors = data[0].borders?.[0];
// //       const neighbors = "usdsddsda";
// //       return fetch(`https://restcountries.com/v2/alpha/${neighbors}`);
// //     })
// //     .then((response) => {
// //       console.log(response);

// //       if (!response.ok) {
// //         throw new Error(`Neighboring Country not found (${response.status})`);
// //       }
// //       return response.json();
// //     })
// //     .then((data) => renderCountry(data, "neighbour"))

// //     // promise errors are typically internet isssues
// //     .catch((err) => {
// //       console.error(`${err} 💥💥💥`);
// //       renderError(`Something Went Wrong  💥💥💥  ${err.message}...Try Again`);
// //     })
// //     .finally(() => {
// //       countriesContainer.style.opacity = 1;
// //     });
// // };

// const getJSon = function (url, errMsg = "Something Went Wrong") {
//   return fetch(url).then((res) => {
//     if (!res.ok) throw new Error(`${errMsg}(${res.status})`);
//     return res.json();
//   });
// };

// const getDataErrors = function (country) {
//   // country1
//   getJSon(`https://restcountries.com/v2/name/${country}`, "Country not found")
//     .then((data) => {
//       renderCountry(data[0]);

//       // country2
//       const neighbors = data[0].borders?.[0];
//       if (!neighbors) throw new Error("No neighbor found");
//       return getJSon(
//         `https://restcountries.com/v2/alpha/${neighbors}`,
//         "Neighboring Country not found"
//       );
//     })
//     .then((data) => renderCountry(data, "neighbour"))

//     .catch((err) => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something Went Wrong  💥💥💥  ${err.message}...Try Again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // getDataErrors("canada");
// // getDataErrors("australia");

// ///////////////////////////////////////
// ///////////////////////////////////////
// //  The Event Loop

// // Okay, so, this is of course, a lot to take in.
// // So let's try to recap what's happened here.  So, the image started loading asynchronously  in the web APIs environment  and not in the call stack, right.  We then used addEventListener to attach  a callback function to the image load event.
// //  And this callback is basically or asynchronous code  it's code that we deferred into the future  because we only want to execute it once the image
// // has loaded. And in the meantime, the rest of the code kept running. Now addEventListener did not put the callback directly in the callback queue. It simply registered the callback, which then kept waiting in the web APIs environment until the load event was fired off.
// // Only then the environment put the call back into queue. Then while in the queue the callback kept waiting for the event loop to pick it up and put it on the call stack. And this happened as soon as the callback was first in line and the call stack was empty. And, that's it actually.
// // So, all this happened so that the image did not have to load in the call stack, but in the background in a non blocking way. So, in a nutshell, the web APIs environment, the callback queue and the event loop, all together, make it possible
// // that asynchronous code can be executed in a non blocking way  even with only one thread of execution in the engine.

// // Because we still have to fetch function getting data from the AJAX call in the background. And this is basically happening with a promise. Remember, now with promises things work in a slightly
// // different way which is why I included this promise example as well. So, let's say that the data has now finally arrived. And so the fetch is done. Now, callbacks related to promises like this one that we registered with the promises then method.
// //  Do actually not go into the callback queue.
// // So, again this callback did we still have here, which is coming from a promise will not be moved into the callback queue. Instead, callbacks of promises have a special queue for themselves, which is the so called microtasks queue. Now, what is special about the microtasks queue is that it basically has priority over the callback queue.
// // So, at the end of an event loop tick, so after a callback has been taken from the callback queue, the event loop will check if there are any callbacks in the microtasks queue. And if there are, it will run all of them before it will run any more callbacks from the regular callback queue. And, by the way, we call these callbacks
// // from promises microtasks. And therefore the name microtasks queue. And there are actually other microtasks but that's not relevant here. So going back to our example, currently, we actually do have a microtask sitting in a microtasks queue, the call stack is also empty.
// //  And therefore the event loop will now take this callback and put it in the call stack just like it does with
// // callbacks from the callback queue. And it doesn't matter if the callback queue is empty or not. So, this would have worked the exact same way even if there were some callbacks in the callback queue. And again, that's because microtasks always have priority. In practice, this means that microtasks can basically cut in line before all other regular callbacks.
// // Now, if one microtask adds a new microtask then that new microtask is also executed before any callbacks from the callback queue. And this means that the microtasks queue
// // can essentially starve the callback queue. Because if we keep adding more and more microtasks, then callbacks in the callback queue can never execute. Now, this is usually never a problem but I just wanted to mention this possibility here anyways, who knows maybe this will be an interview question for you someday

// // console.log("Test start");
// // setTimeout(() => console.log("0 sec timer"), 0);
// // Promise.resolve("Resolved promise 1").then((res) => console.log(res));

// // Promise.resolve("Resolved promise 2").then((res) => {
// //   // for (let i = 0; i < 1000000000; i++) {} the call back queue would have to wait for the microtask no matter how long the task is
// //   console.log(res);
// // });

// // console.log("Test end");

// // but you see, that now only after all this work, the zero second timer message appeared on the screen.
// // And so this is actual proof that these zero seconds that we have here are not a guarantee. Okay.
// // And that is exactly what I wanted to show you. So this means, that you cannot really do high precision things using JavaScript timers.
// //  So just keep that in mind, whenever you are working with promises.
// // So basically with micro-tasks, and with timers at the same time.

// ///////////////////////////////////////
// ///////////////////////////////////////
// // Building a Simple Promise

// // Promise takes an execution function
// // const lotteryPromise = new Promise(function (resolve, reject) {
// //   console.log("Lottery draw is ongoing!");
// //   setTimeout(() => {
// //     if (Math.random() >= 0.5) {
// //       resolve("You Win 🫅🫅🫅");
// //     } else {
// //       // reject("You Lose 💩💩💩");
// //       reject(new Error("You Lost your money 💩💩💩"));
// //     }
// //   }, 2000);
// // });

// // lotteryPromise
// //   .then((res) => console.log(res))
// //   .catch((err) => console.error(err));

// // Now, in practice, most of the time all we actually do  is to consume promises. And we usually only built promises  to basically wrap old
// //  callback based functions into promises.  And this is a process that we call promisifying.
// // So basically promisifying means to convert callback based asynchronous behavior to promise based.

// ////////////////////////////////////
// /////////////////////////////////
// // Promisifying setTimeout
// // const wait = function (seconds) {
// //   return new Promise(function (resolve) {
// //     setTimeout(resolve, seconds * 1000);
// //   });
// // };

// // wait(1)
// //   .then(() => {
// //     console.log("1 second passed");
// //     return wait(2);
// //   })
// //   .then(() => {
// //     console.log("2 second passed");
// //     return wait(3);
// //   })
// //   .then(() => {
// //     console.log("3 second passed");
// //     return wait(4);
// //   })
// //   .then(() => console.log("4 second passed"));

// // soln to

// // setTimeout(() => {
// //   console.log('1 second passed');
// //   setTimeout(() => {
// //     console.log('2 seconds passed');
// //     setTimeout(() => {
// //       console.log('3 second passed');
// //       setTimeout(() => {
// //         console.log('4 second passed');
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// // Promise.resolve("abc").then((x) => console.log(x));
// // Promise.reject(new Error("Problem!")).catch((x) => console.error(x));

// ////////////////////////////////////
// /////////////////////////////////
// // Promisifying the Geolocation API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // ); same as
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosition().then(pos => console.log(pos));

// const whereAmINow = function () {
//   getPosition()
//     .then((pos) => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then((data) => renderCountry(data[0]))
//     .catch((err) => console.error(`${err.message} 💥`));
// };

// btn.addEventListener("click", whereAmINow);

// //////////////////////////////
// //////////////////////////////
// //Consuming Promises with Async/Await

// const getLocation = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const findMe = async function (country) {
//   // geolocation
//   const pos = await getLocation();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   // reverse coding
//   const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   // country data
//   const res = await fetch(
//     `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//   );
//   // console.log(res);
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };

// // And so in an a async function like this one, we can use the await keyword to basically await for the result of this premise. So basically await will stop decode execution at this point of the function until the premise is fulfilled.
// // And so until the data has been fetched in this case, but now after that explanation, you might think isn't stopping the code, blocking the execution? Well, that's a really good question, but the answer is actually no, in this case,
// // because stopping execution in an a async function, which is what we have here is actually not a problem because this function is running asynchronously in the background. And so therefore it is not blocking the main threat of execution.
// // So it's not blocking the call stack. And in fact, that's,
// // what's so special about a single wait. So it's the fact that it makes our code look like regular asynchronous code while behind the scenes. Everything is in fact asynchronous.

// // findMe();
// // console.log("FIRST");

// //////////////////////////////
// //////////////////////////////
// // Error Handling With try...catch

// // try {
// //   let y = 1;
// //   const x = 2;
// //   x = 3;
// // } catch (err) {
// //   alert(err.message);
// // }

// const findMyLocation = async function () {
//   try {
//     // geolocation
//     const pos = await getLocation();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // reverse coding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error("Problem getting location data");

//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     // country data
//     const res = await fetch(
//       `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//     );

//     if (!res.ok) throw new Error("Problem getting country");

//     // console.log(res);
//     const data = await res.json();
//     // console.log(data);
//     renderCountry(data[0]);
//     return `You are in ${dataGeo.city}, ${dataGeo.country}`; // THE FULFILLED VALUE OF THE PROMISE
//   } catch (error) {
//     console.error(`${error}...............`);
//     renderError(`💥 ${error.message}`);

//     // Reject promise returned from async function
//     throw error;
//   }
// };

// // findMyLocation();

// // Returning Values from Async Functions

// console.log("1: Will get location");
// // const city = findMyLocation();
// // console.log(city); // IT'LL SIMPLY RETURN THE PROMISE AND NOT THE STRING BECAUSE ATP JS WONT KNOW THE VALUE SO THE SOLN WILL BE USING .THEN

// // findMyLocation()
// //   .then((city) => console.log(`2: ${city}`))
// //   .catch((err) => console.error(`2: ${err.message} 💥`))
// //   .finally(() => console.log("3: Finished getting location"));

// // to use async await instead of the .then
// // use an iife

// (async function () {
//   try {
//     const city = await findMyLocation();
//     console.log(`2: ${city}`);
//   } catch (error) {
//     console.error(`2: ${error.message} 💥`);
//   }

//   console.log("3: Finished getting location");
// })();

// ///////////////////////////////////////
// ///////////////////////////////////////
// // Running Promises in Parallel

// const getCountries = async function (c1, c2, c3) {
//   try {
//     const [data1] = await getJSon(
//       `https://restcountries.eu/rest/v2/name/${c1}`
//     );
//     const [data2] = await getJSon(
//       `https://restcountries.eu/rest/v2/name/${c2}`
//     );
//     const [data3] = await getJSon(
//       `https://restcountries.eu/rest/v2/name/${c3}`
//     );
//     console.log([data1.capital, data2.capital, data3.capital]);

//     // and so as I explained, that doesn't make a lot of sense. So instead of running these promises in sequence, we can actually run them in parallel, so all at the same time.
//     // And so then we can save valuable loading time, making these three here, basically load at the same time.
//     //  And each of them takes half a second. And so with that, we will basically save one second,
//     // which is actually a lot of time when loading a website. So let's do that, and for doing that, we use the promise.all combinator function, so promise.all.
//     //  And so this is once again, kind of a helper function on this promise constructor. So it's a static method, right? Now, this function here takes in an array of promises,
//     // and it will return a new promise, which will then run all the promises in the array at the same time.
//   } catch (err) {
//     console.error(err);
//   }
// };

// // getCountries('portugal', 'canada', 'tanzania');

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSon(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJSon(`https://restcountries.eu/rest/v2/name/${c2}`),
//       getJSon(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);

//     // And so promise.all receives an array and it also returns an array. And so to create the same output as before, now, all we have to do is to loop over this data and take out the data that we want.

//     console.log(data.map((d) => d[0].capital));

//     // that's also very important to mention here is that if one of the promises rejects, then the whole promise.all actually rejects as well. So we say that promise.all short circuits when one promise rejects.
//     //   Okay, and that's the promise.all combinator. So it's called a combinator function because it allows us to combine multiple promises.
//   } catch (err) {
//     console.error(err);
//   }
// };

// // get3Countries("portugal", "canada", "tanzania");

// ///////////////////////////////////////
// ///////////////////////////////////////
// // Other Promise Combinators: race, allSettled and any

// ////////////// Promise.race
// // And Promise.race, just like all other combinators, receives an array of promises and it also returns a promise. Now this promise returned by Promise.race is settled as soon as one of the input promises settles.
// // And remember that settled simply means
// // that a value is available, but it doesn't matter if the promise got rejected or fulfilled. And so in Promis.race, basically the first settled promise wins the race.

// (async function () {
//   const res = await Promise.race([
//     getJSon(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSon(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSon(`https://restcountries.eu/rest/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// // Okay, so again, just keep in mind that here in Promised.race, we only get one result and not an array of the results of all the three.
// // Now a promise that gets rejected can actually also win the race. And so we say that Promise.race short circuits whenever one of the promises gets settled.
// //  And so again, that means no matter if fulfilled or rejected.

// // const timeout = function (sec) {
// //   return new Promise(function (_, reject) {
// //     setTimeout(function () {
// //       reject(new Error("Request took too long!"));
// //     }, sec * 1000);
// //   });
// // };

// Promise.race([
//   getJSon(`https://restcountries.eu/rest/v2/name/tanzania`),
//   timeout(5),
// ])
//   .then((res) => console.log(res[0]))
//   .catch((err) => console.error(err));

// //////////// Promise.allSettled
// //  is Promise.allSettled. And this one is a pretty new one. It is from ES2020 and it is actually a very simple one. So it takes in an array of promises again, and it will simply return an array of all the settled promises. And so again, no matter if the promises got rejected or not. So it's similar to Promise.all
// // in regard that it also returns an array of all the results, but the difference is that Promise.all will short circuit as soon as one promise rejects, but Promise.allSettled, simply never short circuits. So it will simply return all the results of all the promises. So Promise.allSettled.

// Promise.allSettled([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another success"),
// ]).then((res) => console.log(res));

// Promise.all([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another success"),
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// ////////// Promise.any [ES2021]
// //   So we get Promised.any is not a function. But again in your case, it might already work. So let me simply explain what it does. So as always Promise.any takes in an array
// // of multiple promises and this one will then return the first fulfilled promise and it will simply ignore rejected promises. So basically Promise.any is very similar
// // to Promise.race with the difference that rejected promises are ignored. And so therefore the results of Promise.any is always gonna be a fulfilled promise,
// Promise.any([
//   Promise.resolve("Success"),
//   Promise.reject("ERROR"),
//   Promise.resolve("Another success"),
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

