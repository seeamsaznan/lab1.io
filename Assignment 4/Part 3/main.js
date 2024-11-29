// set up canvas
const canvas = document.querySelector("canvas"); // Select the canvas element
const ctx = canvas.getContext("2d"); // Get the 2D context for drawing

const width = (canvas.width = window.innerWidth); // Set canvas width to window's inner width
const height = (canvas.height = window.innerHeight); // Set canvas height to window's inner height

// function to generate a random number between min and max (inclusive)
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate a random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`; // Returns a random RGB string
}

// Ball class definition
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x; // Ball's x position
    this.y = y; // Ball's y position
    this.velX = velX; // Ball's velocity on the x-axis
    this.velY = velY; // Ball's velocity on the y-axis
    this.color = color; // Ball's color
    this.size = size; // Ball's size
  }

  // Method to draw the ball on the canvas
  draw() {
    ctx.beginPath(); // Begin a new path
    ctx.fillStyle = this.color; // Set fill color to ball's color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw a circle (ball) with the current position and size
    ctx.fill(); // Fill the circle with the color
  }

  // Method to update ball's position and velocity
  update() {
    // Check if the ball hits the right or left wall and reverse its velocity if so
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX); // Reverse the velocity direction if the ball hits the right wall
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX); // Reverse the velocity direction if the ball hits the left wall
    }

    // Check if the ball hits the bottom or top wall and reverse its velocity if so
    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY); // Reverse the velocity direction if the ball hits the bottom wall
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY); // Reverse the velocity direction if the ball hits the top wall
    }

    // Update the ball's position by adding its velocity
    this.x += this.velX;
    this.y += this.velY;
  }

  // Method to detect collisions with other balls
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) { // Ensure it's not comparing the ball with itself
        const dx = this.x - ball.x; // Calculate the difference in the x coordinates
        const dy = this.y - ball.y; // Calculate the difference in the y coordinates
        const distance = Math.sqrt(dx * dx + dy * dy); // Calculate the distance between the two balls

        // If the distance between the balls is less than the sum of their radii, a collision has occurred
        if (distance < this.size + ball.size) {
          // Change both balls' colors to a random color
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Array to hold all the ball objects
const balls = [];

// Create 25 balls and add them to the balls array
while (balls.length < 25) {
  const size = random(10, 20); // Random size between 10 and 20
  const ball = new Ball(
    random(0 + size, width - size), // Random x position, ensuring the ball fits within the canvas
    random(0 + size, height - size), // Random y position, ensuring the ball fits within the canvas
    random(-7, 7), // Random x velocity between -7 and 7
    random(-7, 7), // Random y velocity between -7 and 7
    randomRGB(), // Random color
    size // Size of the ball
  );

  balls.push(ball); // Add the new ball to the array
}

// The animation loop
function loop() {
  // Clear the canvas with a semi-transparent black overlay, creating a trailing effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height); // Fill the entire canvas with the transparent black color

  // Update and draw each ball
  for (const ball of balls) {
    ball.draw(); // Draw the ball
    ball.update(); // Update the ball's position and velocity
    ball.collisionDetect(); // Check for collisions with other balls
  }

  // Repeat the loop as the next frame of the animation
  requestAnimationFrame(loop);
}

// Start the animation loop
loop();
