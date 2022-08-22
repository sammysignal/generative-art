CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 1000;

// Draw a line between two point locations
function lineP(point1, point2) {
  line(point1.x, point1.y, point2.x, point2.y);
}

let maxIters = 1;

var HEIGHT = 900;

var WIDTH = HEIGHT / 2;
var ROOF_HIEGHT = WIDTH / 2
var HEIGHT_RECT = 1.5 * WIDTH;
var SPIRE_WIDTH = WIDTH * 0.0225;
var SPIRE_HEIGHT = HEIGHT_RECT * 1.06;

var LEFT_X = (CANVAS_WIDTH - WIDTH) / 2;
var MIDDLE_X = CANVAS_WIDTH / 2;
var RIGHT_X = LEFT_X + WIDTH;

var LEFT_SPIRE_X = LEFT_X + SPIRE_WIDTH;
var RIGHT_SPIRE_X = RIGHT_X - SPIRE_WIDTH;

var PEAK_Y = (CANVAS_HEIGHT - HEIGHT) / 2;
var TOP_Y = PEAK_Y + ROOF_HIEGHT;
var BOTTOM_Y = PEAK_Y + HEIGHT;
var MIDDLE_Y = TOP_Y + (WIDTH / 2);
var SPIRE_Y = BOTTOM_Y - SPIRE_HEIGHT;

var peak = new Point(MIDDLE_X, PEAK_Y);
var upperLeft = new Point(LEFT_X, TOP_Y);
var upperRight = new Point(RIGHT_X, TOP_Y);
var middleLeft = new Point(LEFT_X, MIDDLE_Y);
var middleRight = new Point(RIGHT_X, MIDDLE_Y);
var bottomLeft = new Point(LEFT_X, BOTTOM_Y);
var bottomRight = new Point(RIGHT_X, BOTTOM_Y);

// Spire Coordinates
var leftSpireBottomRight = new Point(LEFT_SPIRE_X, BOTTOM_Y);
var leftSpireUpperRight = new Point(LEFT_SPIRE_X, SPIRE_Y);
var leftSpireUpperLeft = new Point(LEFT_X, SPIRE_Y);

var rightSpireBottomLeft = new Point(RIGHT_SPIRE_X, BOTTOM_Y);
var rightSpireUpperLeft = new Point(RIGHT_SPIRE_X, SPIRE_Y);
var rightSpireUpperRight = new Point(RIGHT_X, SPIRE_Y);

function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(0);
  frameRate(10);
  fill('red')
}

function draw() {
  // put drawing code here
  stroke('white'); // Change the color
  lineP(upperLeft, bottomLeft);
  lineP(upperRight, bottomRight);
  lineP(upperLeft, upperRight);
  lineP(bottomLeft, bottomRight);

  lineP(middleLeft, middleRight);

  lineP(upperLeft, peak);
  lineP(peak, upperRight);

  withP(quad, leftSpireUpperLeft, leftSpireUpperRight, leftSpireBottomRight, bottomLeft);
  withP(quad, rightSpireUpperRight, rightSpireUpperLeft, rightSpireBottomLeft, bottomRight);


  maxIters--;
  if (maxIters === 0) {
    throw new Error('stop!');
  }
}

