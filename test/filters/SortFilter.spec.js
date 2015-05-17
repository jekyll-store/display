var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var SortFilter = require('../../src/filters/SortFilter');

describe('SortFilter', function() {
  var display = I({ products: [{ age: 13 }, { age: 10 }, { age: 39 }] });

  it('sorts ascending', function() {
    var expected = I({ products: [{ age: 10 }, { age: 13 }, { age: 39 }] });
    assert.deepEqual(SortFilter('age', SortFilter.ASC)(display), expected);
  });

  it('sorts descending', function() {
    var expected = I({ products: [{ age: 39 }, { age: 13 }, { age: 10 }] });
    assert.deepEqual(SortFilter('age', SortFilter.DESC)(display), expected);
  });

  it('sorts strings', function() {
    var filter = SortFilter('name', SortFilter.ASC);

    var display = I({
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

    var expected = I({
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

    assert.deepEqual(filter(display), expected);
  });
});
