import fp from 'lodash/fp.js';
const { keys, curry } = fp;

export const extractQueryParams = (query = {}, validKeys = []) => {
  const params = {};
  for (const key of validKeys) {
    params[key] = query[key];
  }
  return params;
}

export const extractSort = (query = {}, validKeys) => {
  const { sort } = query;
  if (!sort) return {};
  const firstChar = sort[0];
  const sortKey = ['+', '-'].includes(firstChar) ? sort.slice(1) : sort;
  if (validKeys.includes(sortKey)) {
    if(firstChar === '-') {
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
  } else {
    return {};
  }
}

export const extractPagination = (query = {}) => {
  const { offset, limit } = query;
  return {
    offset: +offset || 0,
    limit: +limit || 10
  }
}

export const extract = (query, validKeys) => {
  return [
    extractQueryParams(query, validKeys),
    extractSort(query, validKeys),
    extractPagination(query)
  ]
}



export const applyFilter = curry((q, db) => {
  const db_ = db;
  keys(q).map((key) => {
    const qValue = q[key]
    if (qValue) {
      // easy way to choose if using like or equal
      // for this example, every field with a name like first_name, last_name, etc will use like
      if (/.*name.*/.test(key)) {
        db_.whereLike(key, `%${qValue.toLowerCase()}%`);
      } else {
        db_.where(key, qValue);
      }
    }
  });
  return db_;
});

export const applySort = curry((sort, db) => {
  const { key, order } = sort;
  const db_ = db;
  if (key && order) {
    db_.orderBy(sort.key, sort.order);
  }
  return db_;
});

export const applyPagination = curry((pagination, db) => {
  const { limit, offset } = pagination;
  const db_ = db;
  if (limit) db_.limit(limit);
  if (offset) db_.offset(offset);
  return db_;
});