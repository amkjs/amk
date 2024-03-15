import fp from 'lodash/fp.js'
import { extract } from '../service/country.mjs';

// const { compose } = fp;
export class CountryController {
  constructor({ country }) {
    this.country = country;
  }

  async getCountry(req, res) {
    const { code } = req.params;
    const country = await this.country.getByCode(code);
    res.json(country);
  }

  async getAll(req, res) {
    const { query } = req;
    const [q, sort, pagination] = extract(query)
    const country = await this.country.get({ q, sort, pagination });
    res.json(country);
  }
}