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
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
const insertZ = [
  'spontaneously combusted',
  'melted into a puddle on the sidewalk',
  'turned into a slug and crawled away',
];

// Event listener for the button click
randomize.addEventListener('click', result);

// Function to generate the story
function result() {
  // Create a new story from the template
  let newStory = storyText;

  // Generate random values for placeholders
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // Replace placeholders in the story template
  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  // Replace "Bob" with the custom name if provided
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  // Convert units if UK is selected
  if (document.getElementById('uk').checked) {
    const weight = Math.round(300 * 0.071429) + ' stone'; // Convert pounds to stones
    const temperature = Math.round((94 - 32) * (5 / 9)) + ' centigrade'; // Convert Fahrenheit to Celsius

    // Replace temperature and weight in the story
    newStory = newStory.replace('94 fahrenheit', temperature);
    newStory = newStory.replace('300 pounds', weight);
  }

  // Update the story text and make it visible
  story.textContent = newStory;
  story.style.visibility = 'visible';
}
