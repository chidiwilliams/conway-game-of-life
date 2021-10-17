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

console.log(
  compose(
    '40d-,26d-1l-13d-,24d-1l-1d-1l-13d-,14d-2l-6d-2l-12d-2l-2d-,13d-1l-3d-1l-4d-2l-12d-2l-2d-,2d-2l-8d-1l-5d-1l-3d-2l-16d-,2d-2l-8d-1l-3d-1l-1d-2l-4d-1l-1d-1l-13d-,12d-1l-5d-1l-7d-1l-13d-,13d-1l-3d-1l-22d-,14d-2l-24d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,40d-,',
    decode,

    append(30),
    transpose,
    append(50),
    transpose,

    encode,
  ),
);
