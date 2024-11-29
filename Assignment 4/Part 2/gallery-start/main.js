// Array of image filenames
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Object of alternative text for each image
const altText = {
  'pic1.jpg': 'Closeup of a human eye',
  'pic2.jpg': 'Mountain view',
  'pic3.jpg': 'Ocean sunset',
  'pic4.jpg': 'City skyline',
  'pic5.jpg': 'Forest trail'
};

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Loop through the image filenames array to create thumbnails
imageFilenames.forEach((filename) => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${filename}`);
  newImage.setAttribute('alt', altText[filename]);
  thumbBar.appendChild(newImage);

  // When a thumbnail is clicked, update the displayed image
  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', `images/${filename}`);
    displayedImage.setAttribute('alt', altText[filename]);
  });
});

// Button to toggle the darken effect
btn.addEventListener('click', () => {
  // Toggle the darken effect on the full-size image
  overlay.style.backgroundColor = overlay.style.backgroundColor === 'rgba(0,0,0,0.7)' 
    ? 'rgba(0,0,0,0)' 
    : 'rgba(0,0,0,0.7)';
});
