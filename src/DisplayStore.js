// Includes
var Reflux = require('reflux');
var I = require('seamless-immutable');
var JSE = require('jekyll-store-engine');
var listenAndMix = JSE.Mixins.listenAndMix;
var m = JSE.Utils.mapping;

var DisplayStore = Reflux.createStore({
  // Public
  listenables: [JSE.Actions],
  mixins: [listenAndMix(JSE.Stores.Products, 'update')],
  getInitialState: function() { return t.filterDisplay(); },
  onSetDisplayFilter: function(args) {
    t.filters[args.name] = args.filter;
    t.update();
  },
  onRemoveDisplayFilter: function(args) {
    delete t.filters[args.name]
    t.update();
  },

  // Private
  filters: {},
  update: function() { t.trigger(t.filterDisplay()); },

  filterDisplay: function() {
    var display = I({ products: t.values(t.products) });

    t.values(t.filters)
      .sort(function(a, b) { return (a.precedence || 0) - (b.precedence || 0); })
      .forEach(function(filter) { display = filter(display); });

    return { display: display };
  },

  values: function(obj) {
    var values = [];
    for(var k in obj) { values.push(obj[k]); }
    return values;
  }
});

var t = module.exports = DisplayStore;
