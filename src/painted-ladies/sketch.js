CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 1000;

function callWithPoints(f, ...args) {
  let l = args.length;
  for (i = 0; i < l; i++) {
    f.bind(args[i]).bind()
  }
}

// Draw a line between two point locations
function lineP(point1, point2) {
  line(point1.x, point1.y, point2.x, point2.y);
}

callWithPoints(line, p1, p2);

let maxIters = 1;

var HEIGHT = 900;

var WIDTH = HEIGHT / 2;
var ROOF_HIEGHT = WIDTH / 2
console.log(WIDTH);
var HEIGHT_RECT = 1.5 * WIDTH;

var PEAK_Y = (CANVAS_HEIGHT - HEIGHT) / 2;
var LEFT_X = (CANVAS_WIDTH - WIDTH) / 2;

let MIDDLE_X = CANVAS_WIDTH / 2;
let RIGHT_X = LEFT_X + WIDTH;

let TOP_Y = PEAK_Y + ROOF_HIEGHT;
let BOTTOM_Y = PEAK_Y + HEIGHT;

var peak = new Point(MIDDLE_X, PEAK_Y);
var upperLeft = new Point(LEFT_X, TOP_Y);
var upperRight = new Point(RIGHT_X, TOP_Y);
var bottomLeft = new Point(LEFT_X, BOTTOM_Y);
var bottomRight = new Point(RIGHT_X, BOTTOM_Y);

function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(0);
  frameRate(10);
  fill('red')
}

function draw() {
  // put drawing code here
  stroke('white'); // Change the color
  // beginShape(TRIANGLES);
  // vertex(30, 75);
  // vertex(40, 20);
  // vertex(50, 75);

  // vertex(60, 20);
  // vertex(70, 75);
  // vertex(80, 20);
  // endShape();

  // beginShape(TRIANGLE_STRIP);
  // fill('green')
  // vertex(30, 75);
  // vertex(40, 20);
  // vertex(50, 75);
  // fill('orange')
  // vertex(60, 20);
  // fill('blue')
  // vertex(70, 75);
  // vertex(80, 20);
  // vertex(90, 75);
  // endShape();

  beginShape(TESS);
  vertex(20, 20);
  vertex(80, 20);
  vertex(80, 40);
  vertex(40, 40);
  vertex(40, 60);
  vertex(80, 60);
  vertex(80, 80);
  vertex(20, 80);
  endShape(CLOSE);

  // line(200, 300, 200, 800);
  // line(600, 300, 600, 800);
  lineP(upperLeft, bottomLeft);
  lineP(upperRight, bottomRight);
  lineP(upperLeft, upperRight);
  lineP(bottomLeft, bottomRight);

  lineP(upperLeft, peak);
  lineP(peak, upperRight);

  maxIters--;
  if (maxIters === 0) {
    throw new Error('stop!');
  }
}

