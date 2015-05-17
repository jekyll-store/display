var B = require('big.js')

function range(a, b) {
  var r = [];
  for(var i = a; i <= b; i++) { r.push(i); }
  return r;
}

function PageFilter(pageSize, pageNum) {
  var fn = function(display) {
    var total   = +B(display.products.length).div(pageSize).round(0, 3),
        current = pageNum <= total ? pageNum : 1,
        start   = (current - 1) * pageSize;

    return display.merge({
      products: display.products.slice(start, start + pageSize),
      page: {
        current: current,
        numbers: range(1, total),
        prev: current > 1 ? current - 1 : null,
        next: current < total ? current + 1 : null
      }
    });
  };

  fn.precedence = 2;
  return fn;
}

module.exports = PageFilter;
