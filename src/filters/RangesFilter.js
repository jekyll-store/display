function RangesFilter(field, ranges) {
  return function(display) {
    var products = display.products.filter(function(product) {
      for(var i = 0; i < ranges.length; i++) {
        if(product[field] >= ranges[i][0] && product[field] <= ranges[i][1]) {
          return true;
        }
      }
    });
    return display.merge({ products: products });
  };
}

module.exports = RangesFilter;
