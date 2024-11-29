//Seeam Saznan


// Complete variable and function definitions

// Reference to the custom name input field
const customName = document.getElementById('customname');

// Reference to the "Generate random story" button
const randomize = document.querySelector('.randomize');

// Reference to the paragraph element where the story will be displayed
const story = document.querySelector('.story');

// Function to get a random value from an array
function randomValueFromArray(array) {
  // Generate a random index based on the array length
  const random = Math.floor(Math.random() * array.length);
  return array[random]; // Return the random value from the array
}

// Store the big long string of text (story template) with placeholders
const storyText =
  'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';

// Store the first set of possible values to replace :insertx: in the story
const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];

// Store the second set of possible values to replace :inserty: in the story
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];

// Store the third set of possible values to replace :insertz: in the story
const insertZ = [
  'spontaneously combusted',
  'melted into a puddle on the sidewalk',
  'turned into a slug and crawled away',
];

// Event listener for the "Generate random story" button
randomize.addEventListener('click', result);

// Function to generate the random story
function result() {
  // Create a new story starting with the template text
  let newStory = storyText;

  // Select random items from each of the insert arrays
  const xItem = randomValueFromArray(insertX); // Randomly select a value for :insertx:
  const yItem = randomValueFromArray(insertY); // Randomly select a value for :inserty:
  const zItem = randomValueFromArray(insertZ); // Randomly select a value for :insertz:

  // Replace the placeholders in the story template with the randomly selected values
  newStory = newStory.replaceAll(':insertx:', xItem); // Replace all :insertx: placeholders
  newStory = newStory.replace(':inserty:', yItem);   // Replace the first :inserty: placeholder
  newStory = newStory.replace(':insertz:', zItem);   // Replace the first :insertz: placeholder

  // If the user has entered a custom name, replace "Bob" with that name
  if (customName.value !== '') {
    const name = customName.value; // Get the custom name from the input field
    newStory = newStory.replace('Bob', name); // Replace "Bob" with the custom name
  }

  // If the UK radio button is selected, convert the units (weight and temperature)
  if (document.getElementById('uk').checked) {
    // Convert weight from pounds to stones (1 stone = 14 pounds)
    const weight = Math.round(300 * 0.071429) + ' stone'; // Convert 300 pounds to stones
    // Convert temperature from Fahrenheit to Centigrade (C = (F - 32) * 5/9)
    const temperature = Math.round((94 - 32) * (5 / 9)) + ' centigrade'; // Convert 94°F to Celsius

    // Replace the Fahrenheit temperature and pounds weight in the story with converted values
    newStory = newStory.replace('94 fahrenheit', temperature);
    newStory = newStory.replace('300 pounds', weight);
  }

  // Update the text content of the story paragraph with the generated story
  story.textContent = newStory;

  // Make the story visible by changing the visibility style to 'visible'
  story.style.visibility = 'visible';
}
