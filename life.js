function next(grid) {
  const nextGrid = new Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    nextGrid[i] = new Array(grid[i].length);
  }

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      let c = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (
            !(dx === 0 && dy === 0) &&
            typeof grid[x + dx] !== 'undefined' &&
            typeof grid[x + dx][y + dy] !== 'undefined' &&
            grid[x + dx][y + dy]
          ) {
            c++;
          }
        }
      }

      nextGrid[x][y] = grid[x][y] ? c === 2 || c === 3 : c === 3;
    }
  }

  return nextGrid;
}

module.exports = { next };
