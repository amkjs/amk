import fp from 'lodash/fp.js'
import { BaseModel } from './base.mjs';
import { applySort, applyFilter, applyPagination } from '../utils/query.mjs';

const { compose } = fp;

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
    const { limit, offset } = pagination;
    const f = compose(applySort(sort), applyPagination(pagination), applyFilter(q));
    const qs = f(this.getDB());
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
      ).first() || {};
    
    const res = {
      code: rs.code,
      name: rs.name,
      phone: rs.phone,
      symbol: rs.symbol,
      capital: rs.capital,
      currency: rs.currency,
      alpha_3: rs.alpha_3,
    }

    if (rs.continent_name || rs.continent_code) {
      res.continent = {
        code: rs.continent_code,
        name: rs.continent_name,
      }
    }
    return res;
  }
}