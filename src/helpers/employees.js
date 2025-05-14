export const filterByResultPerPage = (results, currentPage, rpp) => {
  const indexOfLast = currentPage * rpp;
  const indexOfFirst = indexOfLast - rpp;
  const currentList = results.slice(indexOfFirst, indexOfLast);

  return currentList;
};

export const getSortedEmployees = (response, page, filters) => {
  const { rpp, search, sort, asc, occupation, department } = filters;
  let sortedResults = response;
  
  const filterCriteria = {
    occupation,
    department,
  };

  if (search) {
    sortedResults = sortedResults.filter((each) =>
      each.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  sortedResults = sortedResults.filter(item => {
    // validates all filter criteria
    return Object.keys(filterCriteria).every(key => {
      // ignores an empty filter
      if (!filterCriteria[key]) return true;

      return item[key] === filterCriteria[key];
    })
  });

  // sorted according to order
  if (sort) {
    switch (sort) {
      case "id":
        if (asc) {
          sortedResults = sortedResults.toSorted((a, b) =>
            parseInt(a.id) > parseInt(b.id) ? 1 : -1
          );
        } else {
          sortedResults = sortedResults
            .toSorted((a, b) => (parseInt(a.id) > parseInt(b.id) ? 1 : -1))
            .toReversed();
        }
        break;
      default:
        sortedResults = sortedResults;
        return;
    }
  }

  const pages = Math.floor((sortedResults.length + +rpp - 1) / +rpp);
  const filteredResults = filterByResultPerPage(sortedResults, page, rpp);

  return {
    allEmployees: response,
    sortedEmployees: filteredResults,
    numberOfResults: sortedResults.length,
    pages: pages,
    // page: page,
  };
};
