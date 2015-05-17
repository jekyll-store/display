var intersects = require('jekyll-store-engine').Utils.intersects;

function ContainsFilter(field, tags) {
  return function(display) {
    var products = display.products.filter(function(product) {
      return intersects(product[field], tags);
    });
    return display.merge({ products: products });
  };
}

module.exports = ContainsFilter;