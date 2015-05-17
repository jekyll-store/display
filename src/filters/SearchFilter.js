function SearchFilter(field, word) {
  return function(display) {
    var products = display.products.filter(function(product) {
      return product[field].match(new RegExp(word, 'i'));
    });

    return display.merge({ products: products });
  };
}

module.exports = SearchFilter;
