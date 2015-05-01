function SortFilter(field, direction) {
  var fn = function(display) {
    var products = display.get('products');

    products = products.sort(function(a, b) {
      var fieldA = a.get(field);
      var fieldB = b.get(field);
      if(fieldA.cmp) { return fieldA.cmp(fieldB); }
      return fieldA > fieldB ? 1 : -1;
    });

    if(direction == SortFilter.DESC) { products = products.reverse(); }
    return display.set('products', products);
  };

  fn.precedence = 1;
  return fn;
}

SortFilter.ASC = 'ascending';
SortFilter.DESC = 'descending';

module.exports = SortFilter;