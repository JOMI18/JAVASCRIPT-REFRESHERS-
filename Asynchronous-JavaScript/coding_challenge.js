///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const getCoordinates = function (url, error = "Something is wrong") {
  return fetch(url).then((res) => {
    if (!res.ok) {
      console.log(`${error}  (Status: ${res.status})`);
      throw new Error(`${error}  (Status: ${res.status})`);
    }
    return res.json();
  });
};

const whereAmI = function (lat, lng) {
  getCoordinates(
    `https://geocode.xyz/${lat},${lng}?geoit=json`,
    "Theres a problem with geocoding"
  )
    .then((data) => {
      //   console.log(`the response: ${data}`);
      //   //   The issue is that when you use string interpolation to log an object in JavaScript, it gets converted to a string representation like [object Object]. To see the actual contents of the object, you can use JSON.stringify or log the object directly.
      //   console.log(`the response: ${JSON.stringify(data)}`); // Use JSON.stringify to log the object

      console.log(data);
      //   console.log(data[0]);
      console.log(`You are in ${data.city}, ${data.country}`);

      return getCoordinates(
        `https://restcountries.com/v2/name/${data.country}`,
        "Theres a problem with rest countries"
      );
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => {
      //   console.log(err);
      console.log(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

function renderCountry(data, className = "") {
  const html = ` <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
}

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const imageContainer = document.querySelector(".images");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;
    // console.log(img);

    img.addEventListener("load", function () {
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;

// createImage("img/img-1.jpg")
//   .then((img) => {
//     // console.log(img);
//     currentImg = img;
//     // console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     // wait doesn't return any value....current img is global so the other promises can have access to it
//     currentImg.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     // console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage("img/img-3.jpg");
//   })
//   .catch((err) => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const loadNPause = async function () {
  try {
    // 1
    let newImg = await createImage("img/img-1.jpg");
    // console.log(newImg);
    console.log("Image 1 loaded");
    await wait(2);
    newImg.style.display = "none";

    // 2
    newImg = await createImage("img/img-2.jpg");
    // print(newImg);
    // console.log(newImg);
    console.log("Image 2 loaded");
    await wait(2);
    newImg.style.display = "none";

    // 3
    newImg = await createImage("img/img-3.jpg");
    // print(newImg);
    // console.log(newImg);
    console.log("Image 3 loaded");
    await wait(2);
    newImg.style.display = "none";
  } catch (error) {
    console.log(error.message);
  }
};

loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => {
      // console.log(img);
      return await createImage(img);
    });
    // console.log(imgs);
    const pics = await Promise.all(imgs);
    console.log(pics);

    // However, with all the knowledge that you just learned in the section, if we really think about is then it might actually make sense. So, here we have an async function, right? And this is an arrow function. So we have an implicit return.
    // So this is like returning something from this callback function in each iteration, right? However, as we already know, an async function will always return a promise and not really the value that we're interested in, right? Instead, the value that we want to return is going to be the fulfilled value of the promise
    // that the async function returns. Remember that? And so that is exactly what is happening here, but it is happening simply three times. So we are returning something three times from an async function here, and so therefore the result will be three promises, okay?
    // So just like it happened in that lecture where we attempted to return a string from one of the functions, remember that? So here it is indeed the exact same situation. So again, we end up with this array of promises,
    // okay? But of course behind the scenes, the images are already being loaded, and so we're basically fine.

    pics.forEach((img) => img.classList.add("parallel"));

    //     So once you need to use async await in a map method like this, which believe me is pretty common, then you end up with an array of promises
    // that you can then as a next step handle like this. So with the Promise.all combinator function. And so now what the next step is actually pretty easy. All they have to do is to loop over this array
  } catch (error) {
    console.error(err);
  }
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
