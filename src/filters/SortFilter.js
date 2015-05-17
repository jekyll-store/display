function SortFilter(field, direction) {
  var fn = function(display) {
    var products = display.products.asMutable();
    products.sort(function(a, b) { return a[field] > b[field] ? 1 : -1; });
    if(direction == SortFilter.DESC) { products.reverse(); }
    return display.merge({ products: products });
  };

  fn.precedence = 1;
  return fn;
}

SortFilter.ASC = 'ascending';
SortFilter.DESC = 'descending';

module.exports = SortFilter;