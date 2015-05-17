var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var RangesFilter = require('../../src/filters/RangesFilter');

describe('RangesFilter', function() {
  var display = I({
    products: [{ age: 1.3 }, { age: 2.5 }, { age: 0.3 }, { age: 5.8 }, { age: 2.2 }]
  });

  it('filters single range', function() {
    var filter = RangesFilter('age', [[1, 3]]);
    var expected = I({ products: [{ age: 1.3 }, { age: 2.5 }, { age: 2.2 }] });
    assert.deepEqual(filter(display), expected);
  });

  it('filters multiple ranges', function() {
    var filter = RangesFilter('age', [[0, 1], [2, 6]]);

    var expected = I({
      products: [{ age: 2.5 }, { age: 0.3 }, { age: 5.8 }, { age: 2.2 }]
    });

    assert.deepEqual(filter(display), expected);
  });

  it('filters inclusively', function() {
    var filter = RangesFilter('age', [[2.2, 2.5]]);
    var expected = I({ products: [{ age: 2.5 }, { age: 2.2 }] });
    assert.deepEqual(filter(display), expected);
  });
});
