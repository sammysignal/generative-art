/**
 * Simple assert
 * @param {Boolean} clause
 * @returns
 */
function assert(clause) {
  if (clause) {
    return 0;
  }

  throw new Error("Assertion error: " + String(clause));
}

function deepCopy(o) {
  return JSON.parse(JSON.stringify(o))
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return String(this.x) + "," + String(this.y);
  }
}

/**
 * Accepts n points as arguments and uses them to call any p5js function which accepts x, y pairs.
 * Therefore:
 *   line(p1.x, p1y, p2.x, p2.y)
 *     is the same as:
 *   withP(line, p1, p2)
 * @param {*} f - p5js function to call,
 * @param  {...any} args
 */
function withP(f, ...args) {
  function fCopy(...argsOfF) {
    return f(...argsOfF);
  }

  let l = args.length;

  assert(l % 2 === 0);
  let finalFunc = fCopy;
  for (i = 0; i < l; i++) {
    let point = args[i];
    finalFunc = finalFunc.bind(this, point.x, point.y);//.bind(point.y)
  }

  finalFunc.call();
}


/** CARTESIAN COORDINATES **/

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

// Draw a line between two cartesian coordinates
function lineC(point1, point2) {
  line(...toPFiveCords([point1.x, point1.y]), ...toPFiveCords([point2.x, point2.y]));
}
