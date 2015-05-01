var Filters = {
  Contains: require('./ContainsFilter'),
  Page: require('./PageFilter'),
  Ranges: require('./RangesFilter'),
  Search: require('./SearchFilter'),
  Sort: require('./SortFilter'),
  Tags: require('./TagsFilter')
};

module.exports = Filters;