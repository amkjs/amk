import _ from 'lodash';
import { BaseModel } from './base.mjs';

const { keys, map } = _;

const applyFilter = (q, db) => {
  const db_ = db;
  keys(q).map((key) => {
    if (q[key]) db_.where(key, q[key]);
  });
  return db_;
}

const applySort = (sort, db) => {

}

const applyPagination = (pagination, db) => {

}

/*
  * This class is responsible for handling the business logic of the country entity.
  * fields:
  * code: string
  * name: string
  * phone: string
  * symbol: string
  * capital: string
  * currency: string
  * alpha_3: string
  * continent_code: string
 */

export class Country extends BaseModel {
  constructor() {
    super('countries')
  }

  async get({ q = {}, sort = {}, pagination = {} }) {
    console.log('q', q)
    console.log('sort', sort)
    console.log('pagination', pagination)
    console.log(applyFilter(q, this.getDB()).toString())
    const { limit, offset } = pagination;
    const { key, order } = sort;
    const qs = this.getDB();
    if (sort) {
      qs.orderBy(sort.key, sort.order);
    }
    if (limit) {
      qs.limit(limit)
    }
    if (offset) {
      qs.offset(offset);
    }

    const [total, rs] = await Promise.all([
      this.getCount(q),
      qs.select(
        'code',
        'name',
        'phone',
        'symbol',
        'capital',
        'currency',
        'alpha_3'
      ),
    ]);

    return {
      total,
      limit,
      offset,
      data: rs,
    };
  }

  async getByCode(code) {
    const rs = await this.getDB()
      .join('continents', 'countries.continent_code', 'continents.code')
      .where({ 'countries.code': code })
      .select(
        'countries.*', 'continents.name as continent_name', 'continents.code as continent_code'
      ).first();
    
    return {
      code: rs.code,
      name: rs.name,
      phone: rs.phone,
      symbol: rs.symbol,
      capital: rs.capital,
      currency: rs.currency,
      alpha_3: rs.alpha_3,
      continent: {
        code: rs.continent_code,
        name: rs.continent_name,
      },
    }
  }
}