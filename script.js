const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let loadingImagesComplete = false;
let imagesLoaded = 0;
let totalAvailableImages = 0;
let photosArray = [];
let requiredImages = 5;
const apiKey = "iwjXcuh0H93E2DJNnctIPawmwjKwQeh-k5WOzSc-2zM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${requiredImages}`;

//helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalAvailableImages) {
    loadingImagesComplete = true;
    loader.hidden = true;
    requiredImages = 15;
  }
}

//create elements for links, photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalAvailableImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    responseArray = await response.json();
    photosArray = [...responseArray];
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

//if scrolling is near bottom of the page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    loadingImagesComplete
  ) {
    loadingImagesComplete = false;
    getPhotos();
  }
});

//On Load
getPhotos();
