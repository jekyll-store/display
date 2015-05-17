var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var PageFilter = require('../../src/filters/PageFilter');

describe('PageFilter', function() {
  var display = I({ products: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] });
  var expected;

  it('filters full page', function() {
    expected = I({
      products: [{ id: 1 }, { id: 2 }, { id: 3 }],
      page: { current: 1, numbers: [1, 2], prev: null, next: 2 }
    });

    assert.deepEqual(PageFilter(3, 1)(display), expected);
  });

  it('defaults to first pageNum if out of range', function() {
    assert.deepEqual(PageFilter(3, 5)(display), expected);
  });

  it('filters partial page', function() {
    expected = I({
      products: [{ id: 4 }],
      page: { current: 2, numbers: [1, 2], prev: 1, next: null }
    });

    assert.deepEqual(PageFilter(3, 2)(display), expected);
  });
});
