import { ajv } from '../lib/ajv.mjs';
import { extract } from '../utils/query.mjs';
export class PersonController {
  constructor({ person }) {
    this.person = person;
  }

  async getAll(req, res) {
    const { query } = req;
    const validKey = ['first_name', 'last_name', 'country_code'];
    const [q, sort, pagination] = extract(query, validKey);
    const person = await this.person.get({ q, sort, pagination });
    res.json(person);
  }

  async getOne(req, res) {
    const { code } = req.params;
    const person = await this.person.getById(code);
    res.json(person);
  }

  async createPerson(req, res) {
    const { body } = req;
    const validate = ajv.getSchema('personRequestSchema');
    if (validate(body)) {
      const person = await this.person.save(body);
      res.json(person[0]);
    } else {
      res.status(400).json(validate.errors);
    }
  }
}