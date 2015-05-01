function SortFilter(field, direction) {
  var fn = function(display) {
    var products = display.get('products');

    products = products.sort(function(a, b) {
      var fieldA = a.get(field)
      var fieldB = b.get(field)
      return fieldA.cmp ? fieldA.cmp(fieldB) : fieldA > fieldB;
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