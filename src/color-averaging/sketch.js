const CANVAS_SIZE = 500;
const SQUARE_SIZE = 10;
const N = CANVAS_SIZE / SQUARE_SIZE;


let colors = Array(N).fill().map(()=>Array(N).fill([0, 0, 0]));
let futureColors;

/**
 * Averages arbitrarily many RGB vectors.
 * @param {Array} vectors
 */
function averageVectors(vectors) {
  let sumR = 0, sumG = 0, sumB = 0;
  let size = vectors.length;
  for (vector of vectors) {
    sumR += vector[0];
    sumG += vector[1];
    sumB += vector[2];
  }

  return [sumR/size, sumG/size, sumB/size]
}

/**
 * Weighted average of start and end vector, rate being the amount to step.
 * @param {*} start
 * @param {*} vectors
 * @param {*} rate
 */
function stepTowards(start, end, rate) {
  // debugger;
  let newR = start[0] + ((end[0] - start[0]) * rate)
  let newG = start[1] + ((end[1] - start[1]) * rate)
  let newB = start[2] + ((end[2] - start[2]) * rate)
  return [newR, newG, newB];
}

console.log(averageVectors([[0.9,0.1,0.1], [2.0,2.0,2.0]]));

function setup() {
  canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(0);
  noStroke();
  // frameRate(1);

  let i = 0, j = 0;
  for (i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
      let r,g,b;
      if (i === 0 || j === 0 || i === N-1 || j === N-1) {
        r = i*255/N, g = j*255/N, b = 127;
      } else {
        r = random(255);
        g = random(255);
        b = random(255);
      }

      fill(r, g, b);

      colors[i][j] = [r,g,b];
      rect(i*SQUARE_SIZE, j*SQUARE_SIZE, SQUARE_SIZE);
    }
  }

  futureColors = JSON.parse(JSON.stringify(colors));
}

var iters = 0;
function draw() {
  let i = 0, j = 0;
  for (i = 1; i < N-1; i++) {
    for (j = 1; j < N-1; j++) {

      // figure out what the next color will be
      let up = colors[i][j-1];
      let down = colors[i+1][j];
      let left = colors[i][j+1];
      let right = colors[i-1][j];

      let adjacents = [up,down,left,right]

      let r = random();
      if (r < 0.001) {
        futureColors[i+1][j+1] = [0,0,0];
        fill(...futureColors[i+1][j+1]);
        rect((i+1)*SQUARE_SIZE, (j+1)*SQUARE_SIZE, SQUARE_SIZE);
        futureColors[i][j] = [0,0,0];
      // } else if (r > 0.999){
      //   futureColors[i][j] = [0,255,255];
      } else {
        futureColors[i][j] = stepTowards(colors[i][j], averageVectors(adjacents), 0.5);
      }


      // Draw the new color
      fill(...futureColors[i][j]);
      rect(i*SQUARE_SIZE, j*SQUARE_SIZE, SQUARE_SIZE);
    }
  }

  // Overwrite the old colors
  colors = JSON.parse(JSON.stringify(futureColors))


  iters++;
  if (iters > 1000) {
    console.log(colors);
    throw new Error('Stop!');
  }
  if (iters % 500 === 0) {
    console.log(iters);
  }
}

