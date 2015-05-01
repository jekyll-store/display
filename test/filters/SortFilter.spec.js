var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var SortFilter = require('../../src/filters/SortFilter');

describe('SortFilter', function() {
  var display = I.fromJS({
    products: [
      { name: 'John', age: B(13) },
      { name: 'Aaron', age: B(10) },
      { name: 'Helen', age: B(39) }
    ]
  });

  it('sorts ascending', function() {
    var filter = SortFilter('age', SortFilter.ASC);

    var expected = I.fromJS({
      products: [
        { name: 'Aaron', age: B(10) },
        { name: 'John', age: B(13) },
        { name: 'Helen', age: B(39) }
      ]
    });

    assert(filter(display).equals(expected));
  });

  it('sorts descending', function() {
    var filter = SortFilter('age', SortFilter.DESC);

    var expected = I.fromJS({
      products: [
        { name: 'Helen', age: B(39) },
        { name: 'John', age: B(13) },
        { name: 'Aaron', age: B(10) }
      ]
    });

    assert(filter(display).equals(expected));
  });

  it('sorts strings', function() {
    var filter = SortFilter('name', SortFilter.ASC);

    var expected = I.fromJS({
      products: [
        { name: 'Aaron', age: B(10) },
        { name: 'Helen', age: B(39) },
        { name: 'John', age: B(13) }
      ]
    });

    assert(filter(display).equals(expected));
  });
});
