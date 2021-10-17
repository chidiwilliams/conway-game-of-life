const assert = require('assert');
const {
  encode,
  decode,
  pad,
  trim,
  compose,
  mirror,
  append,
  transpose,
} = require('./demo-grids-helper');

assert.equal(
  encode([
    [true, true, false],
    [false, false, true],
  ]),
  '2l-1d-,2d-1l-,',
);

assert.deepStrictEqual(decode('2l-1d-,2d-1l-,'), [
  [true, true, false],
  [false, false, true],
]);
