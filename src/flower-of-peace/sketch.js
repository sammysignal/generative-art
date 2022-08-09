CANVAS_SIZE = 1000;
LEG_LEGNTH = 10;

/**
 * Convert to P5 coordinates from centered coords.
 * [0, 0]     => [S/2, S/2]
 * [100, 100] => [(S/2) + 100, (S/2) - 100]
 * @param {*} x - X coord
 * @param {*} y - Y cord
 */
function toPFiveCords(xy) {
  assert(xy.length === 2);
  centerXY = CANVAS_SIZE / 2;
  return [centerXY + xy[0], centerXY - xy[1]];
}

/**
 * Draw a point using Cartesian Coordinate system
 * @param {Point} point - point
 */
function pointC(point) {
  point(...toPFiveCords([point.x, point.y]));
}

function lineC(point1, point2) {
  line(...toPFiveCords([point1.x, point1.y]), ...toPFiveCords([point2.x, point2.y]));
}

/** FROM THIS POINT ON ALL COORDINATES ARE CARTESIAN **/

class End {
  constructor(point, dirX, dirY) {
    this.point = point;
    this.dirX = dirX;
    this.dirY = dirY;
  }
}

/**
 * 0, 1 => -1, 0
 * -1,0 => 0, -1
 * 0,-1 => 1, 0
 * 1, 0 => 0, 1
 * @param {*} dirX
 * @param {*} dirY
 */
function getNewDirectionL(dirX, dirY) {
  if (dirX === 0) {
    return [-dirY, 0];
  } else {
    return [0, dirX]
  }
}

/**
 * 0, 1 => 1, 0
 * 1,0 => 0, -1
 * 0,-1 => -1, 0
 * -1, 0 => 0, 1
 * @param {*} dirX
 * @param {*} dirY
 */
function getNewDirectionR(dirX, dirY) {
  if (dirX === 0) {
    return [dirY, 0];
  } else {
    return [0, -dirX]
  }
}

let origin = new Point(0, 0);
let originEnd = new End(origin, 0, 1);
let ends = [originEnd];
let newEnds = [];
let drawnFromHere = new Set();
let maxIters = 100;

function setup() {
  canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(0);
  frameRate(10);
}

function draw() {
  // put drawing code here
  stroke('purple'); // Change the color
  strokeWeight(Math.max(1, maxIters/8)); // Make the points 10 pixels

  newEnds = [];
  for (end of ends) {
    if (drawnFromHere.has(end.point.toString())) {
      continue;
    }

    // Draw line left
    let newDirectionL = getNewDirectionL(end.dirX, end.dirY);
    let destL = new Point(newDirectionL[0] * LEG_LEGNTH + end.point.x, newDirectionL[1] * LEG_LEGNTH + end.point.y);
    lineC(end.point, destL);
    newEnds.push(new End(destL, ...newDirectionL));

    // Draw line right
    let newDirectionR = getNewDirectionR(end.dirX, end.dirY);
    let destR = new Point(newDirectionR[0] * LEG_LEGNTH + end.point.x, newDirectionR[1] * LEG_LEGNTH + end.point.y);
    lineC(end.point, destR);
    newEnds.push(new End(destR, ...newDirectionR));

    drawnFromHere.add(end.point.toString());
  }

  ends = newEnds;


  maxIters--;
  if (maxIters === 0) {
    throw new Error('stop!');
  }
}

