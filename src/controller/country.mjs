import { extract } from '../utils/query.mjs';

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
    const validKeys = ['name', 'phone', 'symbol', 'capital', 'currency', 'continent_code', 'alpha_3'];
    const [q, sort, pagination] = extract(query, validKeys);
    const country = await this.country.get({ q, sort, pagination });
    res.json(country);
  }
}