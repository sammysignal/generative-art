CANVAS_SIZE = 1000;
LEG_LEGNTH = 100;

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

/** FROM THIS POINT ON ALL COORDINATES ARE CARTESIAN **/

class End {
  constructor(point, from) {
    this.point = point;
    this.from = from;
    this.ends = [];
  }


}

let origin = new Point(0, 0);
let originEnd = new End(origin, 0);
let ends = [originEnd];
let visited = [origin];
let maxIters = 2;

function setup() {
  canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(0);
}

function draw() {
  // put drawing code here
  stroke('purple'); // Change the color
  strokeWeight(10); // Make the points 10 pixels

  for (end of ends) {

    visited.push(end.point);
  }

  maxIters--;

  if (maxIters === 0) {
    throw new Error('stopppppp');
  }

}

