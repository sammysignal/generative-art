CANVAS_WIDTH = 1000;
CANVAS_HEIGHT = 1000;


// window.$fxhashFeatures = {
//   Seats: getFeatureStringSeats(fxrand()),
//   Wobble: getFeatureStringWobble(fxrand()),
//   Eyes: getFeatureStringEyes(fxrand()),
//   Blobs: getFeatureStringBlobs(fxrand()),
//   Background: getFeatureStringBackground(fxrand()),
//   Outlined: getFeatureStringOutline(fxrand()),
//   RIP: getFeatureStringRIP(fxrand()),
//   Wave: getFeatureStringWave(fxrand()),
//   "All Dead": getFeatureStringAllDead(fxrand()),
//   Offset: getFeatureStringOffset(fxrand()),
//   Love: getFeatureStringLove(fxrand()),
// };

var M_X = 1;
var M_Y = 1;
var B_X = 0;
var B_Y = 0;

// /**
//  * Linear transformation of a given x, y pair
//  * @param {*} x
//  * @param {*} y
//  * @param {*} m_x
//  * @param {*} m_y
//  * @param {*} b_x
//  * @param {*} b_y
//  * @returns new [x, y] pair
//  */
// function linearTranformCoords(x, y, m_x, m_y, b_x, b_y) {
//   return [m_x * x + b_x, m_y * y + b_y]
// }

/**
 * Point for which to alter by adding a linear transformation
 * to both the x and y values using the global variables defined above.
 * @param {*} p
 */
function lt(p_x, p_y) {
  return new Point(M_X * p_x + B_X, M_Y * p_y + B_Y);

}

// /**
//  * Draw a rectangle from three points
//  */
// function drawRect(topLeft, topRight, bottomRight) {
//   rect(topLeft.x, topLeft.y, (topRight.x - topLeft.x), (bottomRight.y - topRight.y));
// }

function drawRectangle(rectangle) {
  rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}

/**
 * Create a rectangle from three points
 * @param {*} topLeft
 * @param {*} topRight
 * @param {*} bottomRight
 * @returns
 */
function getRect(topLeft, topRight, bottomRight) {
  return new Rectangle(topLeft.x, topLeft.y, (topRight.x - topLeft.x), (bottomRight.y - topRight.y));
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

var peak = lt(MIDDLE_X, PEAK_Y);
var upperLeft = lt(LEFT_X, TOP_Y);
var upperRight = lt(RIGHT_X, TOP_Y);
var middleLeft = lt(LEFT_X, MIDDLE_Y);
var middleRight = lt(RIGHT_X, MIDDLE_Y);
var bottomLeft = lt(LEFT_X, BOTTOM_Y);
var bottomRight = lt(RIGHT_X, BOTTOM_Y);
console.log('peak, upperLeft, upperRight, middleLeft, middleRight, bottomLeft, bottomRight');
console.log([peak, upperLeft, upperRight, middleLeft, middleRight, bottomLeft, bottomRight]);

// Spire Coordinates
var leftSpireBottomRight = lt(LEFT_SPIRE_X, BOTTOM_Y);
var leftSpireUpperRight = lt(LEFT_SPIRE_X, SPIRE_Y);
var leftSpireUpperLeft = lt(LEFT_X, SPIRE_Y);
console.log('leftSpireBottomRight, leftSpireUpperRight, leftSpireUpperLeft');
console.log([leftSpireBottomRight, leftSpireUpperRight, leftSpireUpperLeft]);


var rightSpireBottomLeft = lt(RIGHT_SPIRE_X, BOTTOM_Y);
var rightSpireUpperLeft = lt(RIGHT_SPIRE_X, SPIRE_Y);
var rightSpireUpperRight = lt(RIGHT_X, SPIRE_Y);
console.log('rightSpireBottomLeft, rightSpireUpperLeft, rightSpireUpperRight');
console.log([rightSpireBottomLeft, rightSpireUpperLeft, rightSpireUpperRight]);

// The rest of these points are in straight up coords

//
// var innerPeak = lt(472, 127);
// var roofInnerLeft = lt(290, 309);
// var roofInnerRight = lt(650, 309);
var innerPeak = lt(500, 93);
var roofInnerLeft = lt(318, 275);
var roofInnerRight = lt(680, 275);


var img;
function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(0);
  img = loadImage('img/pl/714-Steiner-cropped.jpeg');

  frameRate(10);
  fill('gray')
}

function draw() {
  // put drawing code here
  stroke('white'); // Change the color

  /** Basic Outline **/
  // lineP(upperLeft, bottomLeft);
  // lineP(upperRight, bottomRight);
  // lineP(upperLeft, upperRight);
  // lineP(bottomLeft, bottomRight);

  // lineP(middleLeft, middleRight);
  var topRectangle = getRect(upperLeft, upperRight, middleRight);
  var bottomRectangle = getRect(middleLeft, middleRight, bottomRight);
  drawRectangle(topRectangle);
  drawRectangle(bottomRectangle);

  // Roof triangle
  withP(triangle, peak, upperLeft, upperRight);


  // Roof inner triangle
  withP(triangle, innerPeak, roofInnerLeft, roofInnerRight);

  // Spires
  withP(quad, leftSpireUpperLeft, leftSpireUpperRight, leftSpireBottomRight, bottomLeft);
  withP(quad, rightSpireUpperRight, rightSpireUpperLeft, rightSpireBottomLeft, bottomRight);

  // put image overlay
  // tint(255, 190);
  // // let ar = 1200.0 / 795.0;
  // let m = 1.2
  // image(img, LEFT_X - 5, 0, Math.floor(421*m), Math.floor(794*m));

  maxIters--;
  if (maxIters === 0) {
    throw new Error('stop!');
  }
}

