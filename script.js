//Unsplash API
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
const apiKey = 'iwjXcuh0H93E2DJNnctIPawmwjKwQeh-k5WOzSc-2zM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//helper function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    if (imageLoaded === totalImages) {
        ready = true;
        imagesLoaded = 0;
    }

}

//create elements for links, photos, add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })
       
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}



//Get photos from Unsplash API
async function getPhotos() {
   try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    }
   catch (error) {
        console.error(error);
    }
}

//if scrolling is near bottom of the page, load more photos
window.addEventListener("scroll", async () => {
        if (window.innerHeight+ window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        await getPhotos();
    }
})

//On Load
getPhotos();

