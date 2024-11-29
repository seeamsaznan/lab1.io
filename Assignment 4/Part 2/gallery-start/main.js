// Select the elements on the page for the displayed image and the thumbnail bar
const displayedImage = document.querySelector('.displayed-img'); // The image that will show in full size
const thumbBar = document.querySelector('.thumb-bar'); // The container that will hold the thumbnail images

// Select the button and the overlay that darkens the image
const btn = document.querySelector('button'); // The button to darken or lighten the image
const overlay = document.querySelector('.overlay'); // The overlay that adds the darkening effect

/* Declaring the array of image filenames */
const images = ['pic1.jpg', `pic2.jpg`, `pic3.jpg`, `pic4.jpg`, `pic5.jpg`]; // Array of image file names
const alts = { // Object that holds the alternative text for each image
  'pic1.jpg' : 'Closeup of a human eye',
  'pic2.jpg' : 'Rock that looks like a wave',
  'pic3.jpg' : 'Purple and white pansies',
  'pic4.jpg' : 'Section of wall from a pharaoh\'s tomb',
  'pic5.jpg' : 'Large moth on a leaf'
}

/* Looping through images */
// For each image in the images array, do the following
for (const image of images) {
  // Create a new <img> element for each image
  const newImage = document.createElement('img');
  
  // Set the source and alternative text for the new image
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', alts[image]);
  
  // Add the new image to the thumbnail bar
  thumbBar.appendChild(newImage);
  
  // When the thumbnail image is clicked, change the displayed image
  newImage.addEventListener('click', e => {
    displayedImage.src = e.target.src; // Update the full-size image source
    displayedImage.alt = e.target.alt; // Update the alt text for the full-size image
  });
}

/* Wiring up the Darken/Lighten button */
// When the button is clicked, toggle the darken or lighten effect
btn.addEventListener('click', () => {
  // Get the current class of the button to check if it is "dark" or "light"
  const btnClass = btn.getAttribute('class');
  
  // If the button is in "dark" mode, change it to "light" mode and apply the darken effect
  if (btnClass === 'dark') {
    btn.setAttribute('class','light'); // Change the button class to "light"
    btn.textContent = 'Lighten'; // Change the button text to "Lighten"
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'; // Darken the image with the overlay
  } else {
    // If the button is in "light" mode, change it to "dark" mode and remove the darken effect
    btn.setAttribute('class','dark'); // Change the button class to "dark"
    btn.textContent = 'Darken'; // Change the button text to "Darken"
    overlay.style.backgroundColor = 'rgba(0,0,0,0)'; // Remove the darken effect by making the overlay transparent
  }
});
