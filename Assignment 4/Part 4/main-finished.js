// Select the paragraph element to display the ball count
const para = document.querySelector('p');
let count = 0;

// Select the canvas element and get its 2D context for drawing
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set the width and height of the canvas to match the window's dimensions
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Function to generate a random number between a minimum and maximum value
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};

// Function to generate a random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Base class for all shapes
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;      // X position of the shape
    this.y = y;      // Y position of the shape
    this.velX = velX; // X velocity (speed and direction)
    this.velY = velY; // Y velocity (speed and direction)
  }
}

// Ball class extends Shape and represents a moving ball
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color; // Ball's color
    this.size = size;   // Ball's size
    this.exists = true; // Flag to track if the ball is still in existence
  }

  // Method to draw the ball on the canvas
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color; // Set the color of the ball
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw the circle representing the ball
    ctx.fill();
  }

  // Method to update the ball's position and check for boundary collisions
  update() {
    if ((this.x + this.size) >= width) { // Right boundary collision
      this.velX = -(this.velX); // Reverse X velocity
    }

    if ((this.x - this.size) <= 0) { // Left boundary collision
      this.velX = -(this.velX); // Reverse X velocity
    }

    if ((this.y + this.size) >= height) { // Bottom boundary collision
      this.velY = -(this.velY); // Reverse Y velocity
    }

    if ((this.y - this.size) <= 0) { // Top boundary collision
      this.velY = -(this.velY); // Reverse Y velocity
    }

    this.x += this.velX; // Update X position based on velocity
    this.y += this.velY; // Update Y position based on velocity
  }

  // Method to detect collisions with other balls
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) { // Check if it's not the same ball and the other ball still exists
        const dx = this.x - ball.x; // X distance between balls
        const dy = this.y - ball.y; // Y distance between balls
        const distance = Math.sqrt(dx * dx + dy * dy); // Calculate the distance between the two balls

        if (distance < this.size + ball.size) { // Check if the balls are colliding
          ball.color = this.color = randomRGB(); // Change color of both balls on collision
        }
      }
    }
  }
}

// EvilCircle class extends Shape and represents a controllable "evil" circle
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); // Set velocity for EvilCircle movement

    this.color = "white"; // Set the color of the EvilCircle
    this.size = 10;       // Set the size of the EvilCircle

    // Add an event listener to move the EvilCircle with arrow keys
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a': // Move left
          this.x -= this.velX;
          break;
        case 'd': // Move right
          this.x += this.velX;
          break;
        case 'w': // Move up
          this.y -= this.velY;
          break;
        case 's': // Move down
          this.y += this.velY;
          break;
      }
    });
  }

  // Method to draw the EvilCircle on the canvas
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color; // Set stroke color to white
    ctx.lineWidth = 3;           // Set line width for the circle border
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw the circle representing EvilCircle
    ctx.stroke();
  }

  // Method to check if the EvilCircle is within the bounds of the canvas
  checkBounds() {
    if ((this.x + this.size) >= width) { // Right boundary collision
      this.x -= this.size; // Keep EvilCircle within bounds
    }

    if ((this.x - this.size) <= 0) { // Left boundary collision
      this.x += this.size; // Keep EvilCircle within bounds
    }

    if ((this.y + this.size) >= height) { // Bottom boundary collision
      this.y -= this.size; // Keep EvilCircle within bounds
    }

    if ((this.y - this.size) <= 0) { // Top boundary collision
      this.y += this.size; // Keep EvilCircle within bounds
    }
  }

  // Method to detect collisions between the EvilCircle and balls
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) { // Check if the ball still exists
        const dx = this.x - ball.x; // X distance between EvilCircle and ball
        const dy = this.y - ball.y; // Y distance between EvilCircle and ball
        const distance = Math.sqrt(dx * dx + dy * dy); // Calculate the distance between EvilCircle and ball

        if (distance < this.size + ball.size) { // Check if EvilCircle and ball are colliding
          ball.exists = false; // Remove the ball on collision
          count--; // Decrease ball count
          para.textContent = 'Ball count: ' + count; // Update the displayed ball count
        }
      }
    }
  }
}

// Array to store all the balls
const balls = [];

// Populate the array with 25 balls
while (balls.length < 25) {
  const size = random(10, 20); // Random size for the ball
  const ball = new Ball(
    random(0 + size, width - size), // Random X position, ensuring ball fits on canvas
    random(0 + size, height - size), // Random Y position, ensuring ball fits on canvas
    random(-7, 7), // Random X velocity
    random(-7, 7), // Random Y velocity
    randomRGB(), // Random color
    size // Ball size
  );
  balls.push(ball); // Add the ball to the balls array
  count++; // Increase the ball count
  para.textContent = 'Ball count: ' + count; // Update the ball count display
}

// Create an EvilCircle at a random position
const evilBall = new EvilCircle(random(0, width), random(0, height));

// Main loop to animate the canvas
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // Set background color with transparency
  ctx.fillRect(0, 0, width, height); // Fill the canvas with the background color

  // Loop through all balls and update their position, draw, and check collisions
  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // Draw and update the EvilCircle
  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  // Request the next frame of animation
  requestAnimationFrame(loop);
}

// Start the animation loop
loop();
