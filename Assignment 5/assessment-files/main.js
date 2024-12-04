

// functionality for showing/hiding the comments section

const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';

showHideBtn.onclick = function() {
  let showHideText = showHideBtn.textContent;
  if(showHideText === 'Show comments') {
    showHideBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
  } else {
    showHideBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
  }
};

/* added */
showHideBtn.onkeydown = (e) => {
  if (e.key === "Enter") {
    showHideBtn.click();
  }
}

// functionality for adding a new comment via the comments form

const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = function(e) {
  e.preventDefault();
  submitComment();
};

function submitComment() {
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  const nameValue = nameField.value;
  const commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = '';
  commentField.value = '';
}

// audio transcript
const transcript = document.querySelector('.transcript');
const transcriptBtn = document.querySelector('.transcript-button');
const transcriptCon = document.querySelector('.transcript-container')

transcriptBtn.onclick = () => {
  if(transcriptBtn.textContent === 'Show transcript') {
    transcript.style.display = "block";
    transcriptBtn.textContent = 'Hide transcript';
  } else {
    transcript.style.display = "none";
    transcriptBtn.textContent = 'Show transcript'
  }
}

// hamburger menu
const nav = document.querySelector("nav")
const hamIcon = document.querySelector(".hamIcon")
const navMenu = document.querySelector("nav ul")
navMenu.className = "hidden";

hamIcon.onclick = () => {
  if(navMenu.className === "hidden") {
    navMenu.style.visibility = "visible";
    navMenu.className = "visible";
  } else if (navMenu.className === "visible") {
    navMenu.style.visibility = "hidden";
    navMenu.className = "hidden";
  }
}

/* How can I hide navMenu when any of the link is pressed?
failed attempt:
nav.addEventListener("focusout", ()=> {
  navMenu.style.visibility = "hidden";
  navMenu.className = "hidden";
})
*/

