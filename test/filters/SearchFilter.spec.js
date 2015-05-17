var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var SearchFilter = require('../../src/filters/SearchFilter');

describe('SearchFilter', function() {
  var display = I({ products: [{ name: 'Bob' }, { name: 'Ben' }, { name: 'Emma' }] });

  it('filters by search word', function() {
    var expected = I({ products: [{ name: 'Bob' }, { name: 'Ben' }] });
    assert.deepEqual(SearchFilter('name', 'B')(display), expected);
  });

  it('ignores case', function() {
    var expected = I({ products: [{ name: 'Ben' }, { name: 'Emma' }] });
    assert.deepEqual(SearchFilter('name', 'e')(display), expected);
  });
});
