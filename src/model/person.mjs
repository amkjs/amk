import fp from 'lodash/fp.js';

import { personRequestSchema } from '../schema/person.mjs';
import { ajv } from '../lib/ajv.mjs';
import { BaseModel } from './base.mjs';
import { applySort, applyPagination, applyFilter } from '../utils/query.mjs';

const { compose } = fp;
/*
  * This class is responsible for handling the business logic of the person entity.
  * fields:
  * id: number
  * first_name: string
  * last_name: string
  * country_code: string
 */

export class Person extends BaseModel {
  constructor() {
    super('persons')
    this.validate = ajv.getSchema('personRequestSchema');
  }

  async get({ q = {}, sort = {}, pagination = {} }) {
    const { limit, offset } = pagination;
    const f = compose(applySort(sort), applyPagination(pagination), applyFilter(q));
    const qs = f(this.getDB());
    const [total, rs] = await Promise.all([
      this.getCount(q),
      qs.select('id', 'first_name', 'last_name', 'country_code'),
    ]);
    return {
      total,
      limit,
      offset,
      data: rs,
    }
  }

  async getById(id) {
    const rs = await this.getDB()
      .join('countries', 'persons.country_code', 'countries.code')
      .join('continents', 'countries.continent_code', 'continents.code')
      .where({ id })
      .select(
        'persons.id as id',
        'persons.first_name as first_name',
        'persons.last_name as last_name',
        'persons.country_code as country_code',
        'countries.name as country_name',
        'countries.phone as phone',
        'countries.symbol as symbol',
        'countries.capital as capital',
        'countries.currency as currency',
        'countries.alpha_3 as alpha_3',
        'continents.name as continent_name',
        'continents.code as continent_code'
      ).first() || {};

    const res = {
      id: rs.id,
      first_name: rs.first_name,
      last_name: rs.last_name,
    }

    if (rs.country_code) {
      res.country = {
        code: rs.country_code,
        name: rs.country_name,
        phone: rs.phone,
        symbol: rs.symbol,
        capital: rs.capital,
        currency: rs.currency,
        alpha_3: rs.alpha_3,
      }
      if (rs.continent_code) {
        res.country.continent = {
          code: rs.continent_code,
          name: rs.continent_name,
        }
      }
    }

    return res;
  }

  async save(data){
    this.validate(data);
    return this.getDB().insert(data, ['id', 'first_name', 'last_name', 'country_code']);
  }

  async update(id, data) {
    this.validate(data);
    return this.getDB().where({ id }).update(data, ['id', 'first_name', 'last_name', 'country_code']);
  }
}