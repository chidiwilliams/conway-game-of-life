const assert = require('assert');
const { next } = require('.');

assert.deepStrictEqual(
  next([
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ]),
  [
    [ false, true, false ],
    [ false, true, false ],
    [ false, true, false ]
  ]
);
