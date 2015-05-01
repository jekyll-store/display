function ContainsFilter(field, tags) {
  return function(display) {
    var products = display.get('products');

    products = products.filter(function(product) {
      return tags.some(function(tag) {
      	return product.get(field).indexOf(tag) >= 0;
      });
    });

    return display.set('products', products);
  };
}

module.exports = ContainsFilter;