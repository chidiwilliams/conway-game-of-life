const assert = require('assert');
const { next } = require('.');

assert.deepStrictEqual(
  next([
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ]),
  [
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ],
);

assert.deepStrictEqual(
  next([
    [true, false, false],
    [true, true, true],
    [false, false, false],
  ]),
  [
    [true, false, false],
    [true, true, false],
    [false, true, false],
  ],
);
