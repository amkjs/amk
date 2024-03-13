import {extractSort, extractQueryParams, extractPagination } from '../service/country.mjs';

export class CountryController {
  constructor({ country }) {
    this.country = country;
  }

  async getCountry(req, res) {
    const { code } = req.params;
    const country = await this.country.getCountry(code);
    res.json(country);
  }

  async getAll(req, res) {
    const q = extractQueryParams(req);
    const sort = extractSort(req);
    const pagination = extractPagination(req);
    const country = await this.country.get({ q, sort, pagination });
    res.json(country);
  }
}