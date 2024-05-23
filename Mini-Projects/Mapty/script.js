"use strict";

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

////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  // this constructor is called immediately the app loads , so its a better option to cal; the get position instead of outside the class
  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener("submit", this._neWorkout.bind(this));
    //the this in new workout  will point to the form, the element being called on the event listener, so we bing it to manually set the this
    inputType.addEventListener("change", this._toggleElevationField);

    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
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

    // console.log(firstName);

    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    console.log(coords);

    console.log(this); // is undefined because loadmap is being called regularly and in a regular function call this, points to undefined
    // L is the namespace

    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);
    console.log(this.#map);
    // 13 is the zoom

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handle Clicks on Maps
    this.#map.on("click", this._showForm.bind(this));

    // ITS DISPLAYED HERE BECAUSE #MAP IS JUST BEING LOADED SO IT WOULD ONLY SHOW WHEN ITS NOT EMPTY
    this.#workouts.forEach((work) => this._renderWorkoutMarker(work));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    // empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";

    // to rmv the animation first
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => {
      form.style.display = "grid";
    }, 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    // remember closest selects parent not children
  }

  _neWorkout(e) {
    e.preventDefault();
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    // And remember that when we use rest parameters like this, then we get an array. So inputs is an array and we now want to loop over this array, and basically check if all of them are positive. Now there's actually already a predefined method in JavaScript,
    // that is very helpful for that. So remember that we have a nice little method called every.
    // And so let's use it here. And then I will quickly explain what it does.  So the current input,  and then Number.IsFinite, the current input.  So basically, this will loop over the array,  and then each of them,  it will check whether the number is finite or not.
    //  And then in the end, the every method  will only return true if this value here  was true for all of them.  So for all elements in the array.
    // But if only one of these values here was not finite, so if the result here was false for one of the elements of the array, then every will return false. And so that will then be the return value

    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === "running") {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        alert("Inputs have to be positive numbers");
        return;
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout running, create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;

      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        alert("Inputs have to be positive numbers");
        return;
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // Add new object to workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);
    // no need to use bind here because we are directly calling this ourselves

    //  Render workout on list
    this._renderWorkoutList(workout);

    // Hide form + Clear input fields
    this._hideForm();

    // Set Local Storage to all workouts
    this._setLocalStorage();
  }

  // Display Marker
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkoutList(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
   `;

    if (workout.type === "running") {
      html += `
       <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
    `;
    }

    if (workout.type === "cycling") {
      html += `
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>
    `;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");
    console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );
    console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface

    // workout.click();
    // this wont work on objects from the local storage because
    // So basically, that objects coming from local storage will not inherit all the methods that they did before.
  }

  _setLocalStorage() {
    // parameters need to be string
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));

    // a soln for the clicks would be  So, in our getLocalStorage,  we could now loop over this data here,
    // and then restore the objects by creating a new object using the class, based on the data that is coming here from local storage.
    console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach((work) => this._renderWorkoutList(work));
  }

  reset() {
    localStorage.removeItem("workouts");

    location.reload;
    // And location is basically a big object that contains a lot of methods and properties in the browser. And so one of the methods is the ability to reload the page.
  }
}

const app = new App();
// to rest run app.reset() in console

//////////// Managing Workout Data: Creating Classes

class Workout {
  date = new Date();
  id = Date.now() + "".slice(-10);
  clicks = 0;
  // So usually we should never create IDs on our own but always let some library take care of that because this is a very important part of any application.
  constructor(coords, distance, duration) {
    this.coords = coords; // [LAT,LNG]
    this.distance = distance; // in km
    this.duration = duration; //in min
  }

  click() {
    this.clicks++;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // prettier-ignore
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;

    // console.log(this.description);
  }
}

class Running extends Workout {
  type = "running";
  // same as doing
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    // this.type="running"
    // in constructor
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
    // And of course, this will work perfectly fine  because through the scope chain,  this constructor method will get access  to all the methods of the parent class.  And so, of course, that includes this one here.  And so then as the method is executed here,  it will also get access to the type.  And so this is the reason why we can use the type here,
    // even though it is not defined in this class  but only in the child class.  So again, we could not call this method  on a workout object  because that doesn't have a type.  But that's no problem anyway  because we never actually create new workout objects.
  }
  calcSpeed() {
    // km/h
    this.speed = this.duration / (this.distance / 60);
    return this.speed;
  }
}

// test run
// const running1 = new Running([32, -10], 4.2, 34, 154);
// const cycling = new Cycling([32, -10], 34, 24, 154);

// console.log(running1, cycling);

// after studying do challenge {img in app}
