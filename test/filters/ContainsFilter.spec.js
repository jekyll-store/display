var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');

var ContainsFilter = require('../../src/filters/ContainsFilter');

describe('ContainsFilter', function() {
  var display = I.fromJS({
    products: [
      { id: 1, sizes: 'Small' },
      { id: 2, sizes: 'MediumLarge' },
      { id: 3, sizes: 'Medium' },
      { id: 4, sizes: 'SmallLarge' }
    ]
  });

  it('filters single tag', function() {
    var filter = ContainsFilter('sizes', ['Small']);

    var expected = I.fromJS({
      products: [{ id: 1, sizes: 'Small' }, { id: 4, sizes: 'SmallLarge' }]
    });

    assert(filter(display).equals(expected));
  });

  it('filters multiple tags', function() {
    var filter = ContainsFilter('sizes', ['Small', 'Large']);

    var expected = I.fromJS({
      products: [
        { id: 1, sizes: 'Small' },
        { id: 2, sizes: 'MediumLarge' },
        { id: 4, sizes: 'SmallLarge' }
      ]
    });

    assert(filter(display).equals(expected));
  });
});
