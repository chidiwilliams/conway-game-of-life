const { next } = require('./life');
const {
  random,
  create,
  getPopulation,
  decode,
  pad,
} = require('./demo-grids-helper');

const graphics = (() => {
  let previousGrid;
  const strokeColor = '#bbbbbb';
  const strokeWidth = 1;
  const liveColor = '#000000';
  const deadColor = '#ffffff';

  function render(canvas, grid, cellWidth) {
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];

        // Only re-draw if cell has changed
        if (!previousGrid || cell !== previousGrid[i][j]) {
          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.fillStyle = cell ? liveColor : deadColor;
          ctx.lineWidth = strokeWidth;
          ctx.rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
          ctx.fill();
          ctx.stroke();
        }
      }
    }

    previousGrid = grid;
  }

  function resizeCanvasToDisplaySize(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }

    return false;
  }

  function requestAnimationFrame(cb, getInterval) {
    let last;
    function run(timestamp) {
      if (last === undefined) last = timestamp;
      const elapsed = timestamp - last;
      if (elapsed > getInterval()) {
        last = timestamp;
        cb();
      }
      window.requestAnimationFrame(run);
    }
    window.requestAnimationFrame(run);
  }

  return { render, resizeCanvasToDisplaySize, requestAnimationFrame };
})();

const game = (() => {
  const generationsCountElement = document.getElementById('generations-count');
  const populationCountElement = document.getElementById('population-count');
  const startButtonElement = document.getElementById('start');
  const clearButtonElement = document.getElementById('clear');
  const resetButtonElement = document.getElementById('reset');
  const randomButtonElement = document.getElementById('random');
  const speedControlElement = document.getElementById('speed');
  const speedValueElement = document.getElementById('speed-value');
  const canvasElement = document.querySelector('canvas');

  const defaultGensPerSecond = 20;
  const hotkeys = {
    P: onClickPlay,
    C: onClickClear,
    R: onClickRandom,
    O: onClickReset,
  };

  let cellWidthInPixels,
    _grid,
    _initialGrid,
    _isPlaying = false,
    _numGens = 0,
    w,
    h,
    speed,
    isMouseBeingDragged = false,
    dragValue, // value the cells dragged over should be
    isPlayingBeforeDrag;

  function updateGrid(gridFunc) {
    const newGrid = gridFunc(_grid);
    if (newGrid === undefined) {
      return;
    }

    _grid = newGrid;
    graphics.render(canvasElement, _grid, cellWidthInPixels);
    populationCountElement.textContent = String(getPopulation(_grid));
  }

  function init() {
    startButtonElement.addEventListener('click', onClickPlay);
    clearButtonElement.addEventListener('click', onClickClear);
    resetButtonElement.addEventListener('click', onClickReset);
    randomButtonElement.addEventListener('click', onClickRandom);
    speedControlElement.addEventListener('change', onChangeSpeed);

    document.addEventListener('keydown', onKeyDown);

    canvasElement.addEventListener('mousedown', onMousedownCanvas);
    canvasElement.addEventListener('mousemove', onMousemoveCanvas);
    canvasElement.addEventListener('mouseup', onMouseupCanvas);
    canvasElement.addEventListener('touchstart', onTouchstartCanvas);
    canvasElement.addEventListener('touchmove', onTouchmoveCanvas);
    canvasElement.addEventListener('touchend', onTouchendCanvas);

    graphics.resizeCanvasToDisplaySize(canvasElement);

    // Start game

    initSpeed();
    initButtons();

    const { grid: initialGrid, cellWidthInPixels: cellWidth } =
      getInitialGrid();
    cellWidthInPixels = cellWidth;
    _initialGrid = initialGrid;
    h = initialGrid.length;
    w = initialGrid[0].length;
    updateGrid(() => initialGrid);
    graphics.requestAnimationFrame(
      () => {
        if (_isPlaying) {
          incrNumGens();
          updateGrid((grid) => next(grid));
        }
      },
      () => speed * 1000,
    );
  }

  function getInitialGrid() {
    const url = new URL(window.location.href);
    const init = url.searchParams.get('init');
    if (init) {
      const decodedGrid = decode(init);
      const decodedH = decodedGrid.length;
      const decodedW = decodedGrid[0] ? decodedGrid[0].length : 0;
      const cellWidthInPixels = getCellWidth(true, decodedW, decodedH);

      const padW = Math.ceil(
        (window.innerWidth - cellWidthInPixels * decodedW) / cellWidthInPixels,
      );
      const padH = Math.ceil(
        (window.innerHeight - cellWidthInPixels * decodedH) / cellWidthInPixels,
      );

      return { grid: pad(decodedGrid, padW, padH), cellWidthInPixels };
    } else {
      const cellWidthInPixels = getCellWidth(false);
      return {
        grid: create(
          Math.ceil(window.innerWidth / cellWidthInPixels),
          Math.ceil(window.innerHeight / cellWidthInPixels),
        ),
        cellWidthInPixels,
      };
    }
  }

  function initButtons() {
    const url = new URL(window.location.href);
    if (url.searchParams.get('random') === 'false') {
      randomButtonElement.style.display = 'none';
    }
    if (url.searchParams.get('clear') === 'false') {
      clearButtonElement.style.display = 'none';
    }
    if (url.searchParams.get('reset') === 'true') {
      resetButtonElement.style.display = 'block';
    }
  }

  function getCellWidth(gridSetFromUrl, w, h) {
    if (gridSetFromUrl) {
      return Math.ceil(
        Math.min(window.innerHeight / +h, window.innerWidth / +w),
      );
    }

    const url = new URL(window.location.href);
    const size = url.searchParams.get('size');
    if (size === 'lg') {
      return Math.max(
        50,
        Math.max(window.innerHeight / 50, window.innerWidth / 50),
      );
    }
    return 20;
  }

  function initSpeed() {
    const url = new URL(window.location.href);
    const speed = +url.searchParams.get('speed') || defaultGensPerSecond;
    updateSpeed(speed);
  }

  function onChangeSpeed(evt) {
    const gensPerSec = Math.pow(evt.target.value, 2); // from 0.1->7.07 to 0.01->50
    updateSpeed(gensPerSec);
  }

  function updateSpeed(gensPerSec) {
    speed = 1 / gensPerSec;
    speedValueElement.textContent = gensPerSec.toFixed(2);
    speedControlElement.value = Math.pow(gensPerSec, 0.5);
  }

  function onKeyDown(evt) {
    if (!evt.ctrlKey && !evt.metaKey) {
      const func = hotkeys[evt.key.toUpperCase()];
      func && func();
    }
  }

  function onClickPlay() {
    toggleIsPlaying();
  }

  function onClickReset() {
    resetNumGens();
    updateGrid(() => _initialGrid);
  }

  function onClickClear() {
    setIsPlaying(false);
    resetNumGens();
    updateGrid(() => create(w, h));
  }

  function onClickRandom() {
    resetNumGens();
    updateGrid(() => random(w, h));
  }

  function incrNumGens() {
    generationsCountElement.textContent = String(_numGens++);
  }

  function resetNumGens() {
    _numGens = 0;
    generationsCountElement.textContent = '0';
  }

  function toggleIsPlaying() {
    setIsPlaying(!_isPlaying);
  }

  function setIsPlaying(isPlaying) {
    _isPlaying = isPlaying;
    startButtonElement.textContent = _isPlaying ? 'Pause (P)' : 'Play (P)';
  }

  function onMousedownCanvas(evt) {
    evt.preventDefault();

    // only left-click
    if (evt.buttons === 1) {
      mousedownOrTouchstartCanvas(evt);
    }
  }

  function onTouchstartCanvas(evt) {
    evt.preventDefault();
    mousedownOrTouchstartCanvas(evt.touches[0]);
  }

  function mousedownOrTouchstartCanvas(evt) {
    isMouseBeingDragged = true;
    isPlayingBeforeDrag = _isPlaying;
    setIsPlaying(false);

    const { col, row } = getRowAndCol(evt);
    dragValue = !_grid[row][col];
    updateGrid((grid) => setCellValue(grid, row, col));
  }

  function onMousemoveCanvas(evt) {
    evt.preventDefault();
    mousemoveOrTouchmoveCanvas(evt);
  }

  function onTouchmoveCanvas(evt) {
    evt.preventDefault();
    mousemoveOrTouchmoveCanvas(evt.touches[0]);
  }

  function mousemoveOrTouchmoveCanvas(evt) {
    if (isMouseBeingDragged) {
      const { col, row } = getRowAndCol(evt);
      updateGrid((grid) => setCellValue(grid, row, col));
    }
  }

  function onMouseupCanvas(evt) {
    evt.preventDefault();
    if (isMouseBeingDragged) {
      const { col, row } = getRowAndCol(evt);
      updateGrid((grid) => setCellValue(grid, row, col));

      isMouseBeingDragged = false;
      isPlayingBeforeDrag && setIsPlaying(true);
    }
  }

  function onTouchendCanvas(evt) {
    evt.preventDefault();
    isMouseBeingDragged && isPlayingBeforeDrag && setIsPlaying(true);
  }

  function getRowAndCol(evt) {
    return {
      col: Math.floor(evt.clientX / cellWidthInPixels),
      row: Math.floor(evt.clientY / cellWidthInPixels),
    };
  }

  function setCellValue(grid, row, col) {
    if (grid[row][col] === dragValue) {
      return undefined;
    }

    const newGrid = grid.map((row) => [...row]);
    newGrid[row][col] = dragValue;
    return newGrid;
  }

  return { init };
})();

game.init();
