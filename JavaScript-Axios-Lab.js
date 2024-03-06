

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_mxidstpgh4wAgHK82BSlA42W0RgfYPzLXWTyxAhjDtEtK3D88bQHyDuVbJlyfdlR";

/* 4. Change all of your fetch() functions to axios!
* - axios has already been imported for you within index.js.
* - If you've done everything correctly up to this point, this should be simple.
* - If it is not simple, take a moment to re-evaluate your original code.
* - Hint: Axios has the ability to set default headers. Use this to your advantage
*   by setting a default header with your API key so that you do not have to
*   send it manually with all of your requests! You can also set a default base URL!
*/
const apiUrl = 'https://api.thecatapi.com/v1/breeds';

async function initialLoad() {
    try {
        const res = await axios.post(apiUrl);
        const breeds = await res.json();
        // console.log(res)
        
        const breedSelect = document.getElementById('breedSelect');
        
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.name;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        })
    } catch (error) {
        console.error('Could not fetch data:', error);
    }
}

initialLoad();


// async function breedSelectEvent(e) {
//     try{
//         const selectedBreed = e.target.value;
//         const res = await axios.post('https://api.thecatapi.com/v1/breeds/search?q=${selectedBreed}')
//         const data = await res.json();
        
//         clearCarousel();
        
//         clearInfoDump();
//         populateInfoDump(data);
        
//         //loop through to create carousel elements for each object in the response array
//         data.forEach(breed => {
//             const carouselItem = createCarouselItem(breed);
//             appendToCarousel(carouselItem);
//         })
//     }
//     catch (error) {
//         console.error('Could not fetch breed information:', error);
//     };
// }

//clearCarousel() function to clear the carousel
async function clearCarousel() {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = '';
}

//clearInfoDump() function to clear and re-populate
async function clearInfoDump() {
    const infoDump = document.getElementById('infoDump');
    infoDump.innerHTML = '';
}

//populateInfoDump(data) 
async function populateInfoDump(data) {
    const infoDump = document.getElementById('infoDump');
    infoDump.innerHTML = '';

    const heading = document.createElement('h1');
    heading.textContent = data[0].name; // Assuming data is an array with at least one element
    infoDump.appendChild(heading);
}

//createCarouselItem(breed)
async function createCarouselItem(breed) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    //image
    const image = document.querySelector('card img');
    image.src = breed.image.url;
    image.alt = breed.name;
    carouselItem.appendChild(image);

    //name
    const heading = document.createElement('h2');
    heading.textContent = breed.name;
    carouselItem.appendChild(heading);

    //origin
    const origin = document.createElement('p');
    origin.textContent = 'Origin: ${breed.origin}';
    carouselItem.appendChild('p');

    //weight
    const weight = document.createElement('p');
    weight.textContent = 'Weight: ${breed.weight.imperial} lbs';

    //temperament
    const tude = document.createElement('p');
    tude.textContent = 'Temperment: ${breed.temperment}';


    //description
    const des = document.createElement('p');
    des.textContent ='Description: ${breed.description}'

    return carouselItem;
}

//appendToCarousel(carouselItem)
async function appendToCarousel(carouselItem) {
    const carousel = document.getElementsByClassName('carousel');
    carousel.appendChild(carouselItem);
}

//event listener to the breedSelect
breedSelect.addEventListener('change', breedSelectEvent)

//call to breedSelectEvent to end intitalLoad and create initial carousel
async function initialLoad() {
    breedSelectEvent({target: {value: breedSelect.value} });
}

initialLoad();

/**
* 5. Add axios interceptors to log the time between request and response to the console.
* - Hint: you already have access to code that does this!
* - Add a console.log statement to indicate when requests begin.
* - As an added challenge, try to do this on your own without referencing the lesson material.
*/

// Create an Axios instance with default configuration
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
    config.metadata = { startTime: new Date() }; 

    return config;
}, error => {
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(response => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    console.log(`Request to ${response.config.url} took ${duration} ms`);
    return response;
}, error => {
    return Promise.reject(error);
});

/**
* 6. Next, we'll create a progress bar to indicate the request is in progress.
* - The progressBar element has already been created for you.
*  - You need only to modify its "width" style property to align with the request progress.
* - In your request interceptor, set the width of the progressBar element to 0%. !
*  - This is to reset the progress with each request.
* - Research the axios onDownloadProgress config option.
* - Create a function "updateProgress" that receives a ProgressEvent object.
*  - Pass this function to the axios onDownloadProgress config option in your event handler.
* - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
*  - Update the progress of the request using the properties you are given.
* - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
*   once or twice per request to this API. This is still a concept worth familiarizing yourself
*   with for future projects.
*/
/**
* 7. As a final element of progress indication, add the following to your axios interceptors:
* - In your request interceptor, set the body element's cursor style to "progress."
* - In your response interceptor, remove the progress cursor style from the body element.
*/

//set the width to 0% and reset with each request
const progressBarZero = document.getElementById('progressBar');
progressBarZero.style.width = '0%';

axiosInstance.interceptors.request.use(config => {
    //Set cursor to progress
    document.body.style.cursor = 'progress';

    progressBar.style.width = '0%';

    config.metadata = { startTime: new Date() };
    return config;
}, error => {
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(response => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    console.log(`Request to ${response.config.url} took ${duration} ms`);

    //Remove progress cursor
    document.body.style.cursor = 'auto';

    return response;
}, error => {
    return Promise.reject(error);
});

//Create a function "updateProgress" that receives a ProgressEvent object
function updateProgress(progressEvent) {
    const progressEvent = {loaded, total};
    const progress = Math.round((loaded * 100) / total);
    progressBarZero.style.width = '${progress}%';
    console.log(progressEvent);
}

//onDownloadProgress passed through event handler
async function breedSelectEvent(e) {
    try {
        const selectedBreed = e.target.value;
        const response = await axiosInstance.get(`https://api.thecatapi.com/v1/breeds/search?q=${selectedBreed}`, {

        onDownloadProgress: updateProgress
        });
        const data = response.data;
        
        clearCarousel();
        clearInfoDump();
        populateInfoDump(data);

        data.forEach(breed => {
            const carouselItem = createCarouselItem(breed);
            appendToCarousel(carouselItem);
        });
    } catch (error) {
        console.error('Could not fetch breed information:', error);
    }
}




/**
* 8. To practice posting data, we'll create a system to "favourite" certain images.
* - The skeleton of this function has already been created for you.
* - This function is used within Carousel.js to add the event listener as items are created.
*  - This is why we use the export keyword for this function.
* - Post to the cat API's favourites endpoint with the given ID.
* - The API documentation gives examples of this functionality using fetch(); use Axios!
* - Add additional logic to this function such that if the image is already favourited,
*   you delete that favourite using the API, giving this function "toggle" functionality.
* - You can call this function by clicking on the heart at the top right of any image.
*/
async function favourite(imgId) {
    try {
        // Check if the image is already favorited
        const isFavoritedResponse = await axiosInstance.get(`https://api.thecatapi.com/v1/favourites?image_id=${imageId}`);
        const isFavorited = isFavoritedResponse.data.length > 0;

        if (isFavorited) {
            // If already favorited, delete the favorite
            await axiosInstance.delete(`https://api.thecatapi.com/v1/favourites/${isFavoritedResponse.data[0].id}`);
            console.log(`Removed from favorites: ${imageId}`);
        } else {
            // If not favorited, add to favorites
            await axiosInstance.post('https://api.thecatapi.com/v1/favourites', { image_id: imageId });
            console.log(`Added to favorites: ${imageId}`);
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Example usage: Call toggleFavorite function when clicking on the heart icon
const heartIcon = document.getElementById('heartIcon');
const imageId = 'YOUR_IMAGE_ID_HERE'; // Replace with the actual image ID

heartIcon.addEventListener('click', () => {
    toggleFavorite(imageId);
});

/**
* 9. Test your favourite() function by creating a getFavourites() function.
* - Use Axios to get all of your favourites from the cat API.
* - Clear the carousel and display your favourites when the button is clicked.
*  - You will have to bind this event listener to getFavouritesBtn yourself.
*  - Hint: you already have all of the logic built for building a carousel.
*    If that isn't in its own function, maybe it should be so you don't have to
*    repeat yourself in this section.
*/


/**
* 10. Test your site, thoroughly!
* - What happens when you try to load the Malayan breed?
*  - If this is working, good job! If not, look for the reason why and fix it!
* - Test other breeds as well. Not every breed has the same data available, so
*   your code should account for this.
*/


// ================= Carousel.js ================//
// import * as bootstrap from "bootstrap";
// import { favourite } from "./index.js";

function createCarouselItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#carouselItemTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);
  
    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;
  
    const favBtn = clone.querySelector(".favourite-button");
    favBtn.addEventListener("click", () => {
      favourite(imgId);
    });
  
    return clone;
  }
  
  function clear() {
    const carousel = document.querySelector("#carouselInner");
    while (carousel.firstChild) {
      carousel.removeChild(carousel.firstChild);
    }
  }
  
  function appendCarousel(element) {
    const carousel = document.querySelector("#carouselInner");
  
    const activeItem = document.querySelector(".carousel-item.active");
    if (!activeItem) element.classList.add("active");
  
    carousel.appendChild(element);
  }
  
  function start() {
    const multipleCardCarousel = document.querySelector(
      "#carouselExampleControls"
    );
    if (window.matchMedia("(min-width: 768px)").matches) {
      const carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false
      });
      const carouselWidth = $(".carousel-inner")[0].scrollWidth;
      const cardWidth = $(".carousel-item").width();
      let scrollPosition = 0;
      $("#carouselExampleControls .carousel-control-next").unbind();
      $("#carouselExampleControls .carousel-control-next").on(
        "click",
        function () {
          if (scrollPosition < carouselWidth - cardWidth * 4) {
            scrollPosition += cardWidth;
            $("#carouselExampleControls .carousel-inner").animate(
              { scrollLeft: scrollPosition },
              600
            );
          }
        }
      );
      $("#carouselExampleControls .carousel-control-prev").unbind();
      $("#carouselExampleControls .carousel-control-prev").on(
        "click",
        function () {
          if (scrollPosition > 0) {
            scrollPosition -= cardWidth;
            $("#carouselExampleControls .carousel-inner").animate(
              { scrollLeft: scrollPosition },
              600
            );
          }
        }
      );
    } else {
      $(multipleCardCarousel).addClass("slide");
    }
  }
  