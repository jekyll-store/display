var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var SortFilter = require('../../src/filters/SortFilter');

describe('SortFilter', function() {
  var display = I.fromJS({
    products: [{ age: B(13) }, { age: B(10) }, { age: B(39) }]
  });

  it('sorts ascending', function() {
    var filter = SortFilter('age', SortFilter.ASC);

    var expected = I.fromJS({
      products: [{ age: B(10) }, { age: B(13) }, { age: B(39) }]
    });

    assert(filter(display).equals(expected));
  });

  it('sorts descending', function() {
    var filter = SortFilter('age', SortFilter.DESC);

    var expected = I.fromJS({
      products: [{ age: B(39) }, { age: B(13) }, { age: B(10) }]
    });

    assert(filter(display).equals(expected));
  });

  it('sorts strings', function() {
    var filter = SortFilter('name', SortFilter.ASC);

    var display = I.fromJS({
      products: [
        { name: 'Peter George' },
        { name: 'Jorden Jeffary' },
        { name: 'Poly Beuytrad' },
        { name: 'Smith Belish' },
        { name: 'Mark Small' },
        { name: 'James Furrow' },
        { name: 'Jaden Long' },
        { name: 'Andrew Maddison' },
        { name: 'James Furrow' },
        { name: 'Polly Anna' },
        { name: 'Larry Styles' },
      ]
    });

    var expected = I.fromJS({
      products: [
        { name: 'Andrew Maddison' },
        { name: 'Jaden Long' },
        { name: 'James Furrow' },
        { name: 'James Furrow' },
        { name: 'Jorden Jeffary' },
        { name: 'Larry Styles' },
        { name: 'Mark Small' },
        { name: 'Peter George' },
        { name: 'Polly Anna' },
        { name: 'Poly Beuytrad' },
        { name: 'Smith Belish' },
      ]
    });

    assert(filter(display).equals(expected));
  });
});
