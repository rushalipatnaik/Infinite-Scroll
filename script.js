const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Create Elements for links and photos, Add to DOM
function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //  Create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        // put <img> inside <a>, then put both iniside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//Unsplash API
const count = 10;
const apiKey = '4E-2psQan8W02kn6A-coF_uGaDCmqa540-bO8v4CMSU';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

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

// On load
getPhotos();