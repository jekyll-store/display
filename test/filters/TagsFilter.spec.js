var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var TagsFilter = require('../../src/filters/TagsFilter');

describe('TagsFilter', function() {
  var display = I({
    products: [
      { id: 1, colour: 'red' },
      { id: 2, colour: 'blue' },
      { id: 3, colour: 'green' },
      { id: 4, colour: 'red' }
    ]
  });

  it('filters single tag', function() {
    var expected = I({ products: [{ id: 1, colour: 'red' }, { id: 4, colour: 'red' }] });
    assert.deepEqual(TagsFilter('colour', ['red'])(display), expected);
  });

  it('filters multiple tags', function() {
    var expected = I({
      products: [
        { id: 1, colour: 'red' },
        { id: 2, colour: 'blue' },
        { id: 4, colour: 'red' }
      ]
    });

    assert.deepEqual(TagsFilter('colour', ['red', 'blue'])(display), expected);
  });
});
