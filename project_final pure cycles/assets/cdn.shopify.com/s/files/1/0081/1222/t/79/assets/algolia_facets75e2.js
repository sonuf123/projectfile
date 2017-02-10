(function (algolia) {
  'use strict';

  var _ = algolia._;

  var TYPES_TO_WIDGET = {
    slider: { name: 'rangeSlider', hasHeader: true, useDefault: true },
    menu: { name: 'menu', params: { limit: 10 } },
    conjunctive: { name: 'refinementList', params: { operator: 'and', limit: 10 }, hasHeader: true },
    disjunctive: { name: 'refinementList', params: { operator: 'or', limit: 10 }, hasHeader: true },
  };

  var sortByRefined = function sortByRefined (sortFunction) {
    return function (a, b) {
      if (a.refined !== b.refined) {
        if (a.refined) {
          return -1;
        }
        if (b.refined) {
          return 1;
        }
      }
      return sortFunction(a, b);
    };
  };

  /*
   * Sorting functions : Allows to chose in which order you want to display the facets
   * Algolia will always send you back the most relevant values for each facet (the ones
   * with the highest count). These sorting functions won't change which results come back
   * but how they are displayed. To retrieve more results, change the maxValuesPerFacet
   * parameter in your Algolia Dashboard.
   * The default sort function is refined > count > name.
   */
  algolia.facetSortFunctions = {
    sortRanges: sortByRefined(function sortRanges (a, b) {
      if (a.name.length === b.name.length) {
        return a.name.localeCompare(b.name);
      }
      return a.name.length - b.name.length;
    })
  };

  /*
   * Display functions
   * When the object sent back for a facet item doesn't match how you would want it to look
   * like, use a function to reformat it how you want.
   */
  algolia.facetDisplayFunctions = {
    displayRange: function displayRange (value) {
      var format = '',
          values = value.split(':');

      return _.map(values, function (e) {
        return algolia.formatMoney(+e * 100, format).replace(/\.\d+$/, '');
      }).join(' - ');
    }
  }

  algolia.facets = _.filter(algolia.config.facets, function (facet) { return facet.enabled || parseInt(facet.enabled); });
  algolia.facetTitles = {};
  _.each(algolia.facets, function (facet) {
    algolia.facetTitles[facet.name] = facet.title;
  });
  algolia.facetsWidgets = _.map(algolia.facets, function (facet) {
    var widget = TYPES_TO_WIDGET[facet.type],
        params = _.cloneDeep(widget.params) || {};

    params.container = "[class~='ais-facet-" + facet.name + "']";
    params.attributeName = facet.name;
    params.templates = {};
    params.cssClasses = {
      root: 'ais-facet',
      header: 'ais-facet--header',
      body: 'ais-facet--body',
      item: 'ais-facet--item',
      label: 'ais-facet--label',
      checkbox: 'ais-facet--checkbox',
      active: 'ais-facet--active',
      count: 'ais-facet--count'
    };

    if (widget.hasHeader) {
      params.templates.header = function () {
        return facet.title;
      }
    }

    if (!widget.useDefault) {
      params.templates.item = algolia.getTemplate('instant_search_facet_item');
    }

    // Temporary fix - To remove in the long term
    if (facet.sortFunction) {
      facet.sortBy = facet.sortFunction;
    }

    if (facet.sortBy) {
      if (facet.sortBy.match(/:/)) {
        params.sortBy = facet.sortBy;
      } else if (algolia.facetSortFunctions[facet.sortBy]) {
        params.sortBy = algolia.facetSortFunctions[facet.sortBy];
      } else {
        console.log('Algolia: Warning: Unrecognized sort order: ' + facet.sortBy);
      }
    }

    var displayFunction = algolia.facetDisplayFunctions[facet.displayFunction];
    params.transformData = function (data) {
      data.type = {};
      data.type[facet.type] = true;
      if (displayFunction) {
        data.name = displayFunction(data.name);
      }
      return data;
    }

    return {
      name: widget.name,
      params: params
    };
  });
}(algoliaShopify));
