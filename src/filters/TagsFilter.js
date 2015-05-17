function TagsFilter(field, tags) {
  return function(display) {
    var products = display.products.filter(function(product) {
      return tags.indexOf(product[field]) >= 0;
    });

    return display.merge({ products: products });
  };
}

module.exports = TagsFilter;
