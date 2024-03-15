
export const extractQueryParams = (query = {}) => {
  const {
    name,
    phone,
    symbol,
    capital,
    currency,
    continent_code,
    alpha_3
  } = query;

  return {
    name,
    phone,
    symbol,
    capital,
    currency,
    continent_code,
    alpha_3
  };
}

export const extractSort = (query = {}) => {
  const { sort } = query;
  if (!sort) return null;
  const firstChar = sort[0];
  const sortKey = firstChar in ['+', '-'] ? sort.slice(1) : sort;

  const validKeys = ['name', 'phone', 'symbol', 'capital', 'currency', 'continent_code', 'alpha_3'];

  if (firstChar === '-' && sortKey in validKeys) {
    return {
      key: sortKey,
      order: 'desc'
    }
  } else {
    return {
      key: sortKey,
      order: 'asc'
    }
  }
}

export const extractPagination = (query = {}) => {
  const { offset, limit } = query;
  return {
    offset: +offset || 0,
    limit: +limit || 10
  }
}

export const extract = (query) => {
  return [
    extractQueryParams(query),
    extractSort(query),
    extractPagination(query)
  ]
}