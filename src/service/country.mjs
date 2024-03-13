
export const extractQueryParams = (req) => {
  const {
    name,
    phone,
    symbol,
    capital,
    currency,
    continent_code,
    alpha_3
  } = req.query;

  return {
    name,
    phone,
    symbol,
    capital,
    currency,
    continent_code,
    alpha_3
  }
}

export const extractSort = (req) => {
  const { sort } = req.query;
  const firstChar = sort[0]
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

export const extractPagination = (req) => {
  const { page, limit } = req.query;
  return {
    offset: page || 1,
    limit: limit || 10
  }
}