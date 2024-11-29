// Complete variable and function definitions
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Function to get a random value from an array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Store the big long string of text
const storyText =
  'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';

// Store the first set of strings in an array
const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];

// Store the second set of strings in an array
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];

// Store the third set of strings in an array
const insertZ = [
  'spontaneously combusted',
  'melted into a puddle on the sidewalk',
  'turned into a slug and crawled away',
];

// Event listener for the button click
randomize.addEventListener('click', result);

// Function to generate the story
function result() {
  let newStory = storyText;

  // Randomly replace placeholders with values
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  // Check for custom name
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  // Adjust for UK settings
  if (document.getElementById('uk').checked) {
    const weight = Math.round(300 * 0.071429) + ' stone'; // Convert pounds to stones
    const temperature = Math.round((94 - 32) * (5 / 9)) + ' centigrade'; // Convert Fahrenheit to Celsius
    newStory = newStory.replace('94 fahrenheit', temperature);
    newStory = newStory.replace('300 pounds', weight);
  }

  // Display the story
  story.textContent = newStory;
  story.style.visibility = 'visible';
}
