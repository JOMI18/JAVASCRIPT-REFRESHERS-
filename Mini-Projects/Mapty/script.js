"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// important to plan before you implement

console.log(" STRUCTURE 1");

// navigator?.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);

//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     console.log(latitude, longitude);

//     console.log(firstName);

//     console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

//     const coords = [latitude, longitude];
//     console.log(coords);

//     // L is the namespace
//     const map = L.map("map").setView(coords, 13);
//     console.log(map);
//     // 13 is the zoom
//     L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     map.on("click", function (mapEvent) {
//       console.log(mapEvent);

//       const { lat, lng } = mapEvent.latlng;

//       L.marker([lat, lng])
//         .addTo(map)
//         .bindPopup(
//           L.popup({
//             maxWidth: 250,
//             minWidth: 100,
//             autoClose: false,
//             closeOnClick: false,
//             className:"running-popup"
//           })
//         ).setPopupContent("Workout")
//         .openPopup();
//     });
//   },

//   function () {
//     alert("Could not get your position");
//   }
// );

console.log(" STRUCTURE 2");

// let map, mapEvent;

// navigator?.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);

//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     console.log(latitude, longitude);

//     console.log(firstName);

//     console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

//     const coords = [latitude, longitude];
//     console.log(coords);

//     // L is the namespace
//     map = L.map("map").setView(coords, 13);
//     console.log(map);
//     // 13 is the zoom
//     L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     // Handle Clicks on Maps
//     map.on("click", function (mapE) {
//       mapEvent = mapE;
//       form.classList.remove("hidden");
//       inputDistance.focus();
//     });
//   },

//   function () {
//     alert("Could not get your position");
//   }
// );

// // But remember that whenever we hit the Enter key on any of these fields in a form then that will actually also trigger the submit event on that form. And so that's what we're gonna make use of now. And so let's now add that EventListener.

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   // Clear input fields
//   inputDistance.value =
//     inputDuration.value =
//     inputCadence.value =
//     inputElevation.value =
//       "";

//   // Display Marker
//   console.log(mapEvent);

//   const { lat, lng } = mapEvent.latlng;

//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: "running-popup",
//       })
//     )
//     .setPopupContent("Workout")
//     .openPopup();
// });

// // don't build from the bottom up ... code first architecture later

// inputType.addEventListener("change", function () {
//   inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
//   inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
// });

// // remember closest selects parent not children

// don't build from the bottom up ... code first architecture later

console.log(" STRUCTURE 3 --- PROJECT ARCHITECTURE");

class App {
  #map;
  #mapEvent;

  // this constructor is called immediately the app loads , so its a better option to cal; the get position instead of outside the class
  constructor() {
    this._getPosition();

    //the this in new workout  will point to the form, the element being called on the event listener, so we bing it to manually set the this
    form.addEventListener("submit", this._neWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    navigator?.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert("Could not get your position");
      }
    );
  }

  _loadMap(position) {
    console.log(position);

    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);

    console.log(firstName);

    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    console.log(coords);

    console.log(this); // is undefined because loadmap is being called regularly and in a regular function call this, points to undefined
    // L is the namespace
    this.#map = L.map("map").setView(coords, 13);
    console.log(this.#map);
    // 13 is the zoom
    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handle Clicks on Maps
    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    // remember closest selects parent not children
  }

  _neWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";

    // Display Marker
    console.log(this.#mapEvent);

    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("Workout")
      .openPopup();
  }
}

const app = new App();
