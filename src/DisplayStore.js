// Includes
var Reflux = require('reflux');
var I = require('immutable');
var JSE = require('jekyll-store-engine');
var listenAndMix = JSE.Mixins.listenAndMix;

var DisplayStore = Reflux.createStore({
  // Public
  listenables: [JSE.Actions],
  mixins: [listenAndMix(JSE.Stores.Products, 'update')],
  getInitialState: function() { return t.filterDisplay(); },
  onSetDisplayFilter: function(args) {
    t.filters = t.filters.set(args.name, args.filter);
    t.update();
  },
  onRemoveDisplayFilter: function(args) {
    t.filters = t.filters.remove(args.name);
    t.update();
  },

  // Private
  filters: I.Map(),
  update: function() { t.trigger(t.filterDisplay()); },

  filterDisplay: function() {
    var display = I.Map({ products: t.products.toList() });

    t.filters
      .sortBy(function(filter) { return filter.precedence || 0; })
      .forEach(function(filter) { display = filter(display); });

    return { display: display };
  }
});

var t = module.exports = DisplayStore;
