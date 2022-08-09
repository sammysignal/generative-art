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

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
