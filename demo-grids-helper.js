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

const rowSeparator = ',';
const columnSeparator = '-';

function encode(grid) {
  let s = '';
  for (let i = 0; i < grid.length; i++) {
    let r = '';

    let curr;
    let currCount = 0;
    for (let j = 0; j < grid[i].length; j++) {
      const c = grid[i][j];
      if (curr !== c) {
        if (curr !== undefined) {
          r += currCount + (curr ? 'l' : 'd') + columnSeparator;
        }
        curr = c;
        currCount = 0;
      }

      currCount++;

      if (j === grid[i].length - 1) {
        r += currCount++ + (curr ? 'l' : 'd') + columnSeparator;
      }
    }

    s += r + rowSeparator;
  }
  return s;
}

function decode(str) {
  const grid = [];

  str.split(rowSeparator).forEach((row) => {
    if (row) {
      const cells = [];
      row.split(columnSeparator).forEach((cell) => {
        if (cell) {
          const [, count, type] = cell.split(/([0-9]+)/);
          for (let i = 0; i < count; i++) {
            cells.push(type === 'l' ? true : false);
          }
        }
      });
      grid.push(cells);
    }
  });

  return grid;
}

function trim(grid) {
  return compose(
    grid,

    trimTop,
    mirror,
    trimTop,
    mirror,

    transpose,

    trimTop,
    mirror,
    trimTop,
    mirror,

    transpose,
  );
}

function trimTop(grid) {
  let p = -2;

  for (let i = 0; i < grid.length; i++) {
    if (!empty(grid[i])) {
      break;
    }
    p++;
  }

  return grid.filter((_, i) => i >= p);
}

function dim(str) {
  const grid = decode(str);
  return { rows: grid.length, cols: grid[0].length };
}

function pad(grid, w, h) {
  return compose(
    grid,

    append(h / 2),
    mirror,
    append(h / 2),
    mirror,

    transpose,
    append(w / 2),
    mirror,
    append(w / 2),
    mirror,
    transpose,
  );
}

function append(l) {
  return (grid) => {
    for (let i = 0; i < l; i++) {
      grid = [...grid, Array.from({ length: grid[0].length }, () => false)];
    }
    return grid;
  };
}

function compose(v, ...p) {
  p.forEach((f) => {
    v = f(v);
  });
  return v;
}

function empty(cells) {
  return !cells.some((cell) => cell);
}

function transpose(grid) {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}

function mirror(grid) {
  return grid.map((_, i) => grid[grid.length - 1 - i]);
}

function slice(grid, n) {
  return grid.filter((_, i) => i < n);
}

function sliceBounds(grid, w, h) {
  return compose(
    grid,
    (grid) => slice(grid, h),
    transpose,
    (grid) => slice(grid, w),
    transpose,
  );
}

module.exports = {
  random,
  create,
  getPopulation,
  encode,
  decode,
  dim,
  pad,
  trim,
  sliceBounds,
  compose,
  mirror,
  append,
  transpose,
};
