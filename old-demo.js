const d3 = require('d3');
const { next } = require('.');

const width = window.innerWidth;
const height = window.innerHeight;

const cellWidthInPixels = 20;

let grid = makePlainGrid(
  Math.ceil(width / cellWidthInPixels),
  Math.ceil(height / cellWidthInPixels),
  false,
);

const svg = d3
  .select('.game__display')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%');

const cells = svg.selectAll('g').data(grid);
addRows(cells);

// const cells = svg.selectAll('rect').data(flattenGrid(grid));
// newAddRows(cells);

function newRenderGrid() {
  const rows = svg
    .selectAll('rect')
    .data(flattenGrid(grid), (d) => `${d.row}${d.col}${d.v}`);
  rows.exit().remove();
  newAddRows(rows);
}

function newAddRows(rows) {
  rows
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .classed('live', (d) => d.v)
    .attr(
      'transform',
      (d) =>
        `translate(${d.col * cellWidthInPixels} ${d.row * cellWidthInPixels})`,
    )
    .attr('width', cellWidthInPixels)
    .attr('height', cellWidthInPixels)
    .attr('data-row-index', (d) => d.row)
    .attr('data-column-index', (d) => d.col)
    .on('click', (evt, d) => {
      const colIndex = +evt.target.getAttribute('data-column-index');
      const rowIndex = +evt.target.getAttribute('data-row-index');
      grid = grid.map((row) => [...row]);
      grid[rowIndex][colIndex] = !d.v;
      newRenderGrid();
    });
}

function flattenGrid(grid) {
  const flat = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      flat.push({ v: grid[i][j], row: i, col: j });
    }
  }
  return flat;
}

function addRows(rows) {
  rows
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0 ${i * cellWidthInPixels})`)
    .attr('data-row-index', (d, i) => i)
    .selectAll('.cell')
    .data((d) => d)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('transform', (d, i) => `translate(${i * cellWidthInPixels} 0)`)
    .classed('live', (d) => d)
    .attr('data-column-index', (d, i) => i)
    .attr('width', cellWidthInPixels)
    .attr('height', cellWidthInPixels)
    .on('click', (evt, d) => {
      const colIndex = +evt.target.getAttribute('data-column-index');
      const rowIndex = +evt.target.parentElement.getAttribute('data-row-index');

      grid = grid.map((row) => [...row]);
      grid[rowIndex][colIndex] = !d;
      renderGrid();
    });
}

function renderGrid() {
  const rows = svg.selectAll('g').data(grid, (d, i) => i + d.join(''));
  rows.exit().remove();
  addRows(rows);
}

function makePlainGrid(w, h, v) {
  const grid = [];
  for (let i = 0; i < h; i++) {
    const r = [];
    for (let j = 0; j < w; j++) {
      r.push(v);
    }
    grid.push(r);
  }
  return grid;
}

const generationsCountElement = document.getElementById('generations-count');
const startButtonElement = document.getElementById('start');
const clearButtonElement = document.getElementById('clear');
const randomButtonElement = document.getElementById('random');

let isPlaying = false;
let gen = 0;
rafInterval(() => {
  if (isPlaying) {
    setGen(gen + 1);
    grid = next(grid);
    renderGrid();
  }
}, 200);

function rafInterval(callback, interval) {
  let last;
  function run(timestamp) {
    if (last === undefined) last = timestamp;
    const elapsed = timestamp - last;
    if (elapsed - interval) {
      // console.log(1000 / elapsed);
      last = timestamp;
      callback();
    }
    window.requestAnimationFrame(run);
  }
  window.requestAnimationFrame(run);
}

startButtonElement.addEventListener('click', () => {
  setIsPlaying(!isPlaying);
});

clearButtonElement.addEventListener('click', () => {
  setIsPlaying(false);
  setGen(0);
  grid = makePlainGrid(
    Math.ceil(width / cellWidthInPixels),
    Math.ceil(height / cellWidthInPixels),
    false,
  );
  renderGrid();
});

randomButtonElement.addEventListener('click', () => {
  const fractionLive = 0.3;

  grid = grid.map((row) => [...row]);
  grid.forEach((row) => {
    row.forEach((c, i) => {
      row[i] = Math.random() < fractionLive;
    });
  });

  renderGrid();
});

function setIsPlaying(newIsPlaying) {
  isPlaying = newIsPlaying;
  startButtonElement.textContent = newIsPlaying ? 'Pause' : 'Start';
}

function setGen(newGen) {
  gen = newGen;
  generationsCountElement.textContent = String(newGen);
}
