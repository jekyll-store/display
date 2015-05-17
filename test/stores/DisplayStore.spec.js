var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/DisplayStore');

describe('DisplayStore', function() {
  var reverseFilter = function(display) {
    return display.merge({ products: display.products.asMutable().reverse() });
  };

  var takeFilter = function(display) {
    return display.merge({ products: display.products.slice(0, 2) });
  };

  var cycleFilter = function(display) {
    var cycled = display.products.slice(1, -1).concat(display.products[0]);
    return display.merge({ products: cycled });
  };

  cycleFilter.precedence = -1;

  before(function() {
    s.trigger = sinon.spy();

    s.products = I({
      'crossbow': { name: 'crossbow' },
      'dagger': { name: 'dagger' },
      'cannon': { name: 'cannon' },
      'foil': { name: 'foil' }
    });
  });

  it('has no filter initially', function() {
    var expected = I({
      products: [
        { name: 'crossbow' },
        { name: 'dagger' },
        { name: 'cannon' },
        { name: 'foil' }
      ]
    });
    assert.deepEqual(s.getInitialState(), { display: expected });
  });

  it('adds filters', function() {
    s.onSetDisplayFilter({ name: 'reverse', filter: reverseFilter });
    s.onSetDisplayFilter({ name: 'take', filter: takeFilter });
    var expected = I({ products: [{ name: 'foil' }, { name: 'cannon' }] });
    assert.deepEqual(s.trigger.lastCall.args[0], { display: expected });
  });

  it('removes filters', function() {
    s.onRemoveDisplayFilter({ name: 'reverse' });
    var expected = I({ products: [{ name: 'crossbow' }, { name: 'dagger' }] });
    assert.deepEqual(s.trigger.lastCall.args[0], { display: expected });
  });

  it('respects precedence', function() {
    s.onSetDisplayFilter({ name: 'cycle', filter: cycleFilter });
    var expected = I({ products: [{ name: 'dagger' }, { name: 'cannon' }] });
    assert.deepEqual(s.trigger.lastCall.args[0], { display: expected });
  });

});
