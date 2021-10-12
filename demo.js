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
      updateGrid();
    });
}

function updateGrid() {
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

let isPlaying = false;
let gen = 0;
rafInterval(() => {
  if (isPlaying) {
    generationsCountElement.textContent = String(gen++);
    grid = next(grid);
    updateGrid();
  }
}, 200);

function rafInterval(callback, interval) {
  let last;
  function run(timestamp) {
    if (last === undefined) last = timestamp;
    const elapsed = timestamp - last;
    if (elapsed - interval) {
      last = timestamp;
      callback();
    }
    window.requestAnimationFrame(run);
  }
  window.requestAnimationFrame(run);
}

startButtonElement.addEventListener('click', () => {
  isPlaying = !isPlaying;
  startButtonElement.textContent = isPlaying ? 'Pause' : 'Start';
});
