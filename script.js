const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = '-HEpyHS3o8GFuDS7tyGfZrxa-r8pnn36vB6A2hSocpU';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.remove();
        console.log('ready=', ready);
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //  Create <a> to link to unsplash
        const item = document.createElement('a');
       
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');

        setAttributes(img, {
          src: photo.urls.regular,
          alt: photo.alt_description,
          title: photo.alt_description,
        });

        // Event listener, check when each is finished
        img.addEventListener('load',imageLoaded);

        // put <img> inside <a>, then put both iniside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




// Get photos from Unsplash API
async function getPhotos() {
    try {
       const response = await fetch(apiURL);
       photosArray = await response.json();
       displayPhotos();
    } catch (error) {
        // Catch Error Here
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();

    }
});

// On load
getPhotos();