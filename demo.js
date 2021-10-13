const { next } = require('.');

const graphics = (() => {
  let previousGrid;

  function render(canvas, grid, cellWidth) {
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];

        // Only re-draw if cell has changed
        if (!previousGrid || cell !== previousGrid[i][j]) {
          ctx.beginPath();
          ctx.strokeStyle = '#555555';
          ctx.fillStyle = cell ? '#ffffff' : '#000000';
          ctx.lineWidth = 1;
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

const grids = (() => {
  function create(w, h, valFunc = (i, j) => false) {
    const grid = [];
    for (let i = 0; i < h; i++) {
      const r = [];
      for (let j = 0; j < w; j++) {
        r.push(valFunc(i, j));
      }
      grid.push(r);
    }

    return grid;
  }

  function random(w, h, fractionLive = 0.25) {
    const b = 0.8;
    return create(w, h, (i, j) => {
      return (
        // Cover only the middle b% of the grid
        i / h > 1 - b &&
        i / h < b &&
        j / w > 1 - b &&
        j / w < b &&
        Math.random() < fractionLive
      );
    });
  }

  function getPopulation(grid) {
    let c = 0;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j]) {
          c++;
        }
      }
    }

    return c;
  }

  return { random, create, getPopulation };
})();

const game = (() => {
  const generationsCountElement = document.getElementById('generations-count');
  const populationCountElement = document.getElementById('population-count');
  const startButtonElement = document.getElementById('start');
  const clearButtonElement = document.getElementById('clear');
  const randomButtonElement = document.getElementById('random');
  const speedControlElement = document.getElementById('speed');
  const speedValueElement = document.getElementById('speed-value');
  const canvasElement = document.querySelector('canvas');

  let cellWidthInPixels;

  let _grid,
    _isPlaying = false,
    _numGens = 0,
    w,
    h,
    speed;

  function updateGrid(gridFunc) {
    _grid = gridFunc(_grid);
    graphics.render(canvasElement, _grid, cellWidthInPixels);
    populationCountElement.textContent = String(grids.getPopulation(_grid));
  }

  function init() {
    cellWidthInPixels = getCellWidth();
    initSpeed();

    w = Math.ceil(window.innerWidth / cellWidthInPixels);
    h = Math.ceil(window.innerHeight / cellWidthInPixels);

    startButtonElement.addEventListener('click', onClickPlay);
    clearButtonElement.addEventListener('click', onClickClear);
    randomButtonElement.addEventListener('click', onClickRandom);
    speedControlElement.addEventListener('change', onChangeSpeed);

    document.addEventListener('keydown', onKeyDown);

    // Event listeners for dragging
    {
      let isMouseBeingDragged = false;
      let dragValue; // value the cells dragged over should be
      let isPlayingBeforeDrag;

      canvasElement.addEventListener('mousedown', (evt) => {
        isMouseBeingDragged = true;
        isPlayingBeforeDrag = _isPlaying;
        setIsPlaying(false);

        const { col, row } = getRowAndCol(evt);
        dragValue = !_grid[row][col];
        updateGrid((grid) => setCellValue(grid, row, col));
      });

      canvasElement.addEventListener('mousemove', (evt) => {
        if (isMouseBeingDragged) {
          const { col, row } = getRowAndCol(evt);
          updateGrid((grid) => setCellValue(grid, row, col));
        }
      });

      canvasElement.addEventListener('mouseup', (evt) => {
        if (isMouseBeingDragged) {
          const { col, row } = getRowAndCol(evt);
          updateGrid((grid) => setCellValue(grid, row, col));

          isMouseBeingDragged = false;
          isPlayingBeforeDrag && setIsPlaying(true);
        }
      });

      function getRowAndCol(evt) {
        return {
          col: Math.floor(evt.clientX / cellWidthInPixels),
          row: Math.floor(evt.clientY / cellWidthInPixels),
        };
      }

      function setCellValue(grid, row, col) {
        if (grid[row][col] === dragValue) {
          return grid;
        }

        const newGrid = grid.map((row) => [...row]);
        newGrid[row][col] = dragValue;
        return newGrid;
      }
    }

    graphics.resizeCanvasToDisplaySize(canvasElement);

    // Start game
    updateGrid(() => grids.create(w, h));
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

  function getCellWidth() {
    const url = new URL(window.location.href);
    const size = url.searchParams.get('size');
    switch (size) {
      case 'lg':
        return Math.max(
          50,
          Math.max(window.innerHeight / 50, window.innerWidth / 50),
        );
      default:
        return 20;
    }
  }

  function initSpeed() {
    const url = new URL(window.location.href);
    const speed = +url.searchParams.get('speed') || 1;
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
      switch (evt.key) {
        case 'p':
        case 'P':
          onClickPlay();
          break;
        case 'c':
        case 'C':
          onClickClear();
          break;
        case 'r':
        case 'R':
          onClickRandom();
          break;
      }
    }
  }

  function onClickPlay() {
    toggleIsPlaying();
  }

  function onClickClear() {
    setIsPlaying(false);
    resetNumGens();
    updateGrid(() => grids.create(w, h));
  }

  function onClickRandom() {
    resetNumGens();
    updateGrid(() => grids.random(w, h));
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

  return { init };
})();

game.init();
