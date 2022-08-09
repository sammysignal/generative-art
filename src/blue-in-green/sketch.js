
let r = 0;
let g = 255;
let b = 255
let x, y;

let i = 0;

let SPACE = 18;
let STEP_SIZE = 10;

function setup() {
  if (typeof SVG === 'undefined') {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(windowWidth, windowHeight, SVG);
  }
  background(0);
}

function draw() {
  // r = random(255);
  stepG = random(3);
  stepG = STEP_SIZE * Math.floor(stepG) - 1;
  stepB = random(3);
  stepB = STEP_SIZE * Math.floor(stepB) - 1;

  g = Math.max(160, (g + stepG) % 256);
  // b = random(255);
  b = Math.max(160, (b + stepB) % 256);
  x = i*SPACE % windowWidth;
  y = SPACE* Math.floor(i*SPACE / windowWidth);


  noStroke();
  fill(r,g,b,255);
  circle(x,y,24);
  i++;

  if (y > windowHeight + 100) {
    throw new Error("Done");
  }
}