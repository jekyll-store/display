# Jekll-Store/Display

[![Build Status](https://travis-ci.org/jekyll-store/engine.svg?branch=master)](https://travis-ci.org/jekyll-store/engine)

Product Display plugin for [Jekyll-Store Engine](https://github.com/jekyll-store/engine).

## Actions

### setDisplayFilter

Sets the display filter associated with a name.

Args:

* `name` - Name to associate filter.
* `filter` - Function that filters products in a display.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
  name: 'page',
  filter: JekyllStoreEngine.Filters.Page(6, 2)
});
```

### removeDisplayFilter

Removes the display filter associated with a name.

Args:

* `name` - The filter's associated name.

Example:

```javascript
JekyllStoreEngine.Actions.removeDisplayFilter({ name: 'page' });
```

## DisplayStore

The products to be displayed after filters have been applied. Optionally has page information if page filter is applied.

Example output:

```javascript
{
  display: Immutable.Map({
    products: Immutable.List([
      Immutable.Map({ name: 'Slippers', price: Big(45.50) }),
      Immutable.Map({ name: 'Crocs', price: Big(88.00) }),
      Immutable.Map({ name: 'Sandals', price: Big(5.25) })
    ]),

    page: Immutable.Map({
      current: 2,
      numbers: Immutable.List([1, 2, 3, 4, 5, 6, 7]),
      prev: 1,
      next: 3
    })
  })
}
```

## Filters

Filters are simple functions that filter the products in a display. They have an associated precedence to make sure they are run in the correct order. The following is a list of the filters:

### PageFilter

Paginates the display at the specified page number.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
  name: 'page',
  filter: JekyllStoreEngine.Filters.Page(6, 2)
});
```

### RangesFilter

Allows products with a field within the supplied ranges.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
	name: 'weight-range',
	filter: JekyllStoreEngine.Filters.Ranges('weight', [[0, 1.5], [3.5, 5]])
});
```

### SearchFilter

Allows products with a field that contains the searched text.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
	name: 'search',
	filter: JekyllStoreEngine.Filters.Search('name', 'bo')
});
```

### SortFilter

Sorts products on a field in the specified direction.

Example:

```javascript
var sortFilter = JekyllStoreEngine.Filters.Sort;

JekyllStoreEngine.Actions.setDisplayFilter({
	name: 'sort',
	filter: sortFilter('vintage', sortFilter.ASC)
});
```

### TagsFilter

Allows products with a field that matches one of the supplied tags.

Example:

```javascript
JekyllStoreEngine.Actions.setDisplayFilter({
	name: 'colour-tag',
	filter: JekyllStoreEngine.Filters.Tags('colour', ['red', 'blue'])
});
```

## Contributing

1. [Fork it](https://github.com/jekyll-store/display/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request