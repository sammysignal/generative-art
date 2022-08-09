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
